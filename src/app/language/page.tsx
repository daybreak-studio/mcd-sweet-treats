"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import Dropdown from "@/components/Dropdown/Dropdown";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const supportedInputLanguages = [
  "Portuguese",
  "Itlian",
  "Mandarin",
  "spanish",
  "English",
];

const supportedOutputLanguages = supportedInputLanguages;

export default function LanguagePage() {
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");

  return (
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup />
      </div>
      <div className="mb-auto my-8 flex flex-col items-center">
        <h1 className="font-serif-xl text-center mb-4">
          Select your <br /> language
        </h1>
        <div className="w-64 mb-12 flex flex-col gap-4">
          <Dropdown.menu
            label={"From"}
            onChange={(latest) => setInputLang(latest)}
          >
            {supportedInputLanguages.map((lang, index) => (
              <Dropdown.item value={lang.toLowerCase()} key={index}>
                {lang}
              </Dropdown.item>
            ))}
          </Dropdown.menu>
          <Dropdown.menu
            label={"To"}
            onChange={(latest) => setOutputLang(latest)}
          >
            {supportedOutputLanguages.map((lang, index) => (
              <Dropdown.item value={lang.toLowerCase()} key={index}>
                {lang}
              </Dropdown.item>
            ))}
          </Dropdown.menu>
        </div>
        <LinkButton href={"/user-info"}>{"Let's go"}</LinkButton>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
