import { useEffect, useRef, useState } from 'react';
import ArrowSmallLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import ArrowSmallRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

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

const Carousel = ({ images }: { images: string[] }) => {
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
      if (val === 0) return images.length - 1;
      return val - 1;
    });
  };

  const goNext = () => {
    setIndex((val) => {
      if (val === images.length - 1) return 0;
      return val + 1;
    });
  };

  const slide = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goPrev();
      prevRef.current?.focus();
      nextRef.current?.blur();
    }
    if (e.key === 'ArrowRight') {
      goNext();
      prevRef.current?.blur();
      nextRef.current?.focus();
    }
  };

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    document.body.addEventListener('keydown', slide);
    return () => {
      document.body.removeEventListener('keydown', slide);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center sm:aspect-[3/2] aspect-square md:w-[100vh] md:h-auto w-screen h-auto my-5 rounded">
      <div ref={ref} className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={{ direction, width }}>
          <motion.img
            key={index}
            custom={{ direction, width }}
            variants={variants}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 500
            }}
            initial="hidden"
            animate="visible"
            exit="quit"
            className="absolute object-contain w-full h-full"
            src={images[index]}
            alt="japan"
          />
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          ref={prevRef}
          onClick={goPrev}
          className="bg-black outline-none focus:border-blue-500 focus:border-[4px] rounded-full aspect-square h-full flex items-center justify-center"
        >
          <ArrowSmallLeftIcon className="w-5 h-5" />
        </button>
        <div className="flex flex-1">
          {images.map((src, i) => (
            <div
              onClick={() => setIndex(i)}
              key={src}
              className={`w-10 hover:opacity-50 h-10 cursor-pointer ${
                i === index ? 'opacity-100' : 'opacity-20'
              } `}
            >
              <img
                className="object-cover w-full h-full"
                src={src}
                alt="mini"
              />
            </div>
          ))}
        </div>

        <button
          ref={nextRef}
          onClick={goNext}
          className="bg-black outline-none focus:border-blue-500 focus:border-[4px] rounded-full aspect-square h-full flex items-center justify-center"
        >
          <ArrowSmallRightIcon className="w-5 h-5 text-center" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
