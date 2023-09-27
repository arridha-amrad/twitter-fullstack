import { Metadata } from 'next';
import Header from './Header';
import RightBar from '../RightBar';
import TrendsCard from '@/components/RightBar/TrendsCard';
import Footer from '@/components/RightBar/Footer';
import Overview from './Overview';
import HorizontalTab from '@/components/Tab';
import Tweets from './Tweets';
import { tabs } from './tabs';
import YouMightLike from '@/components/RightBar/YouMightLike';

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const username = params.username;

  return {
    title: `${username} / X`,
  };
}

const ProfilePage = ({ params, searchParams }: Props) => {
  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <Header />
        <Overview />
        <HorizontalTab tabs={tabs} type="profile-tab" />
        <Tweets />
      </main>
      <RightBar>
        <div className="mt-2 flex flex-col gap-4">
          <YouMightLike />
          <TrendsCard />
          <Footer />
        </div>
      </RightBar>
    </>
  );
};

export default ProfilePage;
