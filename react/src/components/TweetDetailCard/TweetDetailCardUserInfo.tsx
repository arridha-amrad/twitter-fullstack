import { FC } from 'react';
import Avatar from '../Avatar';
import { twMerge } from 'tailwind-merge';

const TweetDetailCardUserInfo: FC<{ tweet: Tweet }> = ({ tweet }) => {
  const author = tweet.post.author;

  const conversationLineClassName =
    '-z-10 w-0.5 bg-slate-200 dark:bg-slate-700';

  return (
    <div className="flex items-center gap-2 xl:gap-4">
      <div className=" py-3 relative">
        <Avatar className="z-10" src={author.imageURL} />
        {tweet.parent && (
          <div
            className={twMerge(
              conversationLineClassName,
              'absolute bottom-4 left-[19px]',
              tweet.isRetweet ? '-top-16' : '-top-0'
            )}
          />
        )}
      </div>
      <div>
        <h1 className="font-semibold">{author.fullname}</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          @{author.username}
        </p>
      </div>
    </div>
  );
};

export default TweetDetailCardUserInfo;
