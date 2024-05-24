"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/Dropdown/Dropdown";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Swirl1 from "@/components/Graphics/Swirl1";
import Textfield from "@/components/Textfield/Textfield";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup noWordmark />
      </div>
      <div className="mb-auto my-8 flex flex-col items-center">
        <h1 className="font-serif-lg text-center mb-4 px-8">
          Send grandma a sweet message
        </h1>
        <div className="relative w-full h-[350px] z-10">
          <Image
            className="max-w-[61.8%] absolute left-[51%] translate-x-[-50%]"
            src="/opening/visual-1-placeholder.png"
            layout="responsive"
            width={375}
            height={812}
            alt={""}
          />
          <div className="absolute left-0 bottom-[-150px] w-full">
            <Swirl1 />
          </div>
        </div>
        <LinkButton href={"/get-started"}>Continue</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
