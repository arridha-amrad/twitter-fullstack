import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tweetApi } from '../../tweet-slice';
import { RootState } from '../../store';
import AfterMutation from './AfterMutation';

class DeleteTweet extends AfterMutation {
  constructor(
    private dispatch: ThunkDispatch<RootState, null, AnyAction>,
    private arg: Tweet
  ) {
    super();
  }

  private decreaseTotalReplies(tweet: Tweet) {
    tweet.post._count.children--;
  }

  private removeTweet(tweets: Tweet[]) {
    tweets.splice(
      tweets.findIndex((t) => t.id === this.arg.id),
      1
    );
  }

  updateOnProfilePage() {
    const deleteFromTweets = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyTweets',
        { page: this.getAllMyTweetsPage },
        ({ tweets }) => {
          this.removeTweet(tweets);
        }
      )
    );
    const deleteFromReplies = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyReplies',
        { page: this.getAllMyTweetsPage },
        ({ tweets }) => {
          this.removeTweet(tweets);
        }
      )
    );
    return {
      deleteFromTweets,
      deleteFromReplies
    };
  }

  updateOnHomePage() {
    const deleteForYouTweets = this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllTweets',
        { page: this.getAllTweetsPage },
        ({ tweets }) => {
          this.removeTweet(tweets);
          const tweet = tweets.find(
            (t) => t.postId === this.arg.parent?.postId
          );
          if (!tweet) return;
          this.decreaseTotalReplies(tweet);
        }
      )
    );
    return {
      deleteForYouTweets
    };
  }

  updateOnTweetPage() {
    const deleteOnTweetPage = this.dispatch(
      tweetApi.util.updateQueryData('getTweet', this.tweetIdParam, (tweet) => {
        if (this.tweetIdParam === this.arg.id) return;
        const parent = tweet.parents.find((t) => t.id === this.arg.id);
        if (parent) {
          return this.removeTweet(tweet.parents);
        }
        const child = tweet.children.find((t) => t.id === this.arg.id);
        if (child) {
          this.removeTweet(tweet.children);
          this.decreaseTotalReplies(tweet);
        }
      })
    );
    return {
      deleteOnTweetPage
    };
  }
}

export default DeleteTweet;
