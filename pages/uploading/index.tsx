import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import React, { useEffect } from "react";
import Image from "next/image";
import AppFrame from "@/components/AppFrame/AppFrame";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import LinkButton from "@/components/Button/LinkButton";
import { AnimWrap } from "@/components/AnimWrap";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";

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

  return (
    <AppFrame>
      <LogoLockup />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={AnimWrap.AnimParentA}
        className="flex flex-grow origin-top-left flex-col items-center justify-center text-center"
      >
        <motion.h1
          variants={AnimWrap.bounceUpA}
          className="font-serif-2xl mx-auto origin-top-left self-start px-4 pb-4 text-center"
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
            hidden: { opacity: 0, scale: 0.5, rotate: -5, y: 40 },
            visible: { opacity: [0, 0.9, 1], scale: 1, rotate: 0, y: 0 },
          }}
          className="relative flex w-fit origin-top-left justify-center"
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
