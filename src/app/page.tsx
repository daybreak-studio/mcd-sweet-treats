"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
          className="font-serif-lg mb-4 px-8 text-center"
          variants={childVariants}
        >
          Send grandma a sweet message
        </motion.h1>
        <motion.div
          className="relative z-10 flex w-full flex-col items-center"
          variants={childVariants}
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
