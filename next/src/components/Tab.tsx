'use client';

import { Tab } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ITab {
  name: string;
  param: string;
}

type TabType = 'home-tab' | 'profile-tab';

type Props = {
  tabs: ITab[];
  type: TabType;
} & HTMLAttributes<HTMLDivElement>;

const HorizontalTab = ({ tabs, type, ...props }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get('tab');
  const [tabIndex, setTabIndex] = useState(0);

  const saveTab = (index: number) => {
    setTabIndex(index);
    sessionStorage.setItem(type, tabs[index].param);
    router.push(`?tab=${tabs[index].param}`, { scroll: false });
  };

  useEffect(() => {
    if (tab == null) {
      const savedTab = sessionStorage.getItem(type) ?? tabs[0].param;
      const idx = tabs.findIndex((t) => t.param === savedTab);
      setTabIndex(idx);
    } else {
      const idx = tabs.findIndex((t) => t.param === tab);
      setTabIndex(idx);
    }
    // eslint-disable-next-line
  }, [tab]);

  return (
    <Tab.Group selectedIndex={tabIndex} onChange={saveTab}>
      <Tab.List
        as="div"
        className={twMerge(className.tabList, props.className)}
      >
        {tabs.map(({ name }) => (
          <Tab className={className.tab} key={name}>
            {({ selected }) => (
              <span
                className={`relative font-semibold ${
                  selected ? 'text-skin-base' : 'text-skin-accent'
                }`}
              >
                {name}
                {selected && <span className={className.indicator} />}
              </span>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};

export default HorizontalTab;

const className = {
  tabList: 'flex w-full h-14 z-10 border-b border-skin-base',
  tab: 'flex-1 hover:bg-skin-hover/50 outline-none',
  indicator: 'absolute -bottom-5 left-0 right-0 h-1 rounded-full bg-skin-fill',
};
