"use client";

import { Tab } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const tabs = [
  { name: "For You", param: "for-you" },
  { name: "Followings", param: "followings" },
];

export default function HomeTab() {
  const [tabIndex, setTabIndex] = useState(0);

  const saveTab = (index: number) => {
    setTabIndex(index);
    sessionStorage.setItem("home-tab", tabs[index].param);
    router.push(`?tab=${tabs[index].param}`, { scroll: false });
  };

  const router = useRouter();

  useEffect(() => {
    const savedTab = sessionStorage.getItem("home-tab");
    const index = tabs.findIndex((t) => t.param === savedTab);
    const idx = index >= 0 ? index : 0;
    setTabIndex(idx);
    router.push(`?tab=${tabs[idx].param}`, { scroll: false });
    // eslint-disable-next-line
  }, []);

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={saveTab}>
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
                  <span className={className.indicator} />
                )}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
}

export const className = {
  tabList: "flex w-full flex-1 z-10 border-b border-skin-base",
  tab: "flex-1 hover:bg-skin-hover/50 outline-none",
  indicator: "absolute -bottom-5 left-0 right-0 h-1 rounded-full bg-skin-fill"
};
