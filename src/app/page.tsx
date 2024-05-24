"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";

import Swirl1 from "@/components/Graphics/Swirl1";
import Image from "next/image";

export default function Home() {
  return (
    <AppFrame>
      <div className="mb-auto mt-8">
        <LogoLockup noWordmark />
      </div>
      <div className="my-8 mb-auto flex flex-col items-center">
        <h1 className="font-serif-lg mb-4 px-8 text-center">
          Send grandma a sweet message
        </h1>
        <div className="relative z-10 h-[350px] w-full">
          <Image
            className="absolute left-[51%] max-w-[61.8%] translate-x-[-50%]"
            src="/opening/visual-1-placeholder.png"
            layout="responsive"
            width={375}
            height={812}
            alt={""}
          />
          <div className="absolute bottom-[-150px] left-0 w-full">
            <Swirl1 />
          </div>
        </div>
        <LinkButton href={"/get-started"}>Continue</LinkButton>
      </div>
      <div className="font-sans-xs mb-8 opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
