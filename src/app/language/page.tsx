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
    <AppFrame>
      <div className="mb-auto mt-8">
        <LogoLockup />
      </div>
      <div className="my-8 mb-auto flex flex-col items-center">
        <h1 className="font-serif-xl mb-4 text-center">
          Select your <br /> language
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
        <LinkButton href={"/user-info"}>{"Let's go"}</LinkButton>
      </div>
      <div className="font-sans-xs mb-8 opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
