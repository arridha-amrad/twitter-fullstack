import { FC, ReactNode, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, Variants, motion } from 'framer-motion';

type Props = {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
};

const MyDialog: FC<Props> = ({
  children,
  description,
  isOpen,
  setIsOpen,
  title
}) => {
  const [winWidth, setWinWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWinWidth(window.innerWidth);
    });
    window.removeEventListener('resize', () => {
      setWinWidth(window.innerWidth);
    });
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen && setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.2 } }}
              className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur"
              aria-hidden="true"
            />
            <motion.div
              custom={winWidth}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed z-30 inset-0 overflow-y-auto"
              onClick={(e) => {
                e.stopPropagation();
                console.log(e);
              }}
            >
              <div className="relative flex items-end justify-center max-w-2xl min-h-full mx-auto sm:items-center sm:p-4">
                <Dialog.Panel className="px-6 py-4 rounded dark:bg-slate-800 bg-slate-200">
                  {title && (
                    <Dialog.Title className="text-2xl font-bold">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="my-5 leading-4">
                      {description}
                    </Dialog.Description>
                  )}
                  {children}
                </Dialog.Panel>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

const variants: Variants = {
  hidden: (width) => ({
    scale: width >= 640 ? 0.8 : undefined,
    translateY: width >= 640 ? undefined : '50%',
    opacity: 0
  }),
  visible: {
    scale: 1,
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 40,
      stiffness: 500
    }
  },
  exit: (width) => ({
    opacity: 0,
    scale: width >= 640 ? 0.8 : undefined,
    translateY: width >= 640 ? 0 : '50%',
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  })
};

export default MyDialog;
