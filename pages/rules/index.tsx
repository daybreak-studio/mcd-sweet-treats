import { AnimWrap } from "@/components/AnimWrap";
import AppFrame from "@/components/AppFrame/AppFrame";
import BottomBanner from "@/components/Banner/BottomBanner";
import LinkButton from "@/components/Button/LinkButton";
import SwirlGraphicBottom from "@/components/Graphics/SwirlGraphicBottom";
import SwirlGraphicTop from "@/components/Graphics/SwirlGraphicTop";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion, useIsPresent } from "framer-motion";
import { LottieRefCurrentProps } from "lottie-react";
import dynamic from "next/dynamic";
import { MutableRefObject, useEffect, useRef } from "react";

import swirlAnimation from "@/public/Sprite - 3.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function RulesPage() {
  const lottieRef = useRef() as MutableRefObject<LottieRefCurrentProps | null>;

  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    setTimeout(() => {
      lottie.play();
    }, 10);
  }, [lottieRef]);

  const isPresent = useIsPresent();
  if (!isPresent && lottieRef.current) {
    lottieRef.current.setDirection(-1);
    lottieRef.current.setSpeed(4);
    lottieRef.current.play();
  }

  return (
    <>
      <LogoLockup />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={AnimWrap.AnimParentA}
        className="relative my-auto flex flex-col items-center justify-center"
      >
        <div className="relative mt-[20vh] flex w-full flex-grow flex-col items-center justify-center pb-[13vh] text-center">
          <Lottie
            animationData={swirlAnimation}
            loop={false}
            autoPlay={false}
            lottieRef={lottieRef}
            className="md:sc pointer-events-none absolute inset-0 translate-y-[-46%] scale-[3] md:translate-y-[-50%] md:scale-[3.3]"
          />
          {/* <SwirlGraphicTop className="relative left-4 mb-6 block md:hidden" /> */}
          <motion.h1
            variants={AnimWrap.bounceUpA}
            className="font-serif-xl relative z-10 mb-3 w-8/12 text-center md:font-serif-xl xl:font-serif-2xl"
          >
            Be good for <br /> grandma!
          </motion.h1>
          <motion.div
            variants={{
              hidden: { rotate: 10, y: 48, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1 },
            }}
            className="font-serif-sm relative z-10 max-w-[26ch] origin-top-left md:font-serif-base md:mb-16 md:max-w-[34ch]"
          >
            {
              "Like grandma says, if you don't have anything nice to say, don't say anything at all."
            }
          </motion.div>
        </div>
        {/* <SwirlGraphicBottom className="relative -left-16 -top-16 block md:hidden" /> */}

        <LinkButton href={"/language"}>{"I promise"}</LinkButton>
      </motion.div>

      <BottomBanner>
        {
          "McDonald’s reserves the right to not render videos that contain offensive items."
        }
      </BottomBanner>
    </>
  );
}
