"use client";

import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";
import AppFrame from "@/components/AppFrame/AppFrame";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion, useTransform, motionValue } from "framer-motion";
import LinkButton from "@/components/Button/LinkButton";

type Props = {};

const UploadingPage = (props: Props) => {
  const { progress } = useVideoUpload();

  const motionProgress = motionValue(progress);
  const maskHeight = useTransform(motionProgress, [0, 1], ["0%", "100%"]);

  return (
    <AppFrame>
      <div className="mb-auto mt-8">
        <LogoLockup />
      </div>
      <div className="mb-auto flex flex-col items-center text-center">
        <h1 className="font-serif-2xl self-start px-16 pb-4 text-center">
          {progress < 1 ? "Don't leave just yet!" : "Check your inbox!"}
        </h1>
        <h5 className="font-serif-base pb-8">
          {progress < 1
            ? "We’re getting your video ready."
            : "Your results are in."}
        </h5>
        <div className="relative flex w-fit justify-center">
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
            style={{
              height: maskHeight,
              objectFit: "cover",
              objectPosition: "bottom",
              overflow: "hidden",
            }}
          />
        </div>
        <div className="mt-8">
          {progress === 1 && <LinkButton href="/done">Continue</LinkButton>}
        </div>
      </div>
    </AppFrame>
  );
};

export default UploadingPage;
