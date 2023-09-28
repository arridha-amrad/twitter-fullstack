import Header from './Header';

import TrendsCard from '@/components/RightBar/TrendsCard';
import Footer from '@/components/RightBar/Footer';
import Overview from './Overview';
import HorizontalTab from '@/components/Tab';
import { tabs } from './tabs';
import YouMightLike from '@/components/RightBar/YouMightLike';
import { ReactNode } from 'react';
import RightBarContainer from '@/components/RightBarContainer';

type Props = {
  children: ReactNode;
  params: { username: string };
};

const ProfilePage = async ({ children, params }: Props) => {
  return (
    <>
      <main className="min-h-screen w-full max-w-[598px] overflow-x-clip border-x border-skin-base">
        <Header />
        <Overview />
        <HorizontalTab tabs={tabs(params.username)} />
        {children}
      </main>
      <RightBarContainer>
        <div className="mt-2 flex flex-col gap-4">
          <YouMightLike />
          <TrendsCard />
          <Footer />
        </div>
      </RightBarContainer>
    </>
  );
};

export default ProfilePage;
