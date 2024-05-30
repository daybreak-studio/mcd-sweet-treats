import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Dropdown from "@/components/Dropdown/Dropdown";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";
import {
  InputLanguageKey,
  OutputLanguageKey,
  inputLanguageMap,
  outputLanguageMap,
} from "@/components/VideoUploadProvider/Languages";
import { motion } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";
import BottomBanner from "@/components/Banner/BottomBanner";
import ImageCollage from "@/components/ImageCollage/ImageCollage";
import { useMemo, useState } from "react";
import Button from "@/components/Button/Button";
import { useRouter } from "next/router";
import LanguageCollageImageLayout from "@/components/ImageCollage/Layouts/LanguageCollageImageLayout";
const supportedInputLanguages = Object.keys(inputLanguageMap);
const supportedOutputLanguages = Object.keys(outputLanguageMap);

const INPUT_LANG_EMPTY_ERROR = "Please select an input language";
const OUTPUT_LANG_EMPTY_ERROR = "Please select an output language";

export default function LanguagePage() {
  const { setInputLanguage, setOutputLanguage, outputLanguage, inputLanguage } =
    useUserInfo();

  const isInputLangEmpty = useMemo(
    () => (inputLanguage ? false : true),
    [inputLanguage],
  );

  const isOutputLangEmpty = useMemo(
    () => (outputLanguage ? false : true),
    [outputLanguage],
  );

  const [hasUserSubmitted, setHasUserSubmitted] = useState(false);

  const router = useRouter();
  const handleSubmitClicked = () => {
    setHasUserSubmitted(true);
    if (isInputLangEmpty || isOutputLangEmpty) return;
    router.push("/record");
  };

  return (
    <>
      <AppFrame>
        <LogoLockup />
        <motion.div
          variants={AnimWrap.AnimParentA}
          initial="hidden"
          animate="visible"
          className="my-8 flex flex-grow flex-col items-center justify-center"
        >
          <motion.h1
            variants={AnimWrap.bounceUpA}
            className="font-serif-xl mb-4 w-8/12 text-center"
          >
            Select your language
          </motion.h1>
          <div className="mb-12 flex w-64 flex-col gap-4">
            <Dropdown.menu
              label={"From"}
              onChange={(latest) =>
                setInputLanguage(latest as InputLanguageKey)
              }
              error={
                hasUserSubmitted && isInputLangEmpty && INPUT_LANG_EMPTY_ERROR
              }
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
              error={
                hasUserSubmitted && isOutputLangEmpty && OUTPUT_LANG_EMPTY_ERROR
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
          <Button onClick={handleSubmitClicked}>{"Let's go"}</Button>
        </motion.div>
        <BottomBanner>{"Select languages available"}</BottomBanner>
      </AppFrame>
    </>
  );
}
