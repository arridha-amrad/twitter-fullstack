"use client";

import Link from "next/link";
import { sidebarLinks } from "./Links";
import { usePathname } from "next/navigation";

const SidebarLinks = () => {
  const pathname = usePathname();
  return (
    <nav className="flex w-full flex-col items-center xl:items-start gap-1">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.link;
        return (
          <Link
            className="h-[50px] hover:bg-gray-50 hover:dark:bg-neutral-900 flex items-center justify-center xl:px-4 aspect-square xl:aspect-auto rounded-full"
            key={link.name}
            href={`${link.link}`}
          >
            <span className="flex items-center gap-4">
              <div className="h-7 w-7 rounded-full">
                {isActive ? link.filledIcon : link.icon}
              </div>
              <span
                className={`hidden xl:block text-xl ${
                  isActive ? "font-semibold" : ""
                }`}
              >
                {link.name}
              </span>
              {link.link === "/" && (
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
