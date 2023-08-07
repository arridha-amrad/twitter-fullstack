import IconLeft from '@heroicons/react/24/outline/ArrowLeftIcon';
import IconRight from '@heroicons/react/24/outline/ArrowRightIcon';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { FC, Fragment, useState } from 'react';
import useMeasure from 'react-use-measure';

const TweetCardCarousel: FC<{ files: PostFile[] }> = ({ files }) => {
  const [index, setIndex] = useState(0);
  const [tuple, setTuple] = useState([null, index]);
  if (tuple[1] !== index) {
    setTuple([tuple[1], index]);
  }

  const prev = tuple[0] ?? 0;
  const direction = prev > index ? -1 : 1;

  const [ref, { width }] = useMeasure();

  const goPrev = () => {
    setIndex((val) => {
      if (val === 0) return files.length - 1;
      return val - 1;
    });
  };

  const goNext = () => {
    setIndex((val) => {
      if (val === files.length - 1) return 0;
      return val + 1;
    });
  };

  if (files.length === 0) return null;

  return (
    <div
      ref={ref}
      onClick={(e) => e.stopPropagation()}
      className="group relative my-2 h-[400px] overflow-hidden rounded-lg border bg-white dark:border-gray-700 dark:bg-black"
    >
      <AnimatePresence custom={{ direction, width }} initial={false}>
        <motion.img
          key={files[index].url}
          custom={{ direction, width }}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="quit"
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100
          }}
          className="absolute h-full w-full object-cover object-center"
          src={files[index].url}
          alt="image"
        />
      </AnimatePresence>

      {files.length > 1 && (
        <Fragment>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 opacity-0 backdrop-blur transition-opacity duration-200 ease-in group-hover:opacity-100"
          >
            <IconLeft className="h-5 w-5 text-white" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 opacity-0 backdrop-blur transition-opacity duration-200 ease-in group-hover:opacity-100"
          >
            <IconRight className="h-5 w-5 text-white" />
          </button>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 ">
            <ul className="flex items-center gap-1 rounded-lg bg-white/50 px-3 py-1 backdrop-blur  dark:bg-black/30">
              {files.map((val, i) => (
                <li
                  onClick={() => setIndex(i)}
                  key={val.url}
                  className={`cursor-pointer rounded-full text-sm lg:text-lg ${
                    index === i
                      ? 'h-3 w-3 bg-black dark:bg-white'
                      : 'h-2 w-2 bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </ul>
          </div>
        </Fragment>
      )}
    </div>
  );
};

const variants: Variants = {
  hidden: ({ direction, width }: { direction: number; width: number }) => ({
    opacity: 0,
    x: direction * width
  }),
  visible: {
    opacity: 1,
    x: 0
  },
  quit: ({ direction, width }) => ({
    x: direction * -width,
    opacity: 0
  })
};

export default TweetCardCarousel;
