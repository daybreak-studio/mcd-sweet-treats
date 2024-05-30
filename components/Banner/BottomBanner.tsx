import { motion } from "framer-motion";
import { OpenInNewTab } from "@/components/OpenInNewTab";

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
        <h1>
          <OpenInNewTab href="https://www.heygen.com/policy">
            Privacy Policy
          </OpenInNewTab>{" "}
          |{" "}
          <OpenInNewTab href="https://www.heygen.com/terms">
            Terms and Conditions
          </OpenInNewTab>
        </h1>
      </motion.div>
    </>
  );
};

export default BottomBanner;
