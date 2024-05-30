import dynamic from "next/dynamic";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useRef, useState, useEffect, MutableRefObject } from "react";
import { Variants, motion, useIsPresent } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import BottomBanner from "@/components/Banner/BottomBanner";

import swirlAnimation from "@/public/mcdonald-sprite-3.json";
import { LottieRefCurrentProps } from "lottie-react";
import ExamplePromptTagSVG from "@/components/ExamplePromptTag/ExamplePrompTagSVG.svg";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
      delayChildren: 0.1,
      // delay: 1,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.5,
      // staggerChildren: 0.1,
      // delayChildren: 0.2,
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
  exit: {
    opacity: 0,
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
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    transition: {
      delay: 0.35,
    },
  },
};

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const lottieRef = useRef() as MutableRefObject<LottieRefCurrentProps | null>;

  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;
    if (!videoReady) return;

    setTimeout(() => {
      lottie.play();
    }, 1000);
  }, [videoReady, lottieRef]);

  const isPresent = useIsPresent();
  if (!isPresent && lottieRef.current) {
    lottieRef.current.setDirection(-1);
    lottieRef.current.setSpeed(4);
    lottieRef.current.play();
  }

  return (
    <>
      <>
        <LogoLockup />
        <motion.div
          className="mt-auto flex flex-col items-center"
          initial="hidden"
          animate={videoReady ? "visible" : "hidden"}
          exit="exit"
          variants={containerVariants}
        >
          <motion.h1
            className="font-serif-md my-4 origin-top-left px-8 text-center md:font-serif-lg lg:font-serif-2xl"
            variants={AnimWrap.bounceUpB}
          >
            Send grandma a <br /> sweet message
          </motion.h1>
          <motion.div
            className="relative z-10 mb-8 flex origin-top-left flex-col items-center "
            variants={videoVariants}
          >
            <VideoPlayer
              onReady={() => setVideoReady(true)}
              src={
                "https://stream.mux.com/pbozK8F7GIzEwN7kmGRKEap501jQAOifwpXBjStku01eE/capped-1080p.mp4"
              }
              className="h-[40svh] min-h-64"
              poster={"/opening/poster.jpg"}
            />
            <Lottie
              animationData={swirlAnimation}
              loop={false}
              autoPlay={false}
              lottieRef={lottieRef}
              className="pointer-events-none absolute inset-0 translate-y-[-30%] scale-[2.9]"
            />
            <ExamplePromptTagSVG className="absolute hidden sm:bottom-[20%] sm:left-[105%] sm:block" />
          </motion.div>
          <motion.div variants={childVariants}>
            <LinkButton href={"/get-started"}>Continue</LinkButton>
          </motion.div>
        </motion.div>
        <BottomBanner>{"Select languages available"}</BottomBanner>
      </>
    </>
  );
}
