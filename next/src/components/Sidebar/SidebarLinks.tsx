'use client';

import Link from 'next/link';
import { sidebarLinks } from './Links';
import { usePathname } from 'next/navigation';

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <nav className="flex w-full flex-col items-center gap-1 xl:items-start">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.link;
        return (
          <Link
            className="flex aspect-square h-[50px] items-center justify-center rounded-full hover:bg-skin-hover xl:aspect-auto xl:px-4"
            key={link.name}
            href={`${link.link}`}
            scroll={false}
          >
            <span className="flex items-center gap-4">
              <div className="h-7 w-7 rounded-full">
                {isActive ? link.filledIcon : link.icon}
              </div>
              <span
                className={`hidden text-xl xl:block ${
                  isActive ? 'font-semibold' : ''
                }`}
              >
                {link.name}
              </span>
              {link.link === '/' && (
                <span className="absolute left-8 top-[10px] h-[7px] w-[7px] rounded-full bg-blue-500" />
              )}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarLinks;
