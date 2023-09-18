"use client";

import { Menu } from "@headlessui/react";
import DefaultAvatar from "@/images/default.png";
import Image from "next/image";
import EllipsisHorizontalIcon from "@heroicons/react/20/solid/EllipsisHorizontalIcon";
import switchTheme from "../ChangeThemeFeature/switchTheme";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import useMeasure from "react-use-measure";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import MoonIcon from "@heroicons/react/24/solid/MoonIcon";
import LogoutIcon from "@heroicons/react/24/solid/ArrowLeftOnRectangleIcon";
import { mergeRefs } from "react-merge-refs";
import { useTheme } from "@/context/AppContext";

const ProfileMenu = () => {
  const [ref, { width }] = useMeasure();

  const [referenceElement, setReferenceElement] = useState<any | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
    placement: width <= 228 ? "top-start" : "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "flip",
      },
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
    ],
  });

  const { theme, setTheme } = useTheme();

  const menu = [
    {
      label: `Logout @arridhaamrad`,
      fn: () => {},
    },
    {
      label: "Switch Theme",
      fn: () => {
        switchTheme(theme);
        theme === "dark" ? setTheme!("light") : setTheme!("dark");
      },
    },
  ];

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={mergeRefs([ref, setReferenceElement])}
            as="div"
            className=" cursor-pointer"
          >
            <ProfileCard />
          </Menu.Button>
          {typeof window === "object" ? (
            createPortal(
              <AnimatePresence initial={false}>
                {open && (
                  <>
                    <div className="fixed inset-0" />
                    <Menu.Items
                      static
                      style={styles.popper}
                      {...attributes.popper}
                      ref={setPopperElement}
                      className="relative z-20 outline-none"
                    >
                      <div className="absolute inset-0 -z-10 bg-slate-300 blur dark:bg-neutral-600" />
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        className="overflow-y-hidden"
                      >
                        <div
                          style={{
                            minWidth: width < 228 ? "max-content" : width,
                          }}
                          className="p2 overflow-hidden rounded-lg border-slate-300 bg-white dark:border-slate-700 dark:bg-red-500"
                        >
                          {menu.map((item, i) => (
                            <Menu.Item key={i}>
                              {({ active }) => (
                                <button
                                  className={`flex h-14 min-w-full cursor-pointer items-center justify-start gap-3 px-5 ${
                                    active
                                      ? "bg-blue-500 text-white"
                                      : "bg-white dark:bg-neutral-900 dark:text-white text-black"
                                  }`}
                                  onClick={() => {
                                    item.fn();
                                  }}
                                >
                                  {item.label.includes("Logout") && (
                                    <LogoutIcon className="h-5 w-5" />
                                  )}
                                  {item.label === "Switch Theme" && (
                                    <>
                                      <SunIcon className="hidden h-5 w-5 dark:block" />
                                      <MoonIcon className="block h-5 w-5 dark:hidden" />
                                    </>
                                  )}
                                  <p className="font-semibold">{item.label}</p>
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                        <div
                          ref={setArrowElement}
                          className={`absolute -bottom-2 -z-10 h-5 w-5 rotate-45 bg-white shadow-sm shadow-gray-300 dark:bg-black dark:shadow-gray-500 ${
                            width < 228 ? "left-5" : "left-1/2 -translate-x-1/2"
                          }`}
                        />
                      </motion.div>
                    </Menu.Items>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )
          ) : (
            <></>
          )}
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;

const ProfileCard = () => {
  const data = {
    fullname: "arridha amrad",
    username: "arridhaamrad",
  };
  return (
    <div className="flex h-full w-full items-center overflow-hidden p-2 hover:bg-gray-50 hover:dark:bg-neutral-900 rounded-full">
      <div className="flex flex-1 items-center gap-2">
        <div className="h-11 w-11 overflow-hidden rounded-full">
          <Image
            className="h-full w-full object-cover object-center"
            src={DefaultAvatar}
            alt="avatar"
          />
        </div>
        <div className="hidden w-[140px] overflow-hidden xl:block">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-start font-bold">
            {data?.fullname}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-start text-sm">
            @{data?.username}
          </p>
        </div>
      </div>

      <button className="hidden h-5 w-5 xl:block">
        <EllipsisHorizontalIcon className="h-5 w-5" />
      </button>
    </div>
  );
};