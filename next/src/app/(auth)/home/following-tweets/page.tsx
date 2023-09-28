import FollowingTweets from '@/components/Tweets/HomePage/FollowingTweets';

export default async function FollowingTweetsPage() {
  await new Promise((res) => {
    setTimeout(() => {
      res('OK');
    }, 5000);
  });
  return <FollowingTweets />;
}
