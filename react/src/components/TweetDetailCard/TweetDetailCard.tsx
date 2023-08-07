import RetweetIcon from '@heroicons/react/24/outline/ArrowPathRoundedSquareIcon';
import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';
import BookmarkIcon from '@heroicons/react/24/outline/BookmarkIcon';
import CommentIcon from '@heroicons/react/24/outline/ChatBubbleOvalLeftIcon';
import LikeIcon from '@heroicons/react/24/outline/HeartIcon';
import LikeFilledIcon from '@heroicons/react/24/solid/HeartIcon';
import { format } from 'date-fns';
import { FC, useMemo } from 'react';
import toast from 'react-hot-toast';
import useMeasure from 'react-use-measure';
import { twMerge } from 'tailwind-merge';
import {
  useLikeTweetMutation,
  useRetweetMutation
} from '../../redux/tweet-slice';
import { useMeQuery } from '../../redux/user-slice';
import AnimatedNumber from '../AnimatedNumber';
import ButtonIcon from '../ButtonIcon';
import TweetCardCarousel from '../TweetCard/TweetCardCarousel';
import RetweetInfo from '../TweetCard/TweetCardRetweetStatus';
import TweetDetailCardUserInfo from './TweetDetailCardUserInfo';

const className =
  'sm:h-6 sm:w-6 h-5 w-5 dark:stroke-gray-500 stroke stroke-gray-400';

const TweetDetailCard: FC<{
  focus: VoidFunction;
  tweet: Tweet;
}> = ({ focus, tweet }) => {
  const { children, likes, retweets } = tweet.post._count;

  return (
    <div className="relative">
      {tweet.isRetweet && <RetweetInfo tweet={tweet} />}
      <TweetDetailCardUserInfo tweet={tweet} />
      <p className="my-1 text-lg">{tweet.post.body}</p>
      <TweetCardCarousel files={tweet.post.files} />
      <TweetDate date={tweet.post.createdAt} />
      <div className="flex justify-start gap-5 border border-l-0 border-r-0 border-gray-200 py-3 dark:border-gray-800">
        <Info title="Replies" total={children} />
        <Info title="Likes" total={likes} />
        <Info title="Retweets" total={retweets} />
      </div>
      <div className="flex justify-around py-2">
        <ButtonIcon
          onClick={focus}
          className="group"
          tooltip="Reply"
          icon={
            <CommentIcon
              className={twMerge(className, 'group-hover:stroke-blue-500')}
            />
          }
        />
        <RetweetButton tweet={tweet} />
        <LikeButton tweet={tweet} />

        <ButtonIcon
          className="group"
          tooltip="Bookmark"
          icon={
            <BookmarkIcon
              className={twMerge(className, 'group-hover:stroke-blue-500')}
            />
          }
        />
        <ButtonIcon
          className="group"
          tooltip="Bookmark"
          icon={
            <ArrowUpTrayIcon
              className={twMerge(className, 'group-hover:stroke-blue-500')}
            />
          }
        />
      </div>
    </div>
  );
};

export default TweetDetailCard;

const RetweetButton = ({ tweet }: { tweet: Tweet }) => {
  const { data: auth } = useMeQuery();
  const isRetweet = tweet.post.retweets.find((rt) => rt.userId === auth?.id);
  const [retweetMutation] = useRetweetMutation();
  const retweet = async () => {
    try {
      const data = await retweetMutation(tweet).unwrap();
      if (data) {
        toast.success('Retweeted');
      } else {
        toast.success('unRetweeted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to like the tweet');
    }
  };
  return (
    <ButtonIcon
      onClick={retweet}
      className="group"
      tooltip="Like"
      icon={
        isRetweet ? (
          <RetweetIcon
            className={twMerge(
              className,
              'dark:stroke-green-500 stroke-green-600'
            )}
          />
        ) : (
          <RetweetIcon
            className={twMerge(className, 'group-hover:stroke-green-500')}
          />
        )
      }
    />
  );
};

const LikeButton = ({ tweet }: { tweet: Tweet }) => {
  const { data } = useMeQuery();
  const isLiked = tweet.post.likes.find((val) => val.userId === data?.id);
  const [likeTweet] = useLikeTweetMutation();
  const like = async () => {
    try {
      await likeTweet(tweet).unwrap();
    } catch (err) {
      console.log(err);
      toast.error('Failed to like the tweet');
    }
  };
  return (
    <ButtonIcon
      onClick={like}
      className="group"
      tooltip="Like"
      icon={
        isLiked ? (
          <LikeFilledIcon
            className={twMerge(
              className,
              'fill-pink-500 stroke-none dark:stroke-none'
            )}
          />
        ) : (
          <LikeIcon
            className={twMerge(className, 'group-hover:stroke-pink-500')}
          />
        )
      }
    />
  );
};

export const Divider = () => (
  <hr className="border-slate-300 dark:border-slate-700" />
);

const TweetDate = ({ date }: { date: Date }) => {
  const theDate = format(new Date(date), 'h:mm a · MMMM d,yyyy · ');
  return <p className="my-3 font-medium text-slate-500">{theDate}</p>;
};

const Info = ({ title, total }: { total: number; title: string }) => {
  const [ref, { height }] = useMeasure();

  const width = useMemo(() => {
    return (total.toString().length + 1) * 8;
  }, [total]);

  return (
    <div ref={ref} className="overflow-hidden text-sm">
      <div style={{ width }} className="h-max relative">
        <AnimatedNumber
          className="-top-[0px] left-0 w-max font-bold"
          containerHeight={height}
          number={total}
        />
      </div>
      {/* <span className="font-bold">{data.total}</span> */}
      <span style={{ paddingLeft: width }} className="pl-4 text-gray-400">
        {title}
      </span>
    </div>
  );
};
