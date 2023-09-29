'use client';

import ButtonIcon from '@/components/Buttons/ButtonIcon';
import ArrowLeftIcon from '@heroicons/react/24/outline/ArrowLeftIcon';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const back = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 flex h-16 w-full items-center bg-skin-base/50 px-4 py-1 backdrop-blur">
      <div className="">
        <ButtonIcon
          className="h-10 w-10"
          icon={<ArrowLeftIcon className="h-4 w-4 stroke-[2px]" />}
          tooltip="back"
          onClick={back}
        />
      </div>
      <div className="ml-4">
        <h1 className="text-xl font-bold">Arridha Amrad</h1>
        <p className="text-sm font-light text-skin-accent">25 Posts</p>
      </div>
    </div>
  );
};

export default Header;
