import AppFrame from "@/components/AppFrame/AppFrame";
import BottomBanner from "@/components/Banner/BottomBanner";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import ImageCollage from "@/components/ImageCollage/ImageCollage";
import LandingCollageImageLayout from "@/components/ImageCollage/Layouts/LandingCollageImageLayout";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { Variants, motion, useIsPresent } from "framer-motion";
import Image from "next/image";

import swirlAnimation2 from "@/public/Sprite - 2.json";
import { MutableRefObject, useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";
//@ts-ignore
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

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
    opacity: 0,
    transition: {
      duration: 0.5,
      // staggerChildren: 0.1,
      // delayChildren: 0.2,
      delay: 0.5,
    },
  },
};

export default function GetStartedPage() {
  const lottieRef = useRef() as MutableRefObject<LottieRefCurrentProps | null>;

  useEffect(() => {
    const lottie = lottieRef.current;
    if (!lottie) return;

    setTimeout(() => {
      lottie.play();
    }, 0);
  }, [lottieRef]);

  const isPresent = useIsPresent();
  if (!isPresent && lottieRef.current) {
    lottieRef.current.setDirection(-1);
    lottieRef.current.setSpeed(4);
    lottieRef.current.play();
  }

  return (
    <>
      <>
        <LogoLockup noWordmark />
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="mt-auto flex h-full flex-grow flex-col items-center justify-center"
        >
          <h1 className="font-serif-md my-4 text-center sm:font-serif-md xl:font-serif-xl">
            Record your video
            <br /> then treat yourself to a
          </h1>
          <div className="mb-8 flex h-[20vh] max-w-[80%]">
            <GrandmaMcFlurryLogo className="h-full w-auto" />
          </div>
          <div className="relative ">
            <Image
              src="/images/mcflurry.png"
              width={300}
              height={300}
              alt="Grandma McFlurry"
              className="mb-12 h-[24svh] w-auto"
              priority
            />
            <Lottie
              animationData={swirlAnimation2}
              loop={false}
              autoPlay={false}
              lottieRef={lottieRef}
              className="pointer-events-none absolute inset-0 translate-y-[-60%] scale-[3.3]"
            />
          </div>
          <LinkButton href={"/rules"}>{"Let's Go"}</LinkButton>
        </motion.div>
        <BottomBanner>
          Grandma McFlurry available at participating McDonald’s for a limited
          time.
        </BottomBanner>
      </>
    </>
  );
}
