"use client";

import { Disclosure, Menu } from "@headlessui/react";
import EllipsisHorizontalCircleIcon from "@heroicons/react/24/outline/EllipsisHorizontalCircleIcon";
import {
  AtSymbolIcon,
  BookmarkIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { data } from "autoprefixer";

const MoreDropDown = () => {
  const dataOne = [
    {
      url: "/bookmarks",
      name: "Bookmarks",
      icon: <BookmarkIcon className="w-full h-full" />,
      type: "link",
    },
    {
      url: "/connect",
      name: "Connect",
      icon: <AtSymbolIcon className="w-full h-full" />,
      type: "link",
    },
    {
      url: "/monetization",
      name: "Monetization",
      icon: <CurrencyDollarIcon className="w-full h-full" />,
      type: "link",
    },
    {
      url: "/follower_requests",
      name: "Follower Requests",
      icon: <UserPlusIcon className="w-full h-full" />,
      type: "link",
    },
    {
      url: "/",
      name: "Creator Studio",
      icon: <UserPlusIcon className="w-full h-full" />,
      type: "",
    },
  ];
  const [referenceElement, setReferenceElement] = useState<any | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-150, -120],
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
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={setReferenceElement}
            className="h-[50px] gap-4 hover:bg-gray-50 hover:dark:bg-neutral-900 flex items-center justify-center xl:px-4 aspect-square xl:aspect-auto rounded-full"
          >
            <div className="w-7 h-7 flex">
              <EllipsisHorizontalCircleIcon className="w-full h-full" />
            </div>
            <span className="hidden xl:block text-xl">More</span>
          </Menu.Button>
          {typeof window === "object"
            ? open &&
              createPortal(
                <>
                  <div className="fixed inset-0" />
                  <Menu.Items
                    static
                    style={styles.popper}
                    {...attributes.popper}
                    ref={setPopperElement}
                    className="relative z-20 outline-none w-[300px]"
                  >
                    <div className="absolute inset-0 -z-10 bg-slate-300 blur dark:bg-neutral-600" />
                    <div className="space-y-2 dark:bg-black bg-white overflow-hidden rounded-lg">
                      {dataOne.map((data, i) =>
                        data.type === "link" ? (
                          // <Menu.Item
                          //   key={i}
                          //   as="ul"
                          //   className="text-lg font-semibold"
                          // >
                          //   {({ active }) => (
                          //     <li>
                          //       <Link
                          //         className={`flex h-[55px] px-4 py-3 items-center gap-4 ${
                          //           active
                          //             ? "bg-neutral-900 text-white"
                          //             : " dark:text-white text-black"
                          //         }`}
                          //         href={data.url}
                          //         key={data.name}
                          //       >
                          //         <div className="w-7 h-7">{data.icon}</div>
                          //         <span>{data.name}</span>
                          //       </Link>
                          //     </li>
                          //   )}
                          // </Menu.Item>
                          <Menu.Item
                            className="text-lg font-semibold"
                            key={i}
                            as="ul"
                          >
                            {({ active, close }) => <li>{data.name}</li>}
                          </Menu.Item>
                        ) : (
                          <Menu.Item
                            className="text-lg font-semibold"
                            key={i}
                            as="ul"
                          >
                            {({ active, close }) => (
                              <li>
                                <Disclosure as="div">
                                  <Disclosure.Button className="py-2">
                                    Is team pricing available?
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="text-gray-500">
                                    Yes! You can purchase a license that you can
                                    share with your entire team.
                                  </Disclosure.Panel>
                                </Disclosure>
                              </li>
                            )}
                          </Menu.Item>
                        )
                      )}
                    </div>
                  </Menu.Items>
                </>,
                document.body
              )
            : null}
        </>
      )}
    </Menu>
  );
};

export default MoreDropDown;
