import { FC } from 'react';
import RetweetIcon from '@heroicons/react/24/outline/ArrowPathRoundedSquareIcon';
import { useMeQuery } from '../../redux/user-slice';
import { useRetweetMutation } from '../../redux/tweet-slice';
import { toast } from 'react-hot-toast';
import ButtonIcon from '../../components/ButtonIcon';
import useMeasure from 'react-use-measure';
import AnimatedNumber from '../../components/AnimatedNumber';

const RetweetFeature: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const totalTweets = tweet.post._count.retweets;
  const { data } = useMeQuery();

  const isRetweet = tweet.post.retweets.find((rt) => rt.userId === data?.id);

  const [retweetMutation] = useRetweetMutation();

  const retweetFeature = async () => {
    try {
      const data = await retweetMutation(tweet).unwrap();
      toast.success(data ? 'retweeted' : 'unRetweeted', {
        position: 'bottom-center'
      });
    } catch (error) {
      console.log(error);
      toast.error('failed to retweet');
    }
  };

  const [ref, { height }] = useMeasure();

  return (
    <div className="flex h-full flex-1 items-center gap-1 overflow-y-hidden">
      <ButtonIcon
        onClick={(e) => {
          e.stopPropagation();
          retweetFeature();
        }}
        className={`group peer hover:bg-green-500/30 hover:text-green-500`}
        tooltip={`${isRetweet ? 'Undo retweet' : 'Retweet'}`}
        icon={
          <RetweetIcon
            className={`w-[18px] stroke-2  ${
              isRetweet ? 'text-green-500' : 'stroke-gray-500'
            } group-hover:stroke-green-500`}
          />
        }
      />
      <div
        ref={ref}
        className={`relative h-6 w-full overflow-hidden peer-hover:text-green-500 ${
          totalTweets === 0 ? 'opacity-0' : 'opacity-100'
        } text-gray-500`}
      >
        <AnimatedNumber containerHeight={height} number={totalTweets} />
      </div>
    </div>
  );
};

export default RetweetFeature;
