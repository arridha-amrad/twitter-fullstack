import { MotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { HTMLAttributes, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  containerHeight: number;
  number: number;
} & HTMLAttributes<HTMLSpanElement>;

const AnimatedNumber = ({ number, containerHeight, ...props }: Props) => {
  const [arrLikes, setArrLikes] = useState<number[]>([]);
  const animatedValue = useSpring(number, { damping: 20, stiffness: 100 });

  useEffect(() => {
    animatedValue.set(number);
    setArrLikes([number - 1, number, number + 1]);
  }, [animatedValue, number]);

  return (
    <>
      {arrLikes.map((val) => (
        <Number
          {...props}
          key={val}
          number={val}
          containerHeight={containerHeight}
          mv={animatedValue}
        />
      ))}
    </>
  );
};

const Number = ({
  number,
  mv,
  containerHeight,
  ...props
}: {
  containerHeight: number;
  number: number;
  mv: MotionValue;
} & HTMLAttributes<HTMLSpanElement>) => {
  const y = useTransform(mv, (latest) => {
    return containerHeight * (number - latest);
  });
  return (
    <motion.span
      style={{ y }}
      transition={{ delay: 0.5 }}
      className={twMerge(
        'absolute inset-x-0 top-[2px] flex justify-start text-sm',
        props.className
      )}
    >
      {number}
    </motion.span>
  );
};

export default AnimatedNumber;
