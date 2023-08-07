import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tweetApi } from '../../tweet-slice';
import { RootState } from '../../store';
import AfterMutation from './AfterMutation';

class ReplyTweet extends AfterMutation {
  constructor(
    private dispatch: ThunkDispatch<RootState, null, AnyAction>,
    private arg: Tweet,
    private data: Tweet
  ) {
    super();
  }

  private updateTweet(tweet: Tweet) {
    tweet.post._count.children++;
    if (tweet.children) {
      tweet.children.splice(0, 0, this.data);
    }
  }

  updateOnProfilePage() {
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyTweets',
        { page: this.getAllMyTweetsPage },
        ({ tweets }) => {
          const tweet = tweets.find((t) => t.id === this.arg.id);
          if (tweet) return this.updateTweet(tweet);
        }
      )
    );
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllMyReplies',
        { page: this.getAllMyRepliesPage },
        ({ tweets }) => {
          tweets.splice(0, 0, this.data);
        }
      )
    );
  }

  updateOnTweetPage() {
    this.dispatch(
      tweetApi.util.updateQueryData('getTweet', this.tweetIdParam, (tweet) => {
        if (this.tweetIdParam === this.arg.id) {
          return this.updateTweet(tweet);
        }
        const parent = tweet.parents.find((t) => t.id === this.arg.id);
        if (parent) {
          return this.updateTweet(parent);
        }
        const child = tweet.children.find((t) => t.id === this.arg.id);
        if (child) {
          return this.updateTweet(child);
        }
      })
    );
  }

  updateOnHomePage() {
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllTweets',
        { page: this.getAllTweetsPage },
        ({ tweets }) => {
          tweets.splice(0, 0, this.data);
          const tweet = tweets.find((t) => t.id === this.arg.id);
          if (tweet) {
            this.updateTweet(tweet);
          }
        }
      )
    );
  }
}

export default ReplyTweet;
