import { motion } from 'framer-motion';
import { useState } from 'react';
import CircleLoader from '../components/Loaders/CircleLoader';
import TweetCard from '../components/TweetCard/TweetCard';
import {
  VirtualContainer,
  WindowBasedVirtualContainer
} from '../components/VirtualContainer';
import useLastItemRef from '../hooks/useLastItemRef';
import store from '../redux/store';
import { tweetApi } from '../redux/tweet-slice';

const GetAllMyTweetsFeature = () => {
  const args = store.getState().twitterApi.queries['getAllMyTweets']
    ?.originalArgs as { page: number } | undefined;
  const [page, setPage] = useState(args?.page ?? 1);

  const { data, isLoading, isFetching } = tweetApi.useGetAllMyTweetsQuery({
    page
  });

  const tweets = data?.tweets ?? [];

  const lastTweetRef = useLastItemRef({
    callback: () =>
      setPage((val) => (data?.hasNextPage ? data.currentPage + 1 : val)),
    isLoading,
    items: tweets
  });

  if (!isLoading && tweets?.length === 0) {
    return <p className="my-5 text-center">No tweet to show</p>;
  }

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
      {!isLoading && isFetching && (
        <div className="sticky bottom-0 flex h-10 w-full items-center justify-center gap-2 bg-gray-300/30 backdrop-blur dark:bg-black/30">
          <CircleLoader />
        </div>
      )}
    </>
  );
};

export default GetAllMyTweetsFeature;

// const content = (
//   <>
//     <AnimatePresence key="myTweets" initial={false}>
//       {tweets?.map((tweet, i) => (
//         <motion.div
//           key={tweet.id}
//           layout
//           variants={variants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           {i === tweets.length - 1 ? (
//             <TweetCard ref={lastTweetRef} tweet={tweet} />
//           ) : (
//             <TweetCard tweet={tweet} />
//           )}
//           {tweets.length - 1 !== i && (
//             <hr className="-p-2 border-slate-300 dark:border-slate-700" />
//           )}
//         </motion.div>
//       ))}
//     </AnimatePresence>

//     {args && args.page > 1 && isFetching && <CircleLoader />}
//   </>
// );
