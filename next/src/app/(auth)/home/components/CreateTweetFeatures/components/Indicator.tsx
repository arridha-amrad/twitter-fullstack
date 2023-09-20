import { AnimatePresence, motion } from "framer-motion";

type Props = {
  size: number;
  text: string;
  progress: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: "round" | "inherit" | "butt" | "square";
  label?: string;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
};

const Indicator = (props: Props) => {
  let { size = 150, progress = 0, text } = props;

  const center = size / 2;
  const trackWidth = progress > 90 ? 2 : 4,
    radius = center - trackWidth,
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);

  const strokeColor =
    progress < 90
      ? "stroke-skin-base"
      : progress >= 100
      ? "stroke-red-500"
      : "stroke-yellow-500";

  const textColor = progress < 100 ? "text-yellow-500" : "text-red-500";

  const trackColor = progress >= 100 ? "stroke-red-500" : "stroke-skin-accent";

  return (
    <AnimatePresence>
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative"
          style={{ width: size, height: size }}
        >
          {progress >= 90 && (
            <span
              className={`absolute ${textColor} top-1/2 text-sm left-1/2 -translate-y-1/2 -translate-x-1/2`}
            >
              {200 - text.length}
            </span>
          )}
          {progress < 105 && (
            <svg className="-rotate-90" style={{ width: size, height: size }}>
              <circle
                cx={center}
                cy={center}
                fill="transparent"
                r={radius}
                strokeWidth={trackWidth}
                className={`transition-all duration-200 ease-in ${trackColor}`}
              />
              <circle
                cx={center}
                cy={center}
                fill="transparent"
                r={radius}
                className={`${strokeColor} transition-all duration-200 ease-in`}
                strokeWidth={trackWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Indicator;
