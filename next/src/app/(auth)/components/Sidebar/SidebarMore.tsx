import EllipsisHorizontalCircleIcon from "@heroicons/react/24/outline/EllipsisHorizontalCircleIcon";

const SidebarMore = () => {
  return (
    <button className="h-[50px] gap-4 hover:bg-gray-50 hover:dark:bg-neutral-900 flex items-center justify-center xl:px-4 aspect-square xl:aspect-auto rounded-full">
      <div className="w-7 h-7 flex">
        <EllipsisHorizontalCircleIcon className="w-full h-full" />
      </div>
      <span className="hidden xl:block text-xl">More</span>
    </button>
  );
};

export default SidebarMore;
