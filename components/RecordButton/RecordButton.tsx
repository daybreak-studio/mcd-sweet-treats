"use client";

import React, { useEffect } from "react";
import RecordStartSVG from "./RecordButtonGraphic.svg";
import RecordStopSVG from "./RecordButtonStopGraphic.svg";
import { motion, useAnimation } from "framer-motion";
import { ProgressRing } from "./ProgressRing";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  maxDuration: number;
  currentTime: number;
  isRecording: boolean;
  isLoading: boolean;
  isHoldMode: boolean;
  onClick: () => void;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
};

const ROT_OFFSET_DEGREE = 90;

const RecordButton = ({
  maxDuration,
  currentTime,
  isRecording,
  isLoading,
  onClick,
  onPointerDown,
  onPointerUp,
  isHoldMode,
}: Props) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading) {
      controls.set({
        scale: 0.8,
        y: 30,
      });
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        },
      });
    } else {
      controls.stop();
      controls.start({
        rotate: 360,
        scale: 1,
        y: 0,
        transition: {
          ease: AnimationConfig.EASING,
          duration: AnimationConfig.SLOW,
        },
      });
    }
  }, [isLoading, controls]);

  return (
    <motion.button
      className={`relative ${isLoading ? "cursor-default" : "cursor-pointer"}`}
      onClick={() => {
        if (!isLoading) onClick();
      }}
      onPointerDown={() => {
        if (!isLoading) onPointerDown?.();
      }}
      onPointerUp={() => {
        if (!isLoading) onPointerUp?.();
      }}
      animate={controls}
      whileTap={{
        scale: !isLoading ? 0.97 : 1,
      }}
    >
      <motion.div
        animate={{
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 0.9 : isHoldMode ? 1.05 : 1,
          transition: {
            druation: isHoldMode
              ? AnimationConfig.VERY_SLOW
              : AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        <ProgressRing
          radius={44}
          progress={(currentTime / maxDuration) * 100}
          strokeColor="#f9d0d6"
          counterClockwise
        />
      </motion.div>
      <motion.div
        animate={{
          scale: isHoldMode ? 0.3 : 1,
          borderRadius: isHoldMode ? 16 : 999,
          rotate: isRecording ? ROT_OFFSET_DEGREE : 0,
          transition: {
            duration: isHoldMode
              ? AnimationConfig.VERY_SLOW
              : AnimationConfig.SLOW,
            ease: isHoldMode
              ? AnimationConfig.EASING
              : AnimationConfig.EASING_IN_OUT,
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
          className="absolute inset-0 rounded-full bg-light"
        >
          <motion.div
            animate={{
              opacity: isHoldMode ? [0, 0] : [0, 1],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5,
              },
            }}
          >
            <RecordStopSVG />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default RecordButton;
