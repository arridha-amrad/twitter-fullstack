import { FC, MouseEvent } from 'react';
import LikeIcon from '@heroicons/react/24/outline/HeartIcon';
import { useMeQuery } from '../../redux/user-slice';
import { useLikeTweetMutation } from '../../redux/tweet-slice';
import { toast } from 'react-hot-toast';
import ButtonIcon from '../../components/ButtonIcon';
import useMeasure from 'react-use-measure';
import AnimatedNumber from '../../components/AnimatedNumber';

const TweetCardLikeFeature: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const totalLikes = tweet.post._count.likes;
  const { data } = useMeQuery();
  const isLiked = tweet.post.likes.find((like) => like.userId === data?.id);
  const [likeTweet] = useLikeTweetMutation();
  const like = async (e: MouseEvent) => {
    e.stopPropagation();
    try {
      await likeTweet(tweet).unwrap();
    } catch (err) {
      console.log(err);
      toast.error('Failed to like the tweet');
    }
  };

  const [ref, { height }] = useMeasure();

  return (
    <div className="flex h-full flex-1 items-center gap-1 overflow-y-hidden">
      <ButtonIcon
        onClick={like}
        className={`group peer hover:bg-pink-500/20 hover:text-pink-500`}
        tooltip={`${isLiked ? 'Dislike' : 'Like'}`}
        icon={
          <LikeIcon
            className={`w-[18px] ${
              isLiked
                ? 'fill-pink-500 stroke-pink-500'
                : 'stroke-gray-500 stroke-2'
            } group-hover:stroke-pink-500`}
          />
        }
      />
      <div
        ref={ref}
        className={`relative h-6 w-full overflow-hidden transition-colors duration-200 ease-in peer-hover:text-pink-500 ${
          totalLikes === 0 ? 'opacity-0' : 'opacity-100'
        } text-gray-500`}
      >
        <AnimatedNumber containerHeight={height} number={totalLikes} />
      </div>
    </div>
  );
};

export default TweetCardLikeFeature;
