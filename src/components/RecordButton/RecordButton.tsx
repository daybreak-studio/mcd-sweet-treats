"use client";

import React from "react";
import RecordStartSVG from "./RecordButtonGraphic.svg";
import RecordStopSVG from "./RecordButtonStopGraphic.svg";
import { motion } from "framer-motion";
import { ProgressRing } from "./ProgressRing";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  maxDuration: number;
  currentTime: number;
  isRecording: boolean;
  onClick: () => void;
};

const ROT_OFFSET_DEGREE = 90;

const RecordButton = ({
  maxDuration,
  currentTime,
  isRecording,
  onClick,
}: Props) => {
  return (
    <motion.button
      className="relative"
      onClick={onClick}
      whileTap={{
        scale: 0.97,
      }}
    >
      <motion.div>
        <ProgressRing
          radius={44}
          progress={(currentTime / maxDuration) * 100}
          strokeColor="#f9d0d6"
          counterClockwise
        />
      </motion.div>
      <motion.div
        animate={{
          rotate: isRecording ? ROT_OFFSET_DEGREE : 0,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
        className="absolute inset-0 m-auto h-fit w-fit rounded-full"
      >
        <motion.div
          animate={{
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING,
            },
          }}
        >
          <RecordStartSVG />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isRecording ? 1 : 0,
            scale: isRecording ? 1 : 0.6,
            transition: {
              delay: 0.1,
              duration: 0.1,
            },
          }}
          style={{
            rotate: -ROT_OFFSET_DEGREE,
          }}
          className="absolute inset-0"
        >
          <RecordStopSVG />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default RecordButton;
