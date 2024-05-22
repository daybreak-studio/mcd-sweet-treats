"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import Checkbox from "@/components/Checkbox/Checkbox";
import Dropdown from "@/components/Dropdown/Dropdown";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
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
        <h1 className="font-serif-lg text-center mb-4">
          Send grandma a sweet message
        </h1>
        <LinkButton href={"/get-started"}>Continue</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
