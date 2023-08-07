import CommentIcon from '@heroicons/react/24/outline/ChatBubbleOvalLeftIcon';
import { FC, useState } from 'react';
import useMeasure from 'react-use-measure';
import AnimatedNumber from '../../components/AnimatedNumber';
import ButtonIcon from '../../components/ButtonIcon';
import ReplyModal from './components/ReplyModal';

const TweetCardReplyFeature: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const totalComment = tweet.post._count.children;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ref, { height }] = useMeasure();

  return (
    <>
      <div className="flex h-full flex-1 items-center gap-1 overflow-y-hidden">
        <ButtonIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className={`group peer hover:bg-blue-500/30 hover:text-blue-500`}
          tooltip="Reply"
          icon={
            <CommentIcon className="aspect-square w-[18px] stroke-gray-500 stroke-2 group-hover:stroke-blue-500" />
          }
        />
        <div
          ref={ref}
          className={`relative h-6 w-full overflow-hidden text-gray-400 transition-colors duration-200 ease-in peer-hover:text-blue-500 ${
            totalComment === 0 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <AnimatedNumber containerHeight={height} number={totalComment} />
        </div>
      </div>
      <ReplyModal tweet={tweet} open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export default TweetCardReplyFeature;
