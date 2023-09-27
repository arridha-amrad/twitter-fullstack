import { Metadata } from 'next';
import HomeTab from '../../../components/Tab';
import CreateTweetFeature from './components/CreateTweetFeatures/CreateTweetFeature';
import Tweets from './components/Tweets';
import LayoutRight from '../RightBar';
import Footer from '@/components/RightBar/Footer';
import VerificationCard from '@/components/RightBar/VerificationCard';
import TrendsCard from '@/components/RightBar/TrendsCard';
import UserToFollowCard from '@/components/RightBar/UserToFollow';

export const metadata: Metadata = {
  title: 'Home / X',
};

export default async function HomePage() {
  const tabs = [
    { name: 'For You', param: 'for-you' },
    { name: 'Followings', param: 'followings' },
  ];

  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
          <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
            Home
          </div>
          <HomeTab tabs={tabs} type="home-tab" />
        </div>
        <CreateTweetFeature />
        <Tweets />
      </main>
      <LayoutRight>
        <div className="mt-2 flex flex-col gap-4">
          <VerificationCard />
          <TrendsCard />
          <UserToFollowCard />
          <Footer />
        </div>
      </LayoutRight>
    </>
  );
}
