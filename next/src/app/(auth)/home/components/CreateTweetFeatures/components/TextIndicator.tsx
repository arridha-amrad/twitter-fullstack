"use client";

import { AnimatePresence, motion } from "framer-motion";

const TextIndicator = ({ height, text }: { height: number; text: string }) => {
  const MAX = 200;
  const isLessThanOrEqualTo20 = 200 - text.length <= 20;
  const isLessThanOrEqualTo0 = 200 - text.length <= 0;
  const isGtOrEqToNeg9 = 200 - text.length >= -9;
  const isGt20 = 200 - text.length > 20;
  const isGt0 = 200 - text.length > 0;
  const coordinate = height / 2;
  const bigRad = height / 3;
  const smallRad = height / 4;

  const circleHeight = isLessThanOrEqualTo20 ? height - 10 : height - 16;

  return (
    <AnimatePresence initial={false}>
      {text.length > 0 && (
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          style={{ width: height, height }}
          className="relative"
        >
          <div className="abolute  inset-0 flex items-center justify-center w-full h-full">
            <div
              className={`rounded-full border-[4px] bg-transparent ${
                isGtOrEqToNeg9 ? "border-gray-500" : "border-transparent"
              } `}
              style={{ height: circleHeight, width: circleHeight }}
            ></div>
          </div>
          {isLessThanOrEqualTo20 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className={` ${
                isLessThanOrEqualTo0
                  ? "text-red-500"
                  : "dark:text-gray-300 text-gray-500"
              } text-sm z-10`}
            >
              {MAX - text.length}
            </motion.div>
          )}

          <svg
            width={height}
            height={height}
            viewBox={`0 0 ${height} ${height}`}
            className={`bg-transparent ${
              isGtOrEqToNeg9 ? "opacity-100" : "opacity-0"
            } transition-opacity duration-200 ease-in absolute inset-0`}
          >
            <motion.circle
              cx={coordinate}
              cy={coordinate}
              r={isLessThanOrEqualTo20 ? bigRad : smallRad}
              className={`${
                isGt20
                  ? "stroke-blue-500"
                  : isGt0
                  ? "stroke-yellow-500"
                  : "stroke-red-500"
              } transition-all duration-200 ease-in stroke-[4px]`}
              custom={text.length}
              variants={draw}
              initial={false}
              animate="visible"
              style={{ rotate: "-90deg" }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (length: number) => {
    return {
      pathLength: length / 200,
      opacity: 1,
    };
  },
};

export default TextIndicator;
