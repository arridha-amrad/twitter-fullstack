import { Metadata } from 'next';
import HomeTab from './components/tab';
import CreateTweetFeature from './components/CreateTweetFeatures/CreateTweetFeature';
import Tweets from './components/Tweets';
import LayoutRight from '../RightBar';
import VerificationCard from './components/VerificationCard';
import TrendsCard from './components/TrendsCard';
import UserToFollowCard from './components/UserToFollow';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Home / X',
};

export default async function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
          <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
            Home
          </div>
          <HomeTab />
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
