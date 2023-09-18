"use client";

import { Disclosure, Menu } from "@headlessui/react";
import EllipsisHorizontalCircleIcon from "@heroicons/react/24/outline/EllipsisHorizontalCircleIcon";
import SettingsIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import HelpIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import {
  ArrowDownRightIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/solid";
import DisplayMenu from "../DisplayMenu";

import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import LinkGroupOne from "./LinkGroupOne";
import { LinkGroupTwo } from "./LinkGroupTwo";

const MoreDropDown = () => {
  const [referenceElement, setReferenceElement] = useState<any | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-170, -120],
        },
      },
      {
        name: "flip",
      },
    ],
  });
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={setReferenceElement}
            className="h-[50px] gap-4 hover:bg-skin-hover flex items-center justify-center xl:px-4 aspect-square xl:aspect-auto rounded-full"
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
                    <div className="absolute  inset-0 -z-10 blur bg-skin-shadow" />
                    <div className="bg-skin-base overflow-hidden rounded-lg border-skin-base">
                      {LinkGroupOne.map((data, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <Link
                              className={`flex text-lg text-skin-base font-semibold h-[55px] px-4 py-3 items-center gap-4 ${
                                active ? "bg-skin-hover" : ""
                              }`}
                              href={data.url}
                              key={data.name}
                            >
                              <div className="w-7 h-7">{data.icon}</div>
                              <span>{data.name}</span>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      <hr className="w-[90%] mx-auto my-1 border-skin-base" />
                      {LinkGroupTwo.map((data, i) => (
                        <Menu.Item></Menu.Item>
                      ))}
                      {/* <Menu.Item>
                        {({ close, active }) => (
                          <Disclosure
                            as="div"
                            className="text-sm outline-none"
                            onClick={(e) => e.preventDefault()}
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={`py-2 inline-flex h-[50px] w-full px-4 items-center justify-between ${
                                    active ? "bg-skin-hover" : ""
                                  }`}
                                >
                                  <span className="font-semibold">
                                    Creator Studio
                                  </span>
                                  <ChevronDownIcon
                                    className={`w-5 h-5 ${
                                      open ? "rotate-180 text-skin-fill" : ""
                                    }`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  onClick={close}
                                  className="flex h-[50px] hover:bg-skin-hover cursor-pointer items-center px-4 space-x-2"
                                >
                                  <ChartBarSquareIcon className="w-5 h-5" />
                                  <span className="font-semibold">
                                    Analytics
                                  </span>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ close, active }) => (
                          <Disclosure
                            as="div"
                            className="text-sm outline-none"
                            onClick={(e) => e.preventDefault()}
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={`py-2 inline-flex h-[50px] w-full px-4 items-center justify-between ${
                                    active ? "bg-skin-hover" : ""
                                  }`}
                                >
                                  <span className="font-semibold">
                                    Professional Tools
                                  </span>
                                  <ChevronDownIcon
                                    className={`w-5 h-5 ${
                                      open ? "rotate-180 text-skin-fill" : ""
                                    }`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  onClick={close}
                                  className="flex h-[50px] items-center px-4 space-x-2"
                                >
                                  <ArrowDownRightIcon className="w-5 h-5 -rotate-90" />
                                  <span className="font-semibold">Ads</span>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ close, active }) => (
                          <Disclosure
                            as="div"
                            className="text-sm outline-none"
                            onClick={(e) => e.preventDefault()}
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={`py-2 inline-flex h-[50px] w-full cursor-pointer px-4 items-center justify-between ${
                                    active ? "bg-skin-hover" : ""
                                  }`}
                                >
                                  <span className="font-semibold">
                                    Settings and Support
                                  </span>
                                  <ChevronDownIcon
                                    className={`w-5 h-5 ${
                                      open ? "rotate-180 text-skin-fill" : ""
                                    }`}
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel
                                  onClick={close}
                                  className="flex h-[50px] hover:bg-skin-hover cursor-pointer items-center px-4 space-x-2"
                                >
                                  <SettingsIcon className="w-5 h-5" />
                                  <span className="font-semibold">
                                    Settings and Privacy
                                  </span>
                                </Disclosure.Panel>
                                <Disclosure.Panel
                                  onClick={close}
                                  className="flex h-[50px] hover:bg-skin-hover cursor-pointer items-center px-4 space-x-2"
                                >
                                  <HelpIcon className="w-5 h-5" />
                                  <span className="font-semibold">
                                    Help Center
                                  </span>
                                </Disclosure.Panel>
                                <DisplayMenu close={close} />
                                <Disclosure.Panel
                                  onClick={close}
                                  className="flex h-[50px] hover:bg-skin-hover cursor-pointer items-center px-4 space-x-2"
                                >
                                  <UserCircleIcon className="w-5 h-5" />
                                  <span className="font-semibold">
                                    Keyboard Shortcuts
                                  </span>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )}
                      </Menu.Item> */}
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
