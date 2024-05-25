"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import LinkButton from "@/components/Button/LinkButton";
import Dropdown from "@/components/Dropdown/Dropdown";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";
import {
  InputLanguageKey,
  OutputLanguageKey,
  inputLanguageMap,
  outputLanguageMap,
} from "@/components/VideoUploadProvider/Languages";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const supportedInputLanguages = Object.keys(inputLanguageMap);
const supportedOutputLanguages = Object.keys(outputLanguageMap);

export default function LanguagePage() {
  const { setInputLanguage, setOutputLanguage, outputLanguage, inputLanguage } =
    useUserInfo();

  return (
    <AppFrame caption={"Select Languages Available"}>
      <LogoLockup />
      <div className="my-8 flex flex-grow flex-col items-center justify-center">
        <h1 className="font-serif-xl mb-4 w-8/12 text-center">
          Select your language
        </h1>
        <div className="mb-12 flex w-64 flex-col gap-4">
          <Dropdown.menu
            label={"From"}
            onChange={(latest) => setInputLanguage(latest as InputLanguageKey)}
            value={inputLanguage}
          >
            {supportedInputLanguages.map((language, index) => (
              <Dropdown.item value={language} key={index}>
                {language}
              </Dropdown.item>
            ))}
          </Dropdown.menu>
          <Dropdown.menu
            label={"To"}
            onChange={(latest) =>
              setOutputLanguage(latest as OutputLanguageKey)
            }
            value={outputLanguage}
          >
            {supportedOutputLanguages.map((language, index) => (
              <Dropdown.item value={language} key={index}>
                {language}
              </Dropdown.item>
            ))}
          </Dropdown.menu>
        </div>
        <LinkButton href={"/record"}>{"Let's go"}</LinkButton>
      </div>
    </AppFrame>
  );
}
