import { ReactNode } from 'react';
import RightBar from '../../../components/RightBarContainer';
import HorizontalTab from '@/components/Tab';
import VerificationCard from '@/components/RightBar/VerificationCard';
import TrendsCard from '@/components/RightBar/TrendsCard';
import UserToFollowCard from '@/components/RightBar/UserToFollow';


import RightBarContainer from '@/components/RightBarContainer';
import { Metadata } from 'next';
import Footer from '@/components/RightBar/Footer';
import CreateTweetFeature from '@/components/Forms/CreateTweetFeature';

export const metadata: Metadata = {
  title: 'Home / X',
};

type Props = {
  children: ReactNode;
};

const tabs = [
  { name: 'For You', url: '/home',  },
  { name: 'Followings', url: '/home/following-tweets' },
];

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
      </main>
      <RightBarContainer>
        <div className="mt-2 flex flex-col gap-4">
          <VerificationCard />
          <TrendsCard />
          <UserToFollowCard />
          <Footer />
        </div>
      </RightBarContainer>
    </>
  );
}
