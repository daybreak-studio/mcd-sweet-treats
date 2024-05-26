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

const LinkButtonVariants = {
  hidden: {
    rotateX: -50, rotateY: 0, rotateZ: 20,
    scale: .8, opacity: 0,
    y: 20,

  },
  visible: {
    rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: [0, 1, 1], y: 0,

    transition: {
      type: "spring",
      bounce: .4,
      duration: .5,
    }
  }
}
const LinkButton = ({ inverted, href, children, disabled }: Props) => {
  return (
    <TracyShadow variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      color={"#643525"} elevation={1}>
      <motion.div
        className={`rounded-full outline-accent overflow-hidden ${inverted ? "bg-dark" : "bg-light"
          }`}
        whileTap={{
          scale: !disabled ? 0.98 : 1,
        }}
        variants={LinkButtonVariants}
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
            className={`h-16 pointer-events-none ${inverted ? "bg-light text-dark" : "bg-dark text-light"
              } flex items-center text-center justify-center rounded-full font-serif-base min-w-64`}
            animate={{
              opacity: disabled ? 0.2 : 1,
            }}
          >
            {children}
          </motion.div>
        </Link>
      </motion.div>
    </TracyShadow >
  );
};

export default LinkButton;
