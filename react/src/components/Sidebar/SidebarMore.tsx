import EllipsisHorizontalCircleIcon from "@heroicons/react/24/outline/EllipsisHorizontalCircleIcon";

const SidebarMore = () => {
  return (
    <button className="relative flex items-center justify-center w-12 h-12 gap-4 text-xl transition-all duration-200 ease-linear rounded-full hover:dark:bg-slate-700 hover:bg-gray-200 xl:pl-3 xl:pr-7 xl:w-max xl:justify-start">
      <div className="w-7 h-7">
        <EllipsisHorizontalCircleIcon className="w-full h-full" />
      </div>
      <span className="hidden xl:block">More</span>
    </button>
  );
};

export default SidebarMore;
