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
  className?: string;
  initial?: any;
  animate?: any;
  variants?: any;
};

const TracyShadow = ({
  children,
  color,
  elevation = 1,
  lightSourceOffset,
  className,
  initial,
  animate,
  variants
}: Props) => {
  const yOffset = 100;
  const defaultLightSourceOffset = useMotionValue(0);

  const scaleX = useTransform(
    lightSourceOffset || defaultLightSourceOffset,
    [-100, 0, 100],
    [2 * elevation, 1 * elevation, 2 * elevation],
    { clamp: false },
  );

  return (
    <motion.div

      variants={variants}

      className={`relative ${className}`}>
      <div className="origin-top-left absolute bottom-0 flex h-full w-full items-end">
        <motion.div
          className="z-0 mx-auto h-[50%] w-[70%] blur-lg"
          style={{
            backgroundColor: color,
            x: lightSourceOffset || defaultLightSourceOffset,
            scaleX,
          }}
          animate={{
            opacity: 0.6,
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
    </motion.div>
  );
};

export default TracyShadow;
