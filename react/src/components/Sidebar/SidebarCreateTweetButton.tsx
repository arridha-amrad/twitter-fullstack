import PencilSquare from '@heroicons/react/20/solid/PencilSquareIcon';
import { Fragment, useState } from 'react';
import CreateTweetFeatureModal from '../../features/CreateTweetFeatures/ModalCreateTweetFeature';

const SidebarCreateTweetButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <div className="xl:w-[90%] w-max xl:pl-2 flex-1">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center w-12 h-12 transition-all duration-150 ease-linear bg-blue-500 rounded-full shadow-lg outline-none dark:shadow-none shadow-blue-100 xl:w-full hover:bg-blue-600"
        >
          <span className="hidden text-lg font-semibold text-white xl:block">
            Tweet
          </span>
          <PencilSquare className="block w-6 h-6 xl:hidden fill-white" />
        </button>
      </div>
      <CreateTweetFeatureModal open={open} setOpen={setOpen} />
    </Fragment>
  );
};

export default SidebarCreateTweetButton;
