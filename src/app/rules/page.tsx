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
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup noWordmark />
      </div>
      <div className="mb-auto relative my-8 flex flex-col items-center text-center">
        <SwirlGraphicTop className="relative mb-6 left-4" />
        <h1 className="font-serif-xl text-center mb-4">
          Play nice for <br /> grandma
        </h1>
        <div className="max-w-[26ch] font-serif-sm">
          Mind your manners and don&apos;t say or show anything inappropriate
        </div>
        <SwirlGraphicBottom className="relative -top-16 -left-16" />

        <LinkButton href={"/language"}>{"I promise"}</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
