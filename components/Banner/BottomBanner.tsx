import { motion } from "framer-motion";

const BottomBanner = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        className="font-sans-xs z-40 mx-auto mb-0 mt-auto pt-6 text-center opacity-50"
        transition={{ delay: 1 }}
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default BottomBanner;
