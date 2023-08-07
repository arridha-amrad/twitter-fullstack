import { useEffect } from 'react';
import store from '../redux/store';
import { tweetApi } from '../redux/tweet-slice';
import { useParams } from 'react-router-dom';

export default function useTweetUpdate(tweet: Tweet) {
  const params = useParams();
  const tweetId = params.tweetId;
  const tweetCache =
    store.getState().twitterApi.queries[`getTweet("${tweet.id}")`];

  const tweetsCache = store.getState().twitterApi.queries['getTweets'];

  useEffect(() => {
    if (!tweetCache) return;
    const tweet = tweetCache.data as Tweet;

    // perform on tweetPage
    store.dispatch(
      tweetApi.util.updateQueryData('getTweet', tweetId as string, (t) => {
        const parentIdx = t.parents.findIndex((t) => t.id === tweet.id);
        if (parentIdx >= 0) {
          t.parents[parentIdx] = tweet;
        }
        const childIdx = t.children.findIndex((child) => child.id === tweet.id);
        if (childIdx >= 0) {
          t.children[childIdx] = tweet;
        }
      })
    );

    // perform on homePage
    if (tweetsCache) {
      const { page } = tweetsCache.originalArgs as { page: number };
      store.dispatch(
        tweetApi.util.updateQueryData(
          'getAllTweets',
          { page },
          ({ tweets }) => {
            const tIdx = tweets.findIndex((tweet) => tweet.id === tweet.id);
            if (tIdx >= 0) {
              tweets[tIdx] = tweet;
            }
          }
        )
      );
    }
  }, []);
}
