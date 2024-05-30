import React from "react";
import BottomBanner from "../Banner/BottomBanner";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  inverted?: boolean;
};

const AppFrame = ({ children, inverted }: Props) => {
  const defaultModeStyiles =
    "bg-gradient-to-t from-[#E3959C] from-opacity-50 to-40% to-[#F9D0D6] text-dark";
  const invertedModeStyles = "bg-dark text-light";

  return (
    <main>
      <motion.div
        initial={{
          borderWidth: 0,
          opacity: 0,
        }}
        animate={{
          borderWidth: 16,
          opacity: 1,
        }}
        exit={{
          borderWidth: 0,
          opacity: 0,
        }}
        className="pointer-events-none fixed inset-0 z-50 h-[100dvh] border-[1rem] border-accent xl:border-[1rem]"
      />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className={`relative flex min-h-[100svh] flex-col  overflow-hidden p-8 ${inverted ? invertedModeStyles : defaultModeStyiles}`}
      >
        {children}
      </motion.div>
    </main>
  );
};

export default AppFrame;
