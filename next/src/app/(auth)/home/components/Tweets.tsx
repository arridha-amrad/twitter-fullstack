'use client';

import FollowingTweets from '@/components/Tweets/HomePage/FollowingTweets';
import ForYouTweets from '@/components/Tweets/HomePage/ForYouTweets';
import { useSearchParams } from 'next/navigation';

const tabs = [
  { name: 'for-you', component: <ForYouTweets /> },
  { name: 'followings', component: <FollowingTweets /> },
];

const Tweets = () => {
  const params = useSearchParams();
  const tab = params.get('tab') ?? '';
  const idx = tabs.findIndex((t) => t.name === tab);
  const tIdx = idx >= 0 ? idx : 0;
  return tabs[tIdx].component;
};

export default Tweets;
