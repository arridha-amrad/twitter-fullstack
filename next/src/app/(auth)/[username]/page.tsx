import { Metadata } from "next";

type Props = {
  params: { username: string };
};

export const metadata: Metadata = {
  title: 'Profile / X',
};

export default async function TweetsPage(){
  await new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 2000);
  });
  return (
    <div>Tweets Page</div>
  )
}