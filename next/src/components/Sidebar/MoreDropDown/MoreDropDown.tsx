'use client';

import { Disclosure, Menu } from '@headlessui/react';
import EllipsisHorizontalCircleIcon from '@heroicons/react/24/outline/EllipsisHorizontalCircleIcon';
import Link from 'next/link';
import { createRef, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import LinkGroupOne from './LinkGroupOne';
import { LinkGroupTwo } from './LinkGroupTwo';

const MoreDropDown = () => {
  const [referenceElement, setReferenceElement] = useState<any | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-180, -0],
        },
      },
      {
        name: 'flip',
      },
    ],
  });

  const refs = useMemo(() => {
    return (
      LinkGroupTwo.map(() => {
        return createRef<HTMLButtonElement>();
      }) ?? []
    );
    // eslint-disable-next-line
  }, [LinkGroupTwo]);

  function handleClosingOthers(name: string) {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute('data-id') !== name;
    });
    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute('data-open') === 'true';
      if (isOpen) {
        ref.current?.click();
      }
    });
  }

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            ref={setReferenceElement}
            className="flex aspect-square h-[50px] items-center justify-center gap-4 rounded-full hover:bg-skin-hover xl:aspect-auto xl:px-4"
          >
            <div className="flex h-7 w-7">
              <EllipsisHorizontalCircleIcon className="h-full w-full" />
            </div>
            <span className="hidden text-xl xl:block">More</span>
          </Menu.Button>
          {typeof window === 'object'
            ? open &&
              createPortal(
                <>
                  <div className="fixed inset-0" />
                  <Menu.Items
                    static
                    style={styles.popper}
                    {...attributes.popper}
                    ref={setPopperElement}
                    className="relative z-20 w-[300px] outline-none"
                  >
                    <div className="absolute  inset-0 -z-10 bg-skin-shadow blur" />
                    <div className="overflow-hidden rounded-lg border-skin-base bg-skin-base">
                      {LinkGroupOne.map((data, i) => (
                        <Menu.Item key={i}>
                          {({ active }) => (
                            <Link
                              className={`flex h-[55px] items-center gap-4 px-4 py-3 text-lg font-semibold text-skin-base ${
                                active ? 'bg-skin-hover' : ''
                              }`}
                              href={data.url}
                              key={data.name}
                            >
                              <div className="h-7 w-7">{data.icon}</div>
                              <span>{data.name}</span>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                      <hr className="mx-auto my-1 w-[90%] border-skin-base" />
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
                                    ref={refs[i]}
                                    data-id={data.name}
                                    data-open={open}
                                    onClick={() =>
                                      handleClosingOthers(data.name)
                                    }
                                    className={`inline-flex h-[50px] w-full items-center justify-between px-4 py-2 ${
                                      active ? 'bg-skin-hover' : ''
                                    }`}
                                  >
                                    <span className="font-semibold">
                                      {data.name}
                                    </span>
                                    <ChevronDownIcon
                                      className={`h-5 w-5 stroke-[2px] transition-transform duration-200 ease-in ${
                                        open ? 'rotate-180 text-skin-fill' : ''
                                      }`}
                                    />
                                  </Disclosure.Button>
                                  {data.links.map((link) => (
                                    <Disclosure.Panel
                                      key={link.name}
                                      className="cursor-pointer space-x-2 px-4 hover:bg-skin-hover"
                                    >
                                      <Link
                                        onClick={close}
                                        className="flex h-[50px] items-center gap-2"
                                        href={link.url}
                                        scroll={false}
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
                document.body,
              )
            : null}
        </>
      )}
    </Menu>
  );
};

export default MoreDropDown;
