import ArrowUpTrayIcon from '@heroicons/react/24/outline/ArrowUpTrayIcon';
import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon';
import TweetCardLikeFeature from '../../features/LikeTweetFeature/LikeFeature';
import ButtonIcon from '../ButtonIcon';
import TweetCardReplyFeature from '../../features/CreateReplyFeature/ReplyFeature';
import RetweetFeature from '../../features/RetweetFeature/RetweetFeature';

type Props = {
  tweet: Tweet;
};

export default function TweetCardActions({ tweet }: Props) {
  return (
    <div className="flex h-8 items-center justify-between">
      <TweetCardReplyFeature tweet={tweet} />
      <RetweetFeature tweet={tweet} />
      <TweetCardLikeFeature tweet={tweet} />
      <div className="h-full flex-1">
        <ButtonIcon
          className="group hover:bg-blue-500/30"
          tooltip="View"
          icon={
            <ChartBarSquareIcon className="w-[18px] stroke-gray-600 stroke-2 group-hover:stroke-blue-500" />
          }
        />
      </div>
      <div className="h-full flex-1">
        <ButtonIcon
          className="group h-full hover:bg-blue-500/30 "
          tooltip="Share"
          icon={
            <ArrowUpTrayIcon className="w-[18px] stroke-gray-600 stroke-2 group-hover:stroke-blue-500" />
          }
        />
      </div>
      <div className="hidden sm:block"></div>
    </div>
  );
}
