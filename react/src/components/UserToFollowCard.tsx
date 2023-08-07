import Avatar from './Avatar';

const UserToFollowCard = () => {
  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900">
      <h1 className="px-5 pt-3 text-xl font-bold">Who to follow</h1>
      <div className="flex cursor-pointer items-center gap-2 px-5 py-2 hover:bg-gray-200 hover:dark:bg-gray-800">
        <Avatar src="default" />
        <div className="flex-1 overflow-hidden">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold hover:underline">
            Joko Widodo
          </h1>
          <p className="text-sm text-gray-500">@Jokowi</p>
        </div>
        <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
          Follow
        </button>
      </div>

      <div className="flex cursor-pointer items-center gap-2 px-5 py-2 hover:bg-gray-200 hover:dark:bg-gray-800">
        <Avatar src="default" />
        <div className="flex-1 overflow-hidden">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold hover:underline">
            B. Jusuf Habibi
          </h1>
          <p className="text-sm text-gray-500">@Habibi</p>
        </div>
        <button className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black">
          Follow
        </button>
      </div>

      <button className="px-6 py-3 text-start text-blue-500 hover:bg-gray-200 hover:dark:bg-gray-800">
        Show more
      </button>
    </div>
  );
};

export default UserToFollowCard;
