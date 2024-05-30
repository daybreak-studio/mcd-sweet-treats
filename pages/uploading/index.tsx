import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import React, { MutableRefObject, useEffect, useRef } from "react";
import Image from "next/image";
import AppFrame from "@/components/AppFrame/AppFrame";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion, useIsPresent } from "framer-motion";
import LinkButton from "@/components/Button/LinkButton";
import { AnimWrap } from "@/components/AnimWrap";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";

import swirlAnimation from "@/public/Sprite - 4.json";
import dynamic from "next/dynamic";
import { LottieRefCurrentProps } from "lottie-react";
//@ts-ignore
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {};

const UploadingPage = (props: Props) => {
  const { progress, isUploading } = useVideoUpload();
  const { email, clearVideo } = useUserInfo();

  const handleEmail = async () => {
    if (!email) return;

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send email");
    }
  };

  useEffect(() => {
    // clear video draft when the upload is completed
    if (progress >= 1 && !isUploading) {
      handleEmail();
      clearVideo();
      return;
    }
  }, [progress, isUploading, clearVideo]);

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
      <LogoLockup />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={AnimWrap.AnimParentA}
        className="flex flex-grow origin-top-left flex-col items-center justify-center text-center"
      >
        <motion.h1
          variants={AnimWrap.bounceUpA}
          className="font-serif-xl mx-auto mt-8 origin-top-left self-start px-4 pb-2 text-center md:font-serif-2xl max-md:max-w-[12ch]"
        >
          {progress < 1
            ? "Don't leave just yet!"
            : "Your message is being translated"}
        </motion.h1>
        <motion.h5
          variants={AnimWrap.bounceUpB}
          className="font-serif-base origin-top-left pb-8"
        >
          {progress < 1
            ? "We’re uploading your video!"
            : "We'll email you when it's ready."}
        </motion.h5>
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.7, rotate: -5, y: 40 },
            visible: { opacity: [0, 0.9, 1], scale: 1, rotate: 0, y: 0 },
          }}
          className="relative flex w-[50vh] origin-top-left justify-center"
        >
          <motion.div
            animate={{
              opacity: [0.1, 0.25],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.5,
              },
            }}
            className="w-1/2 opacity-25"
          >
            <Image
              src="/images/mcflurry.png"
              alt="McFlurry Transparent"
              width={300}
              height={300}
            />
          </motion.div>
          <motion.img
            className="absolute bottom-0 w-1/2 opacity-100"
            src="/images/mcflurry.png"
            alt="McFlurry Full"
            transition={{ delay: 1.5 }}
            initial={{
              height: `0%`,
            }}
            animate={{
              height: `${progress * 100}%`,
            }}
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
              overflow: "hidden",
              transition: "height .3 cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <Lottie
            animationData={swirlAnimation}
            loop={false}
            autoPlay={false}
            lottieRef={lottieRef}
            className="pointer-events-none absolute inset-0 translate-y-[-65%] scale-[3.3]"
          />
        </motion.div>
        <div className="mt-8">
          {progress === 1 && <LinkButton href="/done">Continue</LinkButton>}
        </div>
      </motion.div>
    </>
  );
};

export default UploadingPage;
