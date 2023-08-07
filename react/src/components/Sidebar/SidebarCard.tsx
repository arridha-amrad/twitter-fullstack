import { Popover } from '@headlessui/react';
import LogoutIcon from '@heroicons/react/24/solid/ArrowLeftOnRectangleIcon';
import EllipsisHorizontalIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';
import MoonIcon from '@heroicons/react/24/solid/MoonIcon';
import SunIcon from '@heroicons/react/24/solid/SunIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import useMeasure from 'react-use-measure';
import switchTheme from '../../features/ChangeThemeFeature/switchTheme';
import LogoutFeature from '../../features/LogoutFeature';
import { useMeQuery } from '../../redux/user-slice';
import Spinner from '../Spinner';

export default function SidebarCard() {
  const [ref, { width }] = useMeasure();

  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: width <= 228 ? 'top-start' : 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      },
      {
        name: 'flip'
      },
      {
        name: 'arrow',
        options: {
          element: arrowElement
        }
      }
    ]
  });

  const { data, isLoading } = useMeQuery();

  const [openModal, setOpenModal] = useState(false);

  const menu = [
    {
      label: `Logout @${data?.username}`,
      fn: () => setOpenModal(true)
    },
    {
      label: 'Switch Theme',
      fn: () => switchTheme()
    }
  ];

  return (
    <>
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button as="div" ref={setReferenceElement}>
              <div
                ref={ref}
                className="cursor-pointer overflow-hidden rounded-full outline-none transition-all duration-200 ease-linear hover:bg-slate-200 focus:ring-4 focus:ring-blue-500 hover:dark:bg-slate-900"
              >
                {isLoading ? <Loading /> : <Content data={data} />}
              </div>
            </Popover.Button>
            {createPortal(
              <AnimatePresence initial={false}>
                {open && (
                  <>
                    <Popover.Overlay className="fixed inset-0" />
                    <Popover.Panel
                      static
                      style={styles.popper}
                      {...attributes.popper}
                      ref={setPopperElement}
                      id="tooltip"
                      className="relative z-20"
                    >
                      <div className="absolute inset-0 -z-10 bg-slate-300 blur dark:bg-slate-500" />
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{
                          opacity: 0,
                          height: 0
                        }}
                        className="overflow-y-hidden"
                      >
                        <div
                          style={{
                            minWidth: width < 228 ? 'max-content' : width
                          }}
                          className="p2 overflow-hidden rounded-lg border-slate-300 bg-white dark:border-slate-700 dark:bg-red-500"
                        >
                          {menu.map((item, i) => (
                            <Fragment key={i}>
                              <button
                                className={`flex h-14 min-w-full cursor-pointer items-center justify-start gap-3 bg-white px-5 hover:bg-blue-500 hover:text-white dark:bg-black hover:dark:bg-blue-500 hover:dark:text-white`}
                                onClick={() => {
                                  item.fn();
                                }}
                              >
                                {item.label.includes('Logout') && (
                                  <LogoutIcon className="h-5 w-5" />
                                )}
                                {item.label === 'Switch Theme' && (
                                  <>
                                    <SunIcon className="hidden h-5 w-5 dark:block" />
                                    <MoonIcon className="block h-5 w-5 dark:hidden" />
                                  </>
                                )}
                                <p className="font-semibold">{item.label}</p>
                              </button>
                            </Fragment>
                          ))}
                        </div>
                        <div
                          ref={setArrowElement}
                          className={`absolute -bottom-2 -z-10 h-5 w-5 rotate-45 bg-white shadow-sm shadow-gray-300 dark:bg-black dark:shadow-gray-500 ${
                            width < 228 ? 'left-5' : 'left-1/2 -translate-x-1/2'
                          }`}
                        />
                      </motion.div>
                    </Popover.Panel>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
          </>
        )}
      </Popover>
      <LogoutFeature isModalOpen={openModal} setModalOpen={setOpenModal} />
    </>
  );
}

const Loading = () => (
  <div className="flex items-center justify-center">
    <Spinner className="h-8 w-8" />
  </div>
);

const Content = ({ data }: { data?: User }) => {
  return (
    <div className="flex h-full w-full items-center overflow-hidden p-2">
      <div className="flex flex-1 items-center gap-2">
        <div className="h-11 w-11 overflow-hidden rounded-full">
          <img
            className="h-full w-full object-cover object-center"
            src={
              data?.imageURL === 'default'
                ? `${import.meta.env.VITE_CLIENT_BASE_URL}/default.png`
                : data?.imageURL
            }
            alt=""
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
