import { ReactNode, Ref, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../redux/user-slice';
import Avatar from '../Avatar';
import TweetCardActions from './TweetCardActions';
import TweetCardAuthorAndDate from './TweetCardAuthorAndDate';
import TweetCardCarousel from './TweetCardCarousel';
import TweetCardMore from './TweetCardMore';
import TweetCardParentsAuthor from './TweetCardParentsAuthor';
import TweetCardRetweetStatus from './TweetCardRetweetStatus';
import useTweetUpdate from '../../hooks/useTweetUpdate';

type Props = {
  tweet: Tweet;
  children?: ReactNode;
};

// eslint-disable-next-line
const TweetCard = ({ tweet, children }: Props, ref: Ref<HTMLElement>) => {
  if (tweet.isEnabled)
    return (
      <EnabledTweetCard ref={ref} tweet={tweet}>
        {children}
      </EnabledTweetCard>
    );
  return <DisabledTweetCard ref={ref} />;
};
export default forwardRef(TweetCard);

// eslint-disable-next-line
const DTweetCard = ({}, ref: Ref<HTMLElement>) => {
  return (
    <article
      ref={ref}
      className="m-2 space-x-2 rounded-lg px-5 py-2 dark:border-slate-800"
    >
      <span>This Tweet was deleted by the Tweet author.</span>
      <span className="cursor-pointer text-blue-500">Learn More</span>
    </article>
  );
};
const DisabledTweetCard = forwardRef(DTweetCard);

const ETweetCard = ({ tweet, children }: Props, ref: Ref<HTMLElement>) => {
  const { data } = useMeQuery();
  const navigate = useNavigate();
  const isMyTweet = tweet.post.author.id === data?.id;

  useTweetUpdate(tweet);

  return (
    <article
      className="relative cursor-pointer px-2 hover:bg-gray-300/20 hover:dark:bg-gray-600/20 xl:px-4"
      onClick={() => navigate(`/tweet/${tweet.id}`)}
    >
      <TweetCardRetweetStatus tweet={tweet} />
      <section ref={ref} className="flex gap-4">
        <div className="relative pt-3">
          <Avatar src={tweet.post.author.imageURL} />
          {children}
        </div>
        <div className="flex-1 overflow-hidden py-2">
          <div className="flex items-center gap-2 overflow-hidden xl:gap-4">
            <TweetCardAuthorAndDate post={tweet.post} />
            {isMyTweet && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="h-8 w-8 flex-shrink-0"
              >
                <TweetCardMore tweet={tweet} />
              </div>
            )}
          </div>
          <TweetCardParentsAuthor tweet={tweet} />
          <div className="whitespace-break-spaces">{tweet.post.body}</div>
          <TweetCardCarousel files={tweet.post.files} />
          <TweetCardActions tweet={tweet} />
        </div>
      </section>
    </article>
  );
};
const EnabledTweetCard = forwardRef(ETweetCard);
