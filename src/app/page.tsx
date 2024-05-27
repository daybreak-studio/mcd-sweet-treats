"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useRef, useState, useEffect } from "react";
import { easeIn, easeOut, motion } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";
import Image from "next/image";
import { image } from "@tensorflow/tfjs-core";
import { easing } from "@/components/AnimationConfig";
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
    hidden: { opacity: 0, y: 40, rotate: 3, },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", bounce: .3, duration: 0.5 } },
  };
  const videoVariants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0, scale: 0.8, rotate: 3,
      y: 64,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1, scale: 1, rotate: 0, y: [64, 32, 0], transition: { type: "spring", bounce: .3, duration: 0.65 }
    },
  };
  const imageTransition = {
    ease: easing.EASE_OUT_QUINT,
    duration: 1,

  };

  return (
    <AppFrame caption={"Select Languages Available"}>
      <LogoLockup />
      <motion.section className="fixed z-[51] hidden lg:block" >
        <motion.figure className="origin-bottom-left fixed z-[52] "
          initial={{
            rotate: -240,
            x: "-120%"
          }}
          animate={{
            rotate: -8,
            x: "12%",
            y: "18vh",
          }}
          transition={imageTransition}
        >
          <Image
            width={300} height={200} className="h-auto max-w-[30vw] object-contain shadow-md shadow-[rgba(34, 5, 5, 0.50)]"
            src="/images/landing-1.jpg" alt="image of child with their grandparent"
          />
        </motion.figure>

        <motion.figure className="origin-top-right fixed bottom-0 right-0"
          transition={imageTransition}
          initial={{
            rotate: -230,
            x: "120%",
            y: "15vh"
          }}
          animate={{
            rotate: 10,
            x: "5%",
            y: "-10vh",
          }}
        >
          <Image
            width={320} height={200} className="object-contain shadow-md shadow-[rgba(34, 5, 5, 0.50)]"
            src="/images/landing-2.jpg" alt="image of child with their grandparent"
          />
        </motion.figure>

        <motion.figure className="origin-top-right fixed -left-12"
          transition={imageTransition}
          initial={{
            rotate: -100,
            x: "-215%",
            y: "100vh",
          }}
          animate={{
            rotate: 12,
            x: "6%",
            y: "40vh",
          }}
        >
          <Image
            width={350} height={200} className="object-contain shadow-md shadow-[rgba(34, 5, 5, 0.50)]"
            src="/images/landing-3.jpg" alt="image of child with their grandparent"
          />
        </motion.figure>

      </motion.section>


      <motion.div
        className="my-8 flex flex-col items-center"
        initial="hidden"
        animate={videoLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          className="font-serif-lg mb-4 px-8 text-center origin-top-left"
          variants={AnimWrap.bounceUpB}
        >
          Send grandma a sweet message
        </motion.h1>
        <motion.div
          className="relative z-10 flex w-full flex-col items-center origin-top-left"
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
