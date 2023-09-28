import { Metadata } from 'next';
import ForYouTweets from '@/components/Tweets/HomePage/ForYouTweets';

export const metadata: Metadata = {
  title: 'Home / X',
};

export default async function HomePage() {
  return <ForYouTweets />
}
