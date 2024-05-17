"use client";

import {
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React from "react";
import { AnimationConfig } from "./AnimationConfig";

type Props = {
  children: React.ReactNode;
  color: string;
  elevation?: number;
  lightSourceOffset?: MotionValue;
};

const TracyShadow = ({
  children,
  color,
  elevation = 0,
  lightSourceOffset,
}: Props) => {
  const yOffset = 100;
  const defaultLightSourceOffset = useMotionValue(0);

  const scaleX = useTransform(
    lightSourceOffset || defaultLightSourceOffset,
    [-100, 0, 100],
    [2 * elevation, 1 * elevation, 2 * elevation],
    { clamp: false }
  );

  return (
    <div className="relative w-fit h-fit">
      <div className="absolute -bottom-6 flex w-full h-full">
        <motion.div
          className="z-0 mx-auto h-[40%] w-[80%] blur-2xl"
          initial={{ opacity: 0 }}
          style={{
            backgroundColor: color,
            x: lightSourceOffset || defaultLightSourceOffset,
            scaleX,
          }}
          animate={{
            opacity: 1,
            y: yOffset * (elevation / 1) - yOffset,
            scale: elevation,
            transition: {
              ease: AnimationConfig.EASING,
              duration: AnimationConfig.SLOW,
            },
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default TracyShadow;
