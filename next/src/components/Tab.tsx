'use client';

import { Tab } from '@headlessui/react';
import { usePathname, useRouter } from 'next/navigation';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface ITab {
  name: string;
  url: string;
}

type Props = {
  tabs: ITab[];
} & HTMLAttributes<HTMLDivElement>;

const HorizontalTab = ({ tabs, ...props }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const [tabIndex, setTabIndex] = useState(0);

  const saveTab = (index: number) => {
    setTabIndex(index);
    router.push(tabs[index].url);
  };

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.url === pathName);
    if(index >= 0) {
      setTabIndex(index);
    }
  }, [pathName]);

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
