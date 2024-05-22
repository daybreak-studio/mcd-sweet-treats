"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GetStartedPage() {
  return (
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup noWordmark />
      </div>
      <div className="mb-auto my-8 flex flex-col items-center">
        <h1 className="font-serif-md text-center mb-4">
          Record your video
          <br /> then treat yourself to a
        </h1>
        <div className="max-w-80">
          <GrandmaMcFlurryLogo />
        </div>
        <Image
          src="/grandma-mc-flurry.png"
          width={136 * 2}
          height={246 * 2}
          alt="Grandma McFlurry"
          className="max-w-32 mb-12"
        />
        <LinkButton href={"/rules"}>{"Let's go"}</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
