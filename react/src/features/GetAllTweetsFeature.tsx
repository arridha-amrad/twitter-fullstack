import { motion } from 'framer-motion';
import { useState } from 'react';
import TweetsLoadingIndicator from '../components/Loaders/TweetsLoadingIndicator';
import TweetCard from '../components/TweetCard/TweetCard';
import {
  VirtualContainer,
  WindowBasedVirtualContainer
} from '../components/VirtualContainer';
import useLastItemRef from '../hooks/useLastItemRef';
import store from '../redux/store';
import { useGetAllTweetsQuery } from '../redux/tweet-slice';

const LoadTweetFeature = ({ index }: { index: number }) => {
  const args = store.getState().twitterApi.queries['getAllTweets']
    ?.originalArgs as { page: number } | undefined;

  const [page, setPage] = useState(args?.page ?? 1);

  const { data, isLoading, isFetching } = useGetAllTweetsQuery(
    {
      page
    },
    { skip: index !== 0 }
  );

  const tweets = data?.tweets ?? [];

  const lastTweetRef = useLastItemRef({
    callback: () =>
      setPage((val) => (data?.hasNextPage ? data.currentPage + 1 : val)),
    isLoading: isLoading || isFetching,
    items: tweets
  });

  return (
    <>
      <WindowBasedVirtualContainer isLoading={isLoading} list={tweets}>
        {({ items, parentRef, virtualizer }) => (
          <VirtualContainer
            items={items}
            parentRef={parentRef}
            virtualizer={virtualizer}
          >
            {items.map((virtualRow) => (
              <motion.div
                key={virtualRow.key}
                data-index={virtualRow.index}
                ref={virtualizer.measureElement}
                className="overflow-hidden bg-white dark:bg-black"
                layout={!isLoading && !isFetching}
                transition={{
                  delay: 0.5,
                  duration: 0.5
                }}
              >
                {virtualRow.index === tweets.length - 1 ? (
                  <TweetCard
                    ref={lastTweetRef}
                    tweet={tweets[virtualRow.index]}
                  />
                ) : (
                  <>
                    <TweetCard tweet={tweets[virtualRow.index]} />
                    <hr className="border border-gray-100 dark:border-slate-700" />
                  </>
                )}
              </motion.div>
            ))}
          </VirtualContainer>
        )}
      </WindowBasedVirtualContainer>
      {!isLoading && isFetching && <TweetsLoadingIndicator />}
    </>
  );
};

export default LoadTweetFeature;
