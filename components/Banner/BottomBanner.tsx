import { motion } from "framer-motion";

const BottomBanner = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        className="font-sans-xs mx-auto mb-0 mt-auto pt-6 text-center opacity-50"
        transition={{ delay: 1.5 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default BottomBanner;
