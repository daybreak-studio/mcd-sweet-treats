import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import React, { useEffect } from "react";
import Timestamp, { formatTime } from "./Timestamp";

type Props = {
  duration: number;
  currentTime: MotionValue;
  isActive: boolean;
};

const ProgressBar = ({ currentTime, duration, isActive }: Props) => {
  const barWdith = useTransform(currentTime, [0, duration], [0, 100]);
  const barWidthPercent = useMotionTemplate`${barWdith}%`;

  return (
    <motion.div
      className="z-30 w-full"
      animate={{
        scale: isActive ? 1.1 : 1,
      }}
    >
      <div className="font-sans-xs flex flex-row justify-between text-light">
        <motion.div
          animate={{
            scale: isActive ? 0.9 : 1,
          }}
        >
          <Timestamp currentTime={currentTime} />
        </motion.div>
        <motion.div
          animate={{
            scale: isActive ? 0.9 : 1,
          }}
        >
          {formatTime(duration)}
        </motion.div>
      </div>
      <motion.div className="relative h-1 rounded-full bg-light bg-opacity-30">
        <motion.div
          style={{
            width: barWidthPercent,
            // transition: "width .1s linear",
          }}
          className="h-full rounded-full bg-light"
        />
      </motion.div>
    </motion.div>
  );
};

export default ProgressBar;
