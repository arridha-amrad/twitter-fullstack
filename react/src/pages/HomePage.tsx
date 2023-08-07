import { Fragment, useState } from 'react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar/Sidebar';
import Tab from '../components/Tab';
import TrendsCard from '../components/TrendsCard';
import UserToFollowCard from '../components/UserToFollowCard';
import VerificationCard from '../components/VerificationCard';
import CreateTweetFeature from '../features/CreateTweetFeatures/CreateTweetFeature';
import LoadTweetFeature from '../features/GetAllTweetsFeature';
import LayoutCenter from '../layouts/LayoutCenter';
import LayoutRight from '../layouts/LayoutRight';
import { useMeQuery } from '../redux/user-slice';

const HomePage = () => {
  const { data } = useMeQuery();
  const tabs = ['For you', 'Following'];
  const [index, setIndex] = useState(0);

  return (
    <Fragment>
      <Seo
        title="Twitter / Home"
        description={`${data?.username} twitter home page`}
      />
      <Container>
        <Sidebar />
        <LayoutCenter>
          <section className="sticky top-0 z-20 flex h-28 w-full flex-col bg-white/30 backdrop-blur dark:bg-black/30">
            <div className="flex flex-1 items-center px-5 text-xl font-semibold">
              Home
            </div>
            <div className="flex flex-1 border-b dark:border-gray-700">
              <Tab index={index} setIndex={setIndex} tabList={tabs} />
            </div>
          </section>
          <CreateTweetFeature />
          {index === 0 && <LoadTweetFeature index={index} />}
          {index === 1 && <p>following tweets</p>}
        </LayoutCenter>
        <LayoutRight>
          <div className="sticky top-0">
            <SearchInput />
          </div>
          <div className="mt-2 flex flex-col gap-4">
            <VerificationCard />
            <TrendsCard />
            <UserToFollowCard />
            <Footer />
          </div>
        </LayoutRight>
      </Container>
    </Fragment>
  );
};

export default HomePage;
