import { useParams } from 'react-router-dom';
import { useGetTweetQuery } from '../redux/tweet-slice';
import TweetCard from '../components/TweetCard/TweetCard';
import { twMerge } from 'tailwind-merge';
import { Ref, forwardRef } from 'react';

const conversationLineClassName = '-z-10 w-0.5 bg-slate-200 dark:bg-gray-700';

// eslint-disable-next-line
const GetTweetParents = ({}, ref: Ref<HTMLElement>) => {
  const params = useParams();
  const tweetIdParams = params.tweetId;

  const { data, isLoading } = useGetTweetQuery(tweetIdParams as string, {
    skip: !tweetIdParams
  });

  const parents = data?.parents ?? [];

  if (isLoading) return null;

  return (
    <section ref={ref}>
      {parents.map((tweet, i) => (
        <TweetCard key={tweet.id} tweet={tweet}>
          <div
            className={twMerge(
              'absolute bottom-0 left-1/2 -translate-x-1/2',
              conversationLineClassName,
              i === 0 ? 'top-3' : 'top-0'
            )}
          />
        </TweetCard>
      ))}
    </section>
  );
};

export default forwardRef(GetTweetParents);
