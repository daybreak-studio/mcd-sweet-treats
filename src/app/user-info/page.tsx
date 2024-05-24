"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Checkbox from "@/components/Checkbox/Checkbox";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import SwirlGraphicBottom from "@/components/Graphics/SwirlGraphicBottom";
import SwirlGraphicTop from "@/components/Graphics/SwirlGraphicTop";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Textfield from "@/components/Textfield/Textfield";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";
import Image from "next/image";

export default function UserInfoPage() {
  const { setEmail, email, setName, name } = useUserInfo();

  return (
    <AppFrame>
      <div className="mb-auto mt-8">
        <LogoLockup noWordmark />
      </div>
      <div className="relative my-8 mb-auto flex flex-col items-center text-center">
        <h1 className="font-serif-xl mb-4 text-center">
          Who&apos;s grandma&apos;s
          <br /> favourite? It&apos;s you!
        </h1>
        <div className="font-serif-sm max-w-[26ch]">
          Enter your information to ensure that the video makes it your way.
        </div>
        <div className="my-10 flex flex-col gap-2">
          <Textfield
            label={"Your full name"}
            placeholder={"First Last"}
            onChange={setName}
            value={name}
          />
          <Textfield
            label={"Personal email address"}
            placeholder={"example@gmail.com"}
            onChange={setEmail}
            value={email}
          />
          <Checkbox>I accept the Terms & Conditions</Checkbox>
        </div>

        <LinkButton href={"/record"}>{"I am ready"}</LinkButton>
      </div>
      <div className="font-sans-xs mb-8 opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
