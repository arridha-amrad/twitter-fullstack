import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TweetCard from '../components/TweetCard/TweetCard';
import { tweetApi, useGetTweetQuery } from '../redux/tweet-slice';
import { motion } from 'framer-motion';
import {
  VirtualContainer,
  WindowBasedVirtualContainer
} from '../components/VirtualContainer';
import useLastItemRef from '../hooks/useLastItemRef';
import TweetsLoadingIndicator from '../components/Loaders/TweetsLoadingIndicator';
import store from '../redux/store';

const GetReplies = () => {
  const params = useParams();
  const tweetIdParam = params.tweetId;

  const args = store.getState().twitterApi.queries[
    `getTweetReplies("${tweetIdParam}")`
  ]?.originalArgs as { page: number; tweetId: string } | undefined;

  const [page, setPage] = useState(args?.page ?? 1);

  const { isLoading, data } = useGetTweetQuery(tweetIdParam as string, {
    skip: !tweetIdParam
  });

  const [
    queryReplies,
    {
      data: queryResult,
      isFetching: isQueryFetching,
      isLoading: isQueryLoading
    }
  ] = tweetApi.useLazyGetTweetRepliesQuery();

  const replies = data?.children ?? [];

  const isPerformQuery =
    replies.length >= 10 && !args ? true : queryResult?.hasNextPage;

  const lastTweetRef = useLastItemRef({
    callback: () => {
      setPage((val) =>
        isPerformQuery ? (queryResult ? queryResult.currentPage + 1 : 2) : val
      );
    },
    isLoading: isLoading || isQueryLoading || isQueryFetching,
    items: replies
  });

  useEffect(() => {
    if (page > 1) {
      queryReplies({ page, tweetId: tweetIdParam as string });
    }
  }, [page]);

  if (replies.length === 0) return null;

  return (
    <>
      <WindowBasedVirtualContainer isLoading={isLoading} list={replies}>
        {({ items, virtualizer, parentRef }) => (
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
                layout={!isLoading}
                transition={{ delay: 0.5 }}
                className="overflow-hidden bg-white dark:bg-black"
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
      {!isQueryLoading && isQueryFetching && <TweetsLoadingIndicator />}
    </>
  );
};

export default GetReplies;
