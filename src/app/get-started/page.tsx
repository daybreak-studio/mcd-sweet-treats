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
      <div className="mb-auto mt-8">
        <LogoLockup noWordmark />
      </div>
      <div className="my-8 mb-auto flex flex-col items-center">
        <h1 className="font-serif-md mb-4 text-center">
          Record your video
          <br /> then treat yourself to a
        </h1>
        <div className="max-w-80">
          <GrandmaMcFlurryLogo />
        </div>
        <Image
          src="/image/mc-flurry.png"
          width={136 * 2}
          height={246 * 2}
          alt="Grandma McFlurry"
          className="mb-12 max-w-32"
        />
        <LinkButton href={"/rules"}>{"Let's go"}</LinkButton>
      </div>
      <div className="font-sans-xs mb-8 opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
