import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useRef, useState, useEffect } from "react";
import { Variants, motion } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import BottomBanner from "@/components/Banner/BottomBanner";

const containerVariants: Variants = {
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

const childVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 3 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.5 },
  },
};
const videoVariants: Variants = {
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

export default function Home() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <AppFrame>
      <LogoLockup />
      <motion.div
        className="mt-auto flex flex-col items-center"
        initial="hidden"
        animate={videoReady ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          className="font-serif-lg mb-4 max-w-[16ch] origin-top-left px-8 text-center"
          variants={AnimWrap.bounceUpB}
        >
          Send grandma a sweet message
        </motion.h1>
        <motion.div
          className="z-10 flex origin-top-left flex-col items-center"
          variants={videoVariants}
        >
          <VideoPlayer
            onReady={() => setVideoReady(true)}
            src={
              "https://stream.mux.com/pbozK8F7GIzEwN7kmGRKEap501jQAOifwpXBjStku01eE/capped-1080p.mp4"
            }
            className="mb-8 h-[40svh] min-h-64"
          />
          {/* <video
            ref={videoRef}
            className="mb-8 w-10/12 rounded-lg md:w-8/12 xl:w-1/4"
            src="https://stream.mux.com/pbozK8F7GIzEwN7kmGRKEap501jQAOifwpXBjStku01eE/capped-1080p.mp4"
          /> */}
        </motion.div>
        <motion.div variants={childVariants}>
          <LinkButton href={"/get-started"}>Continue</LinkButton>
        </motion.div>
      </motion.div>
      <BottomBanner>{"Select language available"}</BottomBanner>
    </AppFrame>
  );
}
