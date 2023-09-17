import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./Logo";
import SidebarMore from "./SidebarMore";

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="sticky top-0 border bottom-0 py-1 overflow-y-auto items-center xl:items-start w-full h-screen xl:flex-shrink-[3] xl:max-w-[275px] max-w-[70px] flex-shrink-0 gap-4 overflow-x-clip flex flex-col"
    >
      <SidebarLogo />
      <SidebarLinks />
      <SidebarMore />
    </div>
  );
};

export default Sidebar;
