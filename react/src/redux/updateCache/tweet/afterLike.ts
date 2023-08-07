import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tweetApi } from '../../tweet-slice';
import { RootState } from '../../store';
import AfterMutation from './AfterMutation';

class LikeTweet extends AfterMutation {
  constructor(
    private dispatch: ThunkDispatch<RootState, null, AnyAction>,
    private arg: Tweet,
    private auth: User
  ) {
    super();
  }

  private updateTweet(tweet: Tweet) {
    const likedIndex = tweet.post.likes.findIndex(
      (l) => l.userId === this.auth.id
    );
    if (likedIndex >= 0) {
      tweet.post._count.likes--;
      tweet.post.likes.splice(likedIndex, 1);
    } else {
      tweet.post._count.likes++;
      tweet.post.likes.push({ userId: this.auth.id });
    }
  }

  updateOnProfilePage() {
    const myTweetsMutation = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyTweets',
        { page: this.getAllMyTweetsPage },
        ({ tweets }) => {
          tweets
            .filter((tweet) => tweet.id === this.arg.id)
            .map((t) => tweets.findIndex((tw) => tw.id === t.id))
            .forEach((idx) => {
              this.updateTweet(tweets[idx]);
            });
        }
      )
    );
    const myRepliesMutation = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyReplies',
        {
          page: this.getAllMyRepliesPage
        },
        ({ tweets }) => {
          tweets
            .filter((tweet) => tweet.id === this.arg.id)
            .map((t) => tweets.findIndex((tw) => tw.id === t.id))
            .forEach((idx) => {
              this.updateTweet(tweets[idx]);
            });
        }
      )
    );
    return {
      myTweetsMutation,
      myRepliesMutation
    };
  }

  updateOnHomePage() {
    const homePageForYouTweets = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllTweets',
        { page: this.getAllTweetsPage },
        ({ tweets }) => {
          tweets
            .filter((tweet) => tweet.postId === this.arg.postId)
            .map((tw) => tweets.findIndex((t) => t.id === tw.id))
            .forEach((idx) => {
              const likes = tweets[idx].post.likes;
              let likeCounter = tweets[idx].post._count.likes;
              const indx = likes.findIndex(
                (like) => like.userId === this.auth.id
              );
              if (indx >= 0) {
                likeCounter--;
                likes.splice(indx, 1);
              } else {
                likeCounter++;
                likes.push({ userId: this.auth.id });
              }
              tweets[idx].post.likes = likes;
              tweets[idx].post._count.likes = likeCounter;
            });
        }
      )
    );
    return {
      homePageForYouTweets
    };
  }

  updateOnTweetPage() {
    const tweetPageMutation = this.dispatch(
      tweetApi.util.updateQueryData('getTweet', this.tweetIdParam, (tweet) => {
        if (this.arg.id === tweet.id) {
          return this.updateTweet(tweet);
        }
        const parent = tweet.parents.find((tweet) => tweet.id === this.arg.id);
        if (parent) {
          return this.updateTweet(parent);
        }
        const child = tweet.children.find((tweet) => tweet.id === this.arg.id);
        if (child) {
          return this.updateTweet(child);
        }
      })
    );
    return {
      tweetPageMutation
    };
  }
}

export default LikeTweet;
