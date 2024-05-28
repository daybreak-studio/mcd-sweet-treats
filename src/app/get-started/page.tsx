"use client";

import { AnimWrap } from "@/components/AnimWrap";
import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo, { GrandmaMcFlurryLogoSeperated } from "@/components/Graphics/GrandmaMcFlurryLogo";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GetStartedPage() {
  return (
    <AppFrame caption={"At participating McDonald’s for a limited time."}>
      <LogoLockup />
      <motion.section variants={AnimWrap.AnimParentB} initial="hidden" animate="visible" exit="exit"
        className="my-8 flex h-full flex-grow flex-col items-center justify-center">
        <motion.h1
          variants={AnimWrap.bounceUpB}
          className="font-serif-md mb-4 w-8/12 text-center">
          Record your video then treat yourself to a
        </motion.h1>
        <motion.div className="max-w-8/12 pb-8">
          <GrandmaMcFlurryLogoSeperated />
        </motion.div>
        <motion.figure variants={AnimWrap.bounceUpB}>
          <Image
            src="/images/mcflurry.png"
            width={300}
            height={300}
            alt="Grandma McFlurry"
            className="mb-12 max-w-32"
            priority
          />
        </motion.figure >
        <LinkButton href={"/rules"}>{"Let's go"}</LinkButton>
      </motion.section>
    </AppFrame>
  );
}
