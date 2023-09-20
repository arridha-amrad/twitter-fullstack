"use client";

import { Tab } from "@headlessui/react";
import { ReactNode } from "react";

const tabs = [
  { name: "For You", content: <div>For You Tweets</div> },
  { name: "Followings", content: <div>For You Tweets</div> },
];

export default function HomeTab({ children }: { children: ReactNode }) {
  return (
    <Tab.Group
      manual
      onChange={() => {
        console.log("tab changed");
      }}
    >
      <Tab.List className={className.tabList}>
        {tabs.map(({ name }) => (
          <Tab className={className.tab} key={name}>
            {({ selected }) => (
              <span
                className={`relative font-semibold ${
                  selected ? "text-skin-base" : "text-skin-accent"
                }`}
              >
                {name}
                {selected && (
                  <span className="absolute -bottom-5 left-0 right-0 h-1 rounded-full bg-skin-fill" />
                )}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
      {children}
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export const className = {
  tabList:
    "flex w-full h-14 sticky top-14 z-10 backdrop-blur border-b border-skin-base",
  tab: "flex-1 hover:bg-skin-hover/50 outline-none",
};
