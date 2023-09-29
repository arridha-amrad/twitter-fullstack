'use client';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { useRouter, useSearchParams } from 'next/navigation';

const CreatePostButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigate = () => {
    if (searchParams.get('compose-tweet') === 'true') {
      router.replace('/i/compose/tweet', { scroll: false });
    } else {
      router.push('/i/compose/tweet', { scroll: false });
    }
  };
  return (
    <div className="my-4 flex w-full flex-1 justify-center xl:justify-start">
      <button
        id="btn-post-composer"
        onClick={navigate}
        className="flex aspect-square h-[50px] items-center justify-center rounded-full bg-skin-fill xl:aspect-auto xl:w-[90%]"
      >
        <span className="hidden w-full font-bold text-white xl:block">
          Post
        </span>
        <PlusIcon className="block h-6 w-6 text-white xl:hidden" />
      </button>
    </div>
  );
};

export default CreatePostButton;
