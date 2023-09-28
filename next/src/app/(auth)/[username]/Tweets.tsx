'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProfileReplies from '@/components/Tweets/ProfilePage/ProfileReplies';
import ProfileLikes from '@/components/Tweets/ProfilePage/ProfileLikes';
import ProfileTweets from '@/components/Tweets/ProfilePage/ProfileTweets';
import ProfileMedia from '@/components/Tweets/ProfilePage/ProfileMedia';
import ProfileHighlights from '@/components/Tweets/ProfilePage/ProfileHighlights';

const data = [
  { tab: 'tweets', component: <ProfileTweets /> },
  { tab: 'replies', component: <ProfileReplies /> },
  { tab: 'media', component: <ProfileMedia /> },
  { tab: 'likes', component: <ProfileLikes /> },
  { tab: 'highlights', component: <ProfileHighlights /> },
];

const Tweets = () => {
  const params = useSearchParams();
  const paramTab = params.get('tab');

  const [tab, setTab] = useState('');

  useEffect(() => {
    const savedTab = sessionStorage.getItem('profile-tab') ?? 'tweets';
    setTab(savedTab);
  }, [paramTab]);

  return data.find((d) => d.tab === tab)?.component ?? null;
};

export default Tweets;
