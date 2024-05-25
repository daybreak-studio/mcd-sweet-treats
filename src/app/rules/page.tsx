"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import SwirlGraphicBottom from "@/components/Graphics/SwirlGraphicBottom";
import SwirlGraphicTop from "@/components/Graphics/SwirlGraphicTop";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Image from "next/image";

export default function RulesPage() {
  return (
    <AppFrame
      caption={
        "McDonald’s reserves the right to not render videos that contain offensive items."
      }
    >
      <LogoLockup />
      <div className="relative my-8 flex h-full flex-grow flex-col items-center justify-center text-center">
        <SwirlGraphicTop className="relative left-4 mb-6" />
        <h1 className="font-serif-xl mb-4 w-8/12 text-center">
          Be good for grandma
        </h1>
        <div className="font-serif-sm max-w-[26ch]">
          Like grandma says, if you don’t have anything nice to say, don’t say
          anything at all.
        </div>
        <SwirlGraphicBottom className="relative -left-16 -top-16" />
        <LinkButton href={"/language"}>{"I promise"}</LinkButton>
      </div>
    </AppFrame>
  );
}
