"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Checkbox from "@/components/Checkbox/Checkbox";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import SwirlGraphicBottom from "@/components/Graphics/SwirlGraphicBottom";
import SwirlGraphicTop from "@/components/Graphics/SwirlGraphicTop";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Textfield from "@/components/Textfield/Textfield";
import Image from "next/image";

export default function UserInfoPage() {
  return (
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup noWordmark />
      </div>
      <div className="mb-auto relative my-8 flex flex-col items-center text-center">
        <h1 className="font-serif-xl text-center mb-4">
          Who&apos;s grandma&apos;s
          <br /> favourite? It&apos;s you!
        </h1>
        <div className="max-w-[26ch] font-serif-sm">
          Enter your information to ensure that the video makes it your way.
        </div>
        <div className="flex flex-col gap-2 my-10">
          <Textfield label={"Your full name"} placeholder={"First Last"} />
          <Textfield
            label={"Personal email address"}
            placeholder={"example@gmail.com"}
          />
          <Checkbox>I accept the Terms & Conditions</Checkbox>
        </div>

        <LinkButton href={"/record"}>{"I am ready"}</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
