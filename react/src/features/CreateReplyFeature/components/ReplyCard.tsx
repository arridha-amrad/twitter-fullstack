import Avatar from '../../../components/Avatar';
import TweetCardAuthorAndDate from '../../../components/TweetCard/TweetCardAuthorAndDate';
import { useMeQuery } from '../../../redux/user-slice';

type Props = {
  tweet: Tweet;
};

export default function TweetCard({ tweet }: Props) {
  const { data } = useMeQuery();
  return (
    <div className="relative flex items-start gap-4">
      <div className="absolute bottom-0 left-5 top-10 w-[4px] rounded-full bg-gray-300 dark:bg-gray-700" />
      <div className="w-max flex-shrink-0">
        <Avatar src={tweet.post.author.imageURL} />
      </div>
      <div className="flex flex-col overflow-hidden">
        <TweetCardAuthorAndDate post={tweet.post} />
        <div className="whitespace-break-spaces">{tweet.post.body}</div>
        <div className="my-5 text-sm">
          {tweet.post.author.id !== data?.id && (
            <>
              <span className="text-gray-400">Replying to </span>
              <span className="text-blue-500">
                @{tweet.post.author.username}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
