import RetweetIcon from '@heroicons/react/24/solid/ArrowPathRoundedSquareIcon';
import { useMeQuery } from '../../redux/user-slice';

type Props = {
  tweet: Tweet;
};

const TweetCardRetweetStatus = ({ tweet }: Props) => {
  const { data: auth } = useMeQuery();
  if (!tweet.isRetweet) return null;
  return (
    <div className="mx-5 my-1 flex items-center gap-3">
      <RetweetIcon className="h-5 w-5 text-gray-400 dark:text-slate-500" />
      <span className="text-sm font-semibold text-gray-400 dark:text-slate-500">
        {tweet.user.id === auth?.id ? 'You' : tweet.user.username} Retweeted
      </span>
    </div>
  );
};

export default TweetCardRetweetStatus;
