'use client';

import { ReactNode, useEffect, useState } from 'react';
import RightBar from '../RightBar';
import HorizontalTab from '@/components/Tab';
import { tabs } from './tab';
import VerificationCard from '@/components/RightBar/VerificationCard';
import TrendsCard from '@/components/RightBar/TrendsCard';
import UserToFollowCard from '@/components/RightBar/UserToFollow';
import Footer from '@/components/RightBar/Footer';
import { useSearchParams } from 'next/navigation';
import CreateTweetFeature from './components/CreateTweetFeatures/CreateTweetFeature';

type Props = {
  followingTweets: ReactNode;
  children: ReactNode;
};

export default function HomeLayout({ followingTweets, children }: Props) {
  const [content, setContent] = useState<ReactNode>(null);
  const params = useSearchParams();
  const paramTab = params.get('tab');

  useEffect(() => {
    if (paramTab === null) {
      const savedTab = sessionStorage.getItem('home-tab') ?? 'for-you';
      setContent(savedTab === 'for-you' ? children : followingTweets);
    } else {
      setContent(paramTab === 'for-you' ? children : followingTweets);
    }
    // eslint-disable-next-line
  }, [paramTab]);

  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
          <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
            Home
          </div>
          <HorizontalTab tabs={tabs} type="home-tab" />
        </div>
        <CreateTweetFeature />
        {content}
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
