"use client";

import React from "react";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  inverted?: boolean;
  disabled?: boolean;
  href: string;
  children: string;
};

const LinkButton = ({ inverted, href, children, disabled }: Props) => {
  return (
    <TracyShadow color={"#643525"} elevation={1}>
      <motion.div
        className={`rounded-full outline-accent overflow-hidden ${
          inverted ? "bg-dark" : "bg-light"
        }`}
        whileTap={{
          scale: !disabled ? 0.98 : 1,
        }}
      >
        <Link
          href={href}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
          style={{
            cursor: disabled ? "default" : "pointer",
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
        </Link>
      </motion.div>
    </TracyShadow>
  );
};

export default LinkButton;
