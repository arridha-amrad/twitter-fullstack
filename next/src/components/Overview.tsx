'use client';

import { format } from 'date-fns';
import Background from './Background';
import Avatar from '@/components/Avatar';
import CalendarDaysIcon from '@heroicons/react/24/solid/CalendarDaysIcon';
import { useRouter } from 'next/navigation';

const Overview = () => {
  const date = format(new Date(), 'MMMM yyyy');
  const router = useRouter();
  const navigate = () => {
    router.push('/i/settings/profile', { scroll: false });
  };

  return (
    <div className="relative">
      <Background />
      <div className="relative flex h-[63px] w-full items-center justify-end px-3">
        <div className="absolute bottom-0 left-6 aspect-square w-full max-w-[135px] overflow-hidden rounded-full bg-skin-base p-1">
          <Avatar height={150} width={150} src="https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238876/PlayerProfile_Thumbnail_Mens_Lindelof1691780003409.jpg" className="h-full w-full border-none" />
        </div>
        <button
          onClick={navigate}
          className="mx-1 rounded-full border-2 border-skin-base bg-skin-base px-3 py-1.5 font-semibold"
        >
          Edit Profile
        </button>
      </div>
      <div className="px-6 py-3">
        <h1 className="text-2xl font-bold text-skin-base">Arridha Amrad</h1>
        <h2 className="text-skin-accent">@arridhaamrad</h2>
        <div className="mt-4 flex items-center gap-2 text-skin-accent">
          <CalendarDaysIcon className="h-5 w-5 text-skin-accent" />
          <p className="text-sm text-skin-accent">Joined {date}</p>
        </div>
        <div className="mx-1 mt-4 flex items-center gap-4 text-sm">
          <span className="font-bold">
            0 <span className="font-normal text-skin-accent">Folowings</span>
          </span>
          <span className="font-bold">
            0 <span className="font-normal text-skin-accent">Followers</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Overview;
