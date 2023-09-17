import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./Logo";
import SidebarMore from "./SidebarMore";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ProfileMenu from "./ProfileMenu";

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="sticky px-2 top-0 bottom-0 py-1 overflow-y-auto items-center xl:items-start w-full h-screen xl:flex-shrink-[3] xl:max-w-[275px] max-w-[70px] flex-shrink-0 gap-4 overflow-x-clip flex flex-col"
    >
      <SidebarLogo />
      <SidebarLinks />
      <SidebarMore />
      <div className="flex-1 w-full flex justify-center xl:justify-start">
        <button className="bg-blue-500 dark:bg-green-500 xl:w-[90%] aspect-square xl:aspect-auto h-[50px] rounded-full flex items-center justify-center">
          <span className="text-white font-bold xl:block hidden w-full">
            Post
          </span>
          <PlusIcon className="w-7 h-7 text-white xl:hidden block" />
        </button>
      </div>
      <div className="w-full mb-4">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Sidebar;
