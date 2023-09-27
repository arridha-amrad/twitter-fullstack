'use client';

import { format } from 'date-fns';
import useMeasure from 'react-use-measure';
import Background from './Background';
import Avatar from '@/components/Avatar';
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon';

const Overview = () => {
  const date = format(new Date(), 'MMMM yyyy');
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
          className="absolute bottom-0 left-6 aspect-square overflow-hidden rounded-full bg-skin-base p-1"
        >
          <Avatar
            height={avatarWidth}
            width={avatarWidth}
            src="https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238845/PlayerProfile_Thumbnail_Mens_Bruno1691778502502.jpg"
            className="h-full w-full"
          />
        </div>
        <button className="mx-1 rounded-full border-2 border-skin-base bg-skin-base px-3 py-1.5 font-semibold">
          Edit Profile
        </button>
      </div>
      <div className="px-6 py-3">
        <h1 className="text-2xl font-bold text-skin-base">Arridha Amrad</h1>
        <h2 className="text-skin-accent">@arridhaamrad</h2>
        <div className="mt-2 flex items-center gap-2 dark:text-gray-500">
          <CalendarIcon className="h-5 w-5 text-skin-accent" />
          <p className="text-sm text-skin-accent">Joined {date}</p>
        </div>
        <div className="mt-2 flex items-center gap-4 text-sm">
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
