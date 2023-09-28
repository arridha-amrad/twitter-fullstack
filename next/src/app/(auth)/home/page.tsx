import { Metadata } from 'next';
import ForYouTweets from '@/components/Tweets/HomePage/ForYouTweets';

export const metadata: Metadata = {
  title: 'Home / X',
};

export default async function HomePage() {
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return <ForYouTweets />;
}
