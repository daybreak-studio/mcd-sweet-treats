import { MotionValue, useMotionValueEvent } from "framer-motion";
import React, { MutableRefObject, useEffect, useState } from "react";

type Props = {
  currentTime: MotionValue<number>;
};
export function formatTime(seconds: number): string {
  // Calculate components
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const milliseconds = Math.floor((seconds * 1000) % 1000);

  // Pad with zeros
  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");
  const millisecondsStr = String(milliseconds).padStart(3, "0");

  // Format and return
  return `${minutesStr}:${secondsStr}`;
}

const Timestamp = ({ currentTime }: Props) => {
  const [timeString, setTimeString] = useState("");

  useMotionValueEvent(
    currentTime,
    "change",
    (latest) => latest > 0 && setTimeString(formatTime(latest)),
  );

  return <>{timeString}</>;
};

export default Timestamp;
