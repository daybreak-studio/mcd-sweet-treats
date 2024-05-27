"use client";

import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import AppFrame from "@/components/AppFrame/AppFrame";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion, useTransform, useMotionValue } from "framer-motion";
import LinkButton from "@/components/Button/LinkButton";
import { AnimWrap } from "@/components/AnimWrap";

type Props = {};

const UploadingPage = (props: Props) => {
  const { progress } = useVideoUpload();

  return (
    <AppFrame>
      <LogoLockup />
      <motion.div initial="hidden" animate="visible" variants={AnimWrap.AnimParentA} className="flex flex-grow flex-col items-center justify-center text-center origin-top-left">
        <motion.h1 variants={AnimWrap.bounceUpA} className="font-serif-2xl self-start px-16 pb-4 text-center mx-auto origin-top-left">
          {progress < 1 ? "Don't leave just yet!" : "Check your inbox!"}
        </motion.h1>
        <motion.h5 variants={AnimWrap.bounceUpB} className="font-serif-base pb-8 origin-top-left">
          {progress < 1
            ? "We’re getting your video ready."
            : "Your results are in."}
        </motion.h5>
        <motion.div variants={{ hidden: { opacity: 0, scale: .5, rotate: -5, y: 40 }, visible: { opacity: [0, .9, 1], scale: 1, rotate: 0, y: 0 } }} className="relative flex w-fit justify-center origin-top-left">
          <Image
            className="w-1/2 opacity-25"
            src="/images/mcflurry.png"
            alt="McFlurry Transparent"
            width={300}
            height={300}
          />
          <motion.img
            className="absolute bottom-0 w-1/2 opacity-100"
            src="/images/mcflurry.png"
            alt="McFlurry Full"
            transition={{ delay: 1.5 }}
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
        </motion.div>
        <div className="mt-8">
          {progress === 1 && <LinkButton href="/done">Continue</LinkButton>}
        </div>
      </motion.div>
    </AppFrame>
  );
};

export default UploadingPage;
