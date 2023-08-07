import { AnimatePresence, motion } from "framer-motion";

const Divider = ({ text }: { text: string }) => {
  return (
    <AnimatePresence>
      {!!text.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-fit h-full flex items-center justify-center"
        >
          <div className="w-0.5 h-5 mx-2 bg-gray-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Divider;
