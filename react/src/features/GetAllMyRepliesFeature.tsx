import { motion } from 'framer-motion';
import { useState } from 'react';
import TweetCard from '../components/TweetCard/TweetCard';
import store from '../redux/store';
import { tweetApi } from '../redux/tweet-slice';
import useLastItemRef from '../hooks/useLastItemRef';
import {
  VirtualContainer,
  WindowBasedVirtualContainer
} from '../components/VirtualContainer';

export default function GetAllMyRepliesFeature() {
  const args = store.getState().twitterApi.queries['getAllReplies']
    ?.originalArgs as { page: number } | undefined;
  const [page, setPage] = useState(args?.page ?? 1);

  const { data, isLoading, isFetching } = tweetApi.useGetAllMyRepliesQuery({
    page
  });

  const replies = data?.tweets ?? [];

  const lastTweetRef = useLastItemRef({
    callback: () =>
      setPage((val) => (data?.hasNextPage ? data.currentPage + 1 : val)),
    isLoading,
    items: replies
  });

  if (!isLoading && replies?.length === 0) {
    return <p className="my-5 text-center">No replies to show</p>;
  }

  return (
    <WindowBasedVirtualContainer isLoading={isLoading} list={replies}>
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
              {virtualRow.index === replies.length - 1 ? (
                <TweetCard
                  ref={lastTweetRef}
                  tweet={replies[virtualRow.index]}
                />
              ) : (
                <>
                  <TweetCard tweet={replies[virtualRow.index]} />
                  <hr className="border border-gray-100 dark:border-slate-700" />
                </>
              )}
            </motion.div>
          ))}
        </VirtualContainer>
      )}
    </WindowBasedVirtualContainer>
  );
}
