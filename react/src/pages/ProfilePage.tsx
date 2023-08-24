import CalendarIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { format } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import ButtonIcon from '../components/ButtonIcon';
import Container from '../components/Container';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar/Sidebar';
import TrendsCard from '../components/TrendsCard';
import UserToFollowCard from '../components/UserToFollowCard';
import VerificationCard from '../components/VerificationCard';
import GetAllMyRepliesFeature from '../features/GetAllMyRepliesFeature';
import GetAllMyTweetsFeature from '../features/GetAllMyTweetsFeature';
import LayoutCenter from '../layouts/LayoutCenter';
import LayoutRight from '../layouts/LayoutRight';
import { useMeQuery } from '../redux/user-slice';
import Tab from '../components/Tab';

const Profile = () => {
  const { data } = useMeQuery();
  const tabList = ['Tweets', 'Replies', 'Media', 'Likes'];
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const profileUsername = params.username;

  const arrPath = location.pathname.split('/');
  const pathname = arrPath.length === 2 ? 'tweets' : arrPath[2];

  console.log('pathname', pathname);

  const activeTabIndex = tabList.findIndex((t) => t.toLowerCase() === pathname);

  // const [params, setParam] = useSearchParams();

  // const tabIndex = tabList.findIndex((tab) => tab === params.get('tab'));

  const [index, setIndex] = useState(activeTabIndex);

  useEffect(() => {
    if (pathname === 'tweets') {
      setIndex(0);
    } else {
      setIndex(activeTabIndex);
    }
    console.log('pathname changed');
  }, [pathname]);

  // const tabCallback = () => {
  //   if (index === 0) {
  //     navigate(`/${data?.username}`);
  //   } else {
  //     navigate(`/${data?.username}/${tabList[index].toLowerCase()}`);
  //   }
  // };

  useEffect(() => {
    if (index === 0) {
      navigate(`/${profileUsername}`);
    } else {
      navigate(`/${profileUsername}/${tabList[index].toLowerCase()}`);
    }
    console.log('index : ', index);
  }, [index]);

  return (
    <Fragment>
      <Seo
        title="Twitter / Profile"
        description={`${data?.username} twitter profile page`}
      />
      <Container>
        <Sidebar />
        <LayoutCenter>
          <Header />
          <Overview />
          <div className="flex h-14 w-full items-center border-b dark:border-b-gray-600 border-b-gray-200">
            <Tab tabList={tabList} index={index} setIndex={setIndex} />
          </div>
          <Content index={index} />
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

const Content = ({ index }: { index: number }) => {
  const content = [
    <GetAllMyTweetsFeature key={index} />,
    <GetAllMyRepliesFeature key={index} />,
    <p key={index}>Medias</p>,
    <p key={index}>Likes</p>
  ];
  return <section>{content[index]}</section>;
};

const Overview = () => {
  const { data } = useMeQuery();
  const date = format(new Date(data?.createdAt ?? ''), 'MMMM yyyy');
  const [ref, { width }] = useMeasure();

  const avatarWidth = (145 / 600) * width;

  return (
    <div ref={ref} className="relative">
      <Background />
      <div
        className="relative flex w-full items-center justify-end px-3"
        style={{ height: avatarWidth / 2 }}
      >
        <div
          style={{ width: avatarWidth }}
          className="absolute bottom-0 left-6 aspect-square overflow-hidden rounded-full bg-white p-1 dark:bg-black"
        >
          <img
            className="h-full w-full rounded-full object-cover"
            src={
              data?.imageURL === 'default'
                ? `${import.meta.env.VITE_CLIENT_BASE_URL}/default.png`
                : data?.imageURL
            }
            alt="avatar"
          />
        </div>
        <button className="mx-1 rounded-full border-2 border-gray-300 bg-white px-3 py-1.5 font-semibold dark:border-gray-700 dark:bg-black">
          Edit Profile
        </button>
      </div>
      <div className="px-6 py-3">
        <h1 className="text-2xl font-bold">{data?.fullname}</h1>
        <h2 className="dark:text-gray-500">@{data?.username}</h2>
        <div className="mt-2 flex items-center gap-2 dark:text-gray-500">
          <CalendarIcon className="h-5 w-5" />
          <p className="text-sm">Joined {date}</p>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm">
          <span className="font-bold">
            0 <span className="font-normal dark:text-gray-500">Folowings</span>
          </span>
          <span className="font-bold">
            0 <span className="font-normal dark:text-gray-500">Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Background = () => {
  return (
    <div className="aspect-[3/1] w-full">
      <img
        className="h-full w-full object-cover"
        alt="background"
        src="https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const { data } = useMeQuery();

  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center bg-white/30 backdrop-blur dark:bg-black/30">
      <div>
        <ButtonIcon
          className="w-10 h-10"
          icon={<ArrowLeftIcon className="w-5 h-5" />}
          tooltip="back"
          onClick={() => navigate('/')}
        />
      </div>
      <div>
        <h1>{data?.fullname}</h1>
      </div>
    </div>
  );
};

export default Profile;
