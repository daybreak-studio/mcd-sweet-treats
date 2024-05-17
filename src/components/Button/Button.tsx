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
        onClick={onClick}
        className={`h-16 rounded-full font-serif-base min-w-64 ${
          inverted ? "bg-light text-dark" : "bg-dark text-light"
        }`}
        whileTap={{
          scale: 0.98,
        }}
      >
        {children}
      </motion.button>
    </TracyShadow>
  );
};

export default Button;
