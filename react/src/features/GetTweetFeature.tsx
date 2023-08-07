import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircleLoader from '../components/Loaders/CircleLoader';
import TweetDetailCard from '../components/TweetDetailCard/TweetDetailCard';
import store, { useAppDispatch } from '../redux/store';
import { tweetApi, useGetTweetQuery } from '../redux/tweet-slice';

const GetTweetFeature = ({ focus }: { focus: VoidFunction }) => {
  const args = store.getState().twitterApi.queries['getAllTweets']
    ?.originalArgs as { page: number } | undefined;
  const params = useParams();

  const { data, isLoading, error, isError, isFetching } = useGetTweetQuery(
    params.tweetId as string,
    {
      skip: !params.tweetId
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError) {
      const err = error as FetchBaseQueryError;
      if (err.status !== 404) return;
      dispatch(
        tweetApi.util.updateQueryData(
          'getAllTweets',
          { page: args?.page ?? 1 },
          ({ tweets, ...data }) => ({
            ...data,
            tweets: tweets.filter((tweet) => tweet.id !== params.tweetId)
          })
        )
      );
    }
  }, [isError]);

  if (isLoading || isFetching) return <Loading />;

  if (error && 'data' in error) {
    const errMsg =
      // eslint-disable-next-line
      'data' in error ? (error.data as any).message : 'something went wrong';
    return <p>{errMsg}</p>;
  }

  const content = data ? (
    <>
      <TweetDetailCard tweet={data} focus={focus} />
      <hr className="border-t border-gray-300 dark:border-gray-700" />
    </>
  ) : null;

  return content;
};

export default GetTweetFeature;

const Loading = () => (
  <div className="flex w-full flex-col items-center justify-center pt-10">
    <CircleLoader />
  </div>
);
