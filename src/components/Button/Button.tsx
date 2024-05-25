"use client";

import React from "react";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";

type Props = {
  children: string;
  inverted?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  inverted,
  onClick,
  disabled,
  secondary,
  className = "",
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

  return (
    <TracyShadow color={"#643525"} elevation={1}>
      <motion.button
        disabled={disabled}
        onClick={onClick}
        className={`${styling} ${disabled ? "cursor-default" : "cursor-pointer"} overflow-hidden rounded-full outline-accent ${className}`}
        whileTap={{
          scale: disabled ? 1 : 0.98,
        }}
      >
        <motion.div
          className={`font-serif-base pointer-events-none flex h-16 items-center justify-center rounded-full px-8 text-center`}
          animate={{
            opacity: disabled ? 0.2 : 1,
          }}
        >
          {children}
        </motion.div>
      </motion.button>
    </TracyShadow>
  );
};

export default Button;
