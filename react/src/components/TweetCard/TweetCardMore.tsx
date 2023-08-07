import { Menu } from '@headlessui/react';
import MenuIcon from '@heroicons/react/24/solid/EllipsisHorizontalIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import DeleteTweetFeature from '../../features/DeleteTweetFeature';
import ButtonIcon from '../ButtonIcon';

type Props = {
  tweet: Tweet;
};

export default function TweetCardMore({ tweet }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'left',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [-20, -35]
        }
      }
    ]
  });
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="h-8" ref={setReferenceElement} as="div">
              <ButtonIcon
                tooltip="More"
                className="group hover:bg-slate-200 hover:dark:bg-slate-800"
                icon={
                  <MenuIcon className="w-5 fill-slate-500 group-hover:fill-blue-500" />
                }
              />
            </Menu.Button>
            {createPortal(
              <AnimatePresence>
                {open && (
                  <>
                    <div className="fixed inset-0" />
                    <Menu.Items
                      static
                      style={styles.popper}
                      {...attributes.popper}
                      ref={setPopperElement}
                      className="relative"
                    >
                      <div className="absolute inset-0 -z-10 bg-slate-300 blur dark:bg-slate-500" />
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{
                          opacity: 0.5,
                          height: 0,
                          transition: { delay: 0.1 }
                        }}
                        className="overflow-hidden rounded-lg border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-black"
                      >
                        <Menu.Item className="w-max p-1" as="div">
                          {({ active }) => (
                            <button
                              onClick={() => setOpenModal(true)}
                              className={`${
                                active ? 'bg-red-500 text-white' : ''
                              } rounded px-3 py-1 text-sm`}
                            >
                              <TrashIcon className="mb-[2px] mr-2 inline h-4 w-4 dark:fill-slate-200" />
                              Delete tweet
                            </button>
                          )}
                        </Menu.Item>
                      </motion.div>
                    </Menu.Items>
                  </>
                )}
              </AnimatePresence>,
              document.body
            )}
          </>
        )}
      </Menu>
      <DeleteTweetFeature
        tweet={tweet}
        isOpen={openModal}
        setIsOpenModal={setOpenModal}
      />
    </div>
  );
}
