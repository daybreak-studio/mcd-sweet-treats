"use client";

import React from "react";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";

type Props = {
  children: string;
  inverted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ children, inverted, onClick, disabled }: Props) => {
  return (
    <TracyShadow color={"#643525"} elevation={1}>
      <motion.button
        disabled={disabled}
        onClick={onClick}
        className={`rounded-full cursor-pointer overflow-hidden ${
          inverted ? "bg-dark" : "bg-light"
        }`}
        whileTap={{
          scale: 0.98,
        }}
      >
        <motion.div
          className={`h-16 pointer-events-none ${
            inverted ? "bg-light text-dark" : "bg-dark text-light"
          } flex items-center text-center justify-center rounded-full font-serif-base min-w-64`}
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
