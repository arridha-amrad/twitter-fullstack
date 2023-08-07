import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { tweetApi } from '../../tweet-slice';
import store, { RootState } from '../../store';

class Retweet {
  tweetIdParam: string;
  getAllTweetsPage: number;
  constructor(
    private dispatch: ThunkDispatch<RootState, null, AnyAction>,
    private arg: Tweet,
    private auth: User,
    private data: Tweet | null
  ) {
    this.tweetIdParam = window.location.pathname.replace('/tweet/', '');
    const getAllTweetsArgs = store.getState().twitterApi.queries['getAllTweets']
      ?.originalArgs as { page: number } | undefined;
    this.getAllTweetsPage = getAllTweetsArgs?.page ?? 1;
  }

  private updateTweet(tweet: Tweet) {
    const rtIdx = tweet.post.retweets.findIndex(
      (rt) => rt.userId === this.auth.id
    );
    if (rtIdx >= 0) {
      tweet.post._count.retweets--;
      tweet.post.retweets.splice(rtIdx, 1);
    } else {
      tweet.post._count.retweets++;
      tweet.post.retweets.push({ userId: this.auth.id });
    }
  }

  updateOnTweetPage() {
    this.dispatch(
      tweetApi.util.updateQueryData('getTweet', this.tweetIdParam, (tweet) => {
        if (this.tweetIdParam === this.arg.id) return this.updateTweet(tweet);
        const parent = tweet.parents.find((t) => t.id === this.arg.id);
        if (parent) return this.updateTweet(parent);
        const child = tweet.children.find((t) => t.id === this.arg.id);
        if (child) return this.updateTweet(child);
      })
    );
  }

  updateOnHomePage() {
    this.dispatch(
      tweetApi.util.updateQueryData(
        'getAllTweets',
        { page: this.getAllTweetsPage },
        ({ tweets }) => {
          // retweet condition
          if (this.data) {
            // increase retweet's sum of originalTweet
            const originalTweetIndex = tweets.findIndex(
              (t) => t.postId === this.arg.postId
            );
            if (originalTweetIndex >= 0) {
              tweets[originalTweetIndex].post._count.retweets++;
              tweets[originalTweetIndex].post.retweets.push({
                userId: this.auth.id
              });
            }
          } else {
            // unretweet condition
            const idx = tweets.findIndex(
              (tw) =>
                tw.isRetweet &&
                tw.postId === this.arg.postId &&
                tw.userId === this.auth.id
            );
            // delete tweet from feed if available
            if (idx >= 0) {
              tweets.splice(idx, 1);
            }
            // decrease retweet's sum of relatedTweets and remove ur userId from retweets list
            tweets
              .filter((t) => t.postId === this.arg.postId)
              .map((tw) => tweets.findIndex((t) => t.id === tw.id))
              .forEach((idx) => {
                tweets[idx].post._count.retweets--;
                tweets[idx].post.retweets.splice(
                  tweets[idx].post.retweets.findIndex(
                    (t) => t.userId === this.auth.id
                  ),
                  1
                );
              });
          }
        }
      )
    );
  }
}
export default Retweet;
