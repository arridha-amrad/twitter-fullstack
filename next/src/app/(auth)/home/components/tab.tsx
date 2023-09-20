"use client";

import { Tab } from "@headlessui/react";

const tabs = [
  { name: "For You", content: <div>For You Tweets</div> },
  { name: "Followings", content: <div>For You Tweets</div> },
];

export default function HomeTab() {
  return (
    <Tab.Group>
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
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export const className = {
  tabList:
    "flex w-full h-14 bg-opacity-50 hover:backdrop-blur border-b border-skin-base",
  tab: "flex-1 hover:bg-skin-hover outline-none",
};

// tabs.map(({ name }, index) => (
//   <Tab className={className.tab} key={name}>
//     <span
//       className={`relative font-semibold ${
//         index === i ? "" : "text-gray-400"
//       }`}
//     >
//       {name}
//       {i === index && (
//         <span className="absolute -bottom-5 left-0 right-0 h-1 rounded-full bg-blue-500" />
//       )}
//     </span>
//   </Tab>
// ))
