import {
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import React from "react";

type Props = {
  duration: number;
  currentTime: MotionValue;
};

const PorgressBar = ({ currentTime, duration }: Props) => {
  const barWdith = useTransform(currentTime, [0, duration], [0, 100]);
  const barWidthPercent = useMotionTemplate`${barWdith}%`;

  return (
    <div className="relative h-1 w-full max-w-32 rounded-full bg-light bg-opacity-30">
      <motion.div
        style={{
          width: barWidthPercent,
          // transition: "width .1s linear",
        }}
        className="h-full rounded-full bg-light"
      />
    </div>
  );
};

export default PorgressBar;
