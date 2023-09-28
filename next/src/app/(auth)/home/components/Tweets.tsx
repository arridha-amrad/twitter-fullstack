'use client';

import FollowingTweets from '@/components/Tweets/HomePage/FollowingTweets';
import ForYouTweets from '@/components/Tweets/HomePage/ForYouTweets';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const tabs = [
  { name: 'for-you', component: <ForYouTweets /> },
  { name: 'followings', component: <FollowingTweets /> },
];

const Tweets = () => {
  const params = useSearchParams();
  const paramTab = params.get('tab');

  const [tab, setTab] = useState('');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('home-tab') ?? 'tweets';
    setTab(savedTab);
  }, [paramTab]);
  
  return tabs.find((d) => d.name === tab)?.component ?? null;
};

export default Tweets;
