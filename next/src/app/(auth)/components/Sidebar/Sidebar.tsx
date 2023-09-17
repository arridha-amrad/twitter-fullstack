import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./Logo";
import SidebarMore from "./SidebarMore";
import ProfileMenu from "./ProfileMenu";
import CreatePostButton from "./CreatePostButton";
import MoreDropDown from "./MoreDropDown";

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="sticky px-2 top-0 bottom-0 py-1 overflow-y-auto items-center xl:items-start w-full min-h-screen xl:flex-shrink-[3] xl:max-w-[275px] max-w-[70px] flex-shrink-0 overflow-x-clip flex flex-col"
    >
      <SidebarLogo />
      <SidebarLinks />
      <MoreDropDown />
      <CreatePostButton />
      <div className="w-full mb-4">
        <ProfileMenu />
      </div>
    </div>
  );
};

export default Sidebar;
