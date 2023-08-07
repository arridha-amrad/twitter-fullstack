import { ElementRef, Fragment, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import Footer from '../components/Footer';

import Navbar from '../components/Navbar';
import SearchInput from '../components/SearchInput';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar/Sidebar';

import useMeasure from 'react-use-measure';
import TweetsLoadingIndicator from '../components/Loaders/TweetsLoadingIndicator';
import TrendsCard from '../components/TrendsCard';
import UserToFollowCard from '../components/UserToFollowCard';
import VerificationCard from '../components/VerificationCard';
import TweetDetailCardReplyFeature from '../features/CreateReplyFeature/TweetPageReplyFeature';
import TextArea from '../features/CreateTweetFeatures/components/TextArea';
import GetAllRepliesFeature from '../features/GetAllRepliesFeature';
import GetTweetFeature from '../features/GetTweetFeature';
import GetTweetParents from '../features/GetTweetParents';
import LayoutCenter from '../layouts/LayoutCenter';
import LayoutRight from '../layouts/LayoutRight';
import { useGetTweetQuery } from '../redux/tweet-slice';

const TweetDetailPage = () => {
  const ref = useRef<ElementRef<typeof TextArea>>(null);
  const focus = () => ref.current?.getFocus();

  const params = useParams();

  const { data, isLoading } = useGetTweetQuery(params.tweetId as string);

  const [parentRef, { height }] = useMeasure();

  useEffect(() => {
    window.scrollTo({
      top: height,
      behavior: 'instant'
    });
    return () => {
      window.scrollTo({
        top: 0
      });
    };
  }, [height]);

  const tweet = data;

  return (
    <Fragment>
      {tweet && (
        <Seo
          description={tweet.post.body}
          title={`${tweet.user.fullname} on Twitter : "${tweet.post.body}"`}
        />
      )}
      <Container>
        <Sidebar />
        <LayoutCenter>
          <Navbar />
          {isLoading && <TweetsLoadingIndicator />}
          {data && (
            <>
              <GetTweetParents ref={parentRef} />
              <section className="h-max">
                <div className="xl:px-4 px-2">
                  <GetTweetFeature focus={focus} />
                </div>
                <div className="px-4">
                  <TweetDetailCardReplyFeature ref={ref} />
                </div>
                <hr className="border-t border-gray-300 dark:border-gray-700" />
                <div className="min-h-screen">
                  <GetAllRepliesFeature />
                </div>
              </section>
            </>
          )}
        </LayoutCenter>
        <LayoutRight>
          <div className="sticky top-0">
            <SearchInput />
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <VerificationCard />
            <TrendsCard />
            <UserToFollowCard />
            <Footer />
          </div>
        </LayoutRight>
      </Container>
    </Fragment>
  );
};

export default TweetDetailPage;
