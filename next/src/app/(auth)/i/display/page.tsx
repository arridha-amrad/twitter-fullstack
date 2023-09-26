import DisplayModal from '@/components/Modals/DisplayModal';
import { cookies } from 'next/headers';
import HomePage from '../../home/page';
import ExplorePage from '../../explore/page';

export default function DisplayPage() {
  const url = cookies().get('prev-url')?.value;
  const children = () => {
    switch (url) {
      case '/home?':
        return <HomePage />;
      case '/explore?':
        return <ExplorePage />;
      default:
        return null;
    }
  };
  return (
    <>
      <DisplayModal />
      {children()}
    </>
  );
}
