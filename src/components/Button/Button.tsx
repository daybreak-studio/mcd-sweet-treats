"use client";

import React from "react";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
  inverted?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  noShadow?: boolean;
  isVisible?: boolean;
  submit?: boolean;
};

const Button = ({
  children,
  inverted,
  onClick,
  disabled,
  secondary,
  className = "",
  noShadow,
  isVisible = true,
  submit,
}: Props) => {
  const invertedPrimaryStyles = "bg-light text-dark";
  const invertedSecondaryStyles =
    "bg-dark text-light bg-opacity-20 backdrop-blur-lg";
  const primaryStyles = "bg-dark text-light";
  const secondaryStyles = "bg-light text-dark bg-opacity-20 backdrop-blur-lg";

  const styling = inverted
    ? secondary
      ? invertedSecondaryStyles
      : invertedPrimaryStyles
    : secondary
      ? secondaryStyles
      : primaryStyles;

  const buttonContent = (
    <motion.button
      type={submit ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      className={`${styling} ${disabled ? "cursor-default" : "cursor-pointer"} overflow-hidden rounded-full outline-accent ${className}`}
      whileTap={{
        scale: disabled ? 1 : 0.98,
      }}
      animate={{
        width: isVisible ? "" : 0,
        height: isVisible ? "" : 0,
        transition: {
          duration: AnimationConfig.NORMAL,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      <motion.div
        className={`font-serif-base pointer-events-none flex h-16 items-center justify-center gap-2 rounded-full px-8 text-center`}
        animate={{
          opacity: isVisible ? (disabled ? 0.2 : 1) : 0,

          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );

  return noShadow ? (
    buttonContent
  ) : (
    <TracyShadow color={"#643525"} elevation={1} className={className}>
      {buttonContent}
    </TracyShadow>
  );
};

export default Button;
