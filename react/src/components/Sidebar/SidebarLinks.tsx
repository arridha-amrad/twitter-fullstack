import { NavLink } from 'react-router-dom';
import { sidebarLinks } from './Links';
import { useMeQuery } from '../../redux/user-slice';

const SidebarLinks = () => {
  const { data } = useMeQuery();
  return (
    <>
      <nav className="flex w-full flex-col items-center gap-[0.6rem] xl:items-start">
        {sidebarLinks.map((link) => (
          <NavLink
            className={({ isActive }) =>
              `relative flex h-12 w-12 items-center justify-center rounded-full text-xl transition-[hover] duration-200 ease-linear hover:bg-gray-200 hover:dark:bg-slate-700 xl:w-max xl:justify-start xl:pl-3 xl:pr-7 ${
                isActive ? 'font-bold' : 'font-normal'
              }`
            }
            key={link.name}
            to={`${link.link.replace(':username', data?.username ?? '')}`}
          >
            {({ isActive }) => (
              <span className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-full">
                  {isActive ? link.filledIcon : link.icon}
                </div>
                <span className="hidden xl:block">{link.name}</span>
                {link.link === '/' && (
                  <span className="absolute left-8 top-[10px] h-[7px] w-[7px] rounded-full bg-blue-500" />
                )}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default SidebarLinks;
