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
    rotateX: -50,
    rotateY: 0,
    rotateZ: 20,
    scale: 0.8,
    opacity: 0,
    y: 20,
  },
  visible: {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    opacity: [0, 1, 1],
    y: 0,

    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.5,
    },
  },
};
const LinkButton = ({ inverted, href, children, disabled }: Props) => {
  return (
    // <TracyShadow variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    // color={"#643525"} elevation={1}>
    <motion.div
      className={`overflow-hidden rounded-full outline-accent ${
        inverted ? "bg-dark" : "bg-light"
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
          className={`pointer-events-none h-16 ${
            inverted ? "bg-light text-dark" : "bg-dark text-light"
          } font-serif-base flex min-w-64 items-center justify-center rounded-full text-center`}
          animate={{
            opacity: disabled ? 0.2 : 1,
          }}
        >
          {children}
        </motion.div>
      </Link>
    </motion.div>
    // </TracyShadow >
  );
};

export default LinkButton;
