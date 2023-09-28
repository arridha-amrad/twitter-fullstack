import { ReactNode } from 'react';
import RightBar from '../../../components/RightBarContainer';
import HorizontalTab from '@/components/Tab';
import { tabs } from './tab';
import VerificationCard from '@/components/RightBar/VerificationCard';
import TrendsCard from '@/components/RightBar/TrendsCard';
import UserToFollowCard from '@/components/RightBar/UserToFollow';
import Footer from '@/components/RightBar/Footer';
import CreateTweetFeature from '@/components/Forms/CreateTweetFeature';
import Counter from './Counter';

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
          <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
            Home
          </div>
          <HorizontalTab tabs={tabs} />
        </div>
        <CreateTweetFeature />
        {children}
        <div className='bg-purple-500/50 p-6'>
          <h1>this is layout</h1>
        <Counter/>
        </div>
      </main>
      <RightBar>
        <div className="mt-2 flex flex-col gap-4">
          <VerificationCard />
          <TrendsCard />
          <UserToFollowCard />
          <Footer />
        </div>
      </RightBar>
    </>
  );
}
