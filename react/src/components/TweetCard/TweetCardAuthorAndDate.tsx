import { useMeQuery } from '../../redux/user-slice';
import timeSetter from '../../utils/timeSetter';

type Props = {
  post: Post;
};

export default function TweetCardAuthorAndDate({ post }: Props) {
  const { data } = useMeQuery();
  const date = timeSetter(new Date(post.createdAt).toString());
  const username = post.author.id === data?.id ? 'You' : post.author.username;
  return (
    <div className="flex flex-1 items-center justify-start gap-1 overflow-x-hidden">
      <p className="flex-shrink overflow-x-hidden text-ellipsis whitespace-nowrap text-base font-bold">
        {post.author.fullname}
      </p>
      <div className="self-center">·</div>
      <p className="flex-shrink overflow-x-hidden text-ellipsis whitespace-nowrap text-sm font-light">
        @{username}
      </p>
      <div className="self-center">·</div>
      <p className="flex-1 flex-nowrap text-sm font-light">{date}</p>
    </div>
  );
}
