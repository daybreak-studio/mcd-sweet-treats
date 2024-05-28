"use client";

import AppFrame from "../components/AppFrame/AppFrame";
import LinkButton from "../components/Button/LinkButton";
import { LogoLockup } from "../components/LogoLockup/LogoLockup";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimWrap } from "../components/AnimWrap";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video !== null) {
      setVideoLoaded(true);
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.4,
        delayChildren: 1,
        // delay: 1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, rotate: 3 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", bounce: 0.3, duration: 0.5 },
    },
  };
  const videoVariants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      scale: 0.8,
      rotate: 3,
      y: 64,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: [64, 32, 0],
      transition: { type: "spring", bounce: 0.3, duration: 0.65 },
    },
  };

  return (
    <AppFrame caption={"Select Languages Available"}>
      <LogoLockup />
      <motion.div
        className="my-8 flex flex-col items-center"
        initial="hidden"
        animate={videoLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          className="font-serif-lg mb-4 origin-top-left px-8 text-center"
          variants={AnimWrap.bounceUpB}
        >
          Send grandma a sweet message
        </motion.h1>
        <motion.div
          className="relative z-10 flex w-full origin-top-left flex-col items-center"
          variants={videoVariants}
        >
          <video
            ref={videoRef}
            className="mb-8 w-10/12 rounded-lg md:w-8/12 xl:w-1/4"
            src="https://stream.mux.com/pbozK8F7GIzEwN7kmGRKEap501jQAOifwpXBjStku01eE/capped-1080p.mp4"
          />
        </motion.div>
        <motion.div variants={childVariants}>
          <LinkButton href={"/get-started"}>Continue</LinkButton>
        </motion.div>
      </motion.div>
    </AppFrame>
  );
}
