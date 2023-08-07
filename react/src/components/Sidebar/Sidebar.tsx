import SidebarCard from './SidebarCard';
import SidebarLinks from './SidebarLinks';
import SidebarLogo from './SidebarLogo';
import SidebarMore from './SidebarMore';
import SidebarCreateTweetButton from './SidebarCreateTweetButton';

const Sidebar = () => {
  return (
    <div
      id="sidebar"
      className="sticky top-0 bottom-0 py-1 xl:px-3 overflow-y-auto items-center xl:items-start w-full h-screen xl:flex-shrink-[3] xl:max-w-[275px] max-w-[70px] flex-shrink-0 gap-[0.6rem] overflow-x-clip flex flex-col"
    >
      <SidebarLogo />
      <SidebarLinks />
      <SidebarMore />
      <SidebarCreateTweetButton />
      <SidebarCard />
    </div>
  );
};

export default Sidebar;
