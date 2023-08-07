import { ReactNode, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import Carousel from './Carousel';

const variants: Variants = {
  hidden: (width) => ({
    scale: width >= 640 ? 0.8 : undefined,
    translateY: width >= 640 ? undefined : '50%',
    opacity: 0.4
  }),
  visible: {
    scale: 1,
    translateY: 0,
    opacity: 1
  },
  exit: (width) => ({
    opacity: 0.4,
    scale: width >= 640 ? 0.8 : undefined,
    translateY: width >= 640 ? 0 : '50%',
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  })
};

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  children: ReactNode;
};

const ModalCarousel = ({ setIsOpen, images, isOpen, children }: Props) => {
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
      {children}
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            className="z-[99999999999] relative"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur"
              aria-hidden="true"
            />

            <motion.div
              custom={winWidth}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center overflow-y-auto"
            >
              <Dialog.Panel className="px-6 py-4">
                <Carousel images={images} />
              </Dialog.Panel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalCarousel;
