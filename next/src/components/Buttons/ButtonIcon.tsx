import { AnimatePresence, motion } from 'framer-motion';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { twMerge } from 'tailwind-merge';

type Props = {
  tooltip: string;
  icon: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

const className =
  'flex aspect-square h-full items-center hover:bg-skin-hover justify-center rounded-full transition-colors duration-200 ease-in';

export default function ButtonIcon({ icon, tooltip, ...props }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 15],
        },
      },
    ],
  });
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        {...props}
        type="button"
        ref={setReferenceElement}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(false)}
        className={twMerge(className, props.className)}
      >
        {icon}
      </button>
      {typeof window === 'object'
        ? createPortal(
            <AnimatePresence initial={false}>
              {show && (
                <div
                  ref={setPopperElement}
                  style={styles.popper}
                  className="z-[999]"
                  {...attributes.popper}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.5 },
                    }}
                    exit={{ opacity: 0 }}
                    className="w-max rounded bg-skin-accent px-2 py-0.5 text-xs font-medium text-skin-base shadow-sm"
                  >
                    {tooltip}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
