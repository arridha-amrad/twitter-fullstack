"use client";

import { Disclosure, Menu } from "@headlessui/react";
import EllipsisHorizontalCircleIcon from "@heroicons/react/24/outline/EllipsisHorizontalCircleIcon";
import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
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
          offset: [-180, -0],
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
                        <Menu.Item key={i}>
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
                                      {data.name}
                                    </span>
                                    <ChevronDownIcon
                                      className={`w-5 h-5 stroke-[2px] transition-transform duration-200 ease-in ${
                                        open ? "rotate-180 text-skin-fill" : ""
                                      }`}
                                    />
                                  </Disclosure.Button>
                                  {data.links.map((link) => (
                                    <Disclosure.Panel
                                      key={link.name}
                                      className="hover:bg-skin-hover cursor-pointer px-4 space-x-2"
                                    >
                                      <Link
                                        onClick={close}
                                        className="flex h-[50px] items-center gap-2"
                                        href={link.url}
                                      >
                                        {link.icon}
                                        <span className="font-semibold">
                                          {link.name}
                                        </span>
                                      </Link>
                                    </Disclosure.Panel>
                                  ))}
                                </>
                              )}
                            </Disclosure>
                          )}
                        </Menu.Item>
                      ))}
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
