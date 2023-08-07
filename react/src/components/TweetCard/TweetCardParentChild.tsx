import TweetCardCommentFeature from '../../features/CreateReplyFeature/ReplyFeature';
import TweetCardLikeFeature from '../../features/LikeTweetFeature/LikeFeature';
import TweetCardRetweetFeature from '../../features/RetweetFeature/RetweetFeature';
import timeSetter from '../../utils/timeSetter';
import Avatar from '../Avatar';
import TweetCardParentsAuthor from './TweetCardParentsAuthor';

import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../redux/user-slice';
import TweetCardCarousel from './TweetCardCarousel';
import RetweetInfo from './TweetCardRetweetStatus';

const TweetCardParentChild: FC<{
  tweet: Tweet;
  children: ReactNode;
}> = ({ tweet, children }) => {
  const { data } = useMeQuery();
  const date = timeSetter(new Date(tweet.post.createdAt).toString());

  const navigate = useNavigate();
  const username =
    tweet.post.author.id === data?.id ? 'You' : tweet.post.author.username;
  return (
    <>
      <section
        className="hover:-pt-3 relative cursor-pointer px-6 py-3 transition-all duration-100 ease-linear hover:bg-slate-200 hover:dark:bg-gray-900"
        onClick={() => navigate(`/tweet/${tweet.id}`)}
      >
        {children}
        {tweet.isRetweet && <RetweetInfo tweet={tweet} />}
        <div className="flex items-start gap-4">
          <div>
            <Avatar
              className="z-10 h-12 w-12"
              src={tweet.post.author.imageURL}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex w-full items-center justify-start gap-1">
              <h1 className="font-bold">{tweet.post.author.fullname}</h1>
              <div className="text-xs">&bull;</div>
              <p className="text-sm font-light">@{username}</p>
              <div className="text-xs">&bull;</div>
              <p className="flex-1 text-sm font-light">{date}</p>
            </div>

            {tweet.parent && <TweetCardParentsAuthor tweet={tweet} />}

            <p className="mt-3 whitespace-pre-wrap">{tweet.post.body}</p>
            {tweet.post.files.length > 0 && (
              <TweetCardCarousel files={tweet.post.files} />
            )}
            <div className="mr-12 mt-3 flex justify-between">
              <TweetCardCommentFeature tweet={tweet} />
              <TweetCardLikeFeature tweet={tweet} />
              <TweetCardRetweetFeature tweet={tweet} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TweetCardParentChild;
