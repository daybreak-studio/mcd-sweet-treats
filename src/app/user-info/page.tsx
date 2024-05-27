"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Textfield from "@/components/Textfield/Textfield";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";
import { usePathname, useRouter } from "next/navigation";
import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import { AnimatePresence, motion } from "framer-motion";
import BottomBanner from "@/components/Banner/BottomBanner";
import { useHash } from "react-use";
import TermsAndCondition from "@/components/TermsAndCondition/TermsAndCondition";

const TERMS_HASH = "#terms-and-conditions";

export default function UserInfoPage() {
  const pathName = usePathname();

  const {
    setEmail,
    email,
    setName,
    name,
    videoBlob,
    inputLanguage,
    outputLanguage,
    setHasAcceptedTerms,
    hasAcceptedTerms,
  } = useUserInfo();
  const { upload } = useVideoUpload();
  const router = useRouter();

  const [hash, setHash] = useHash();

  const submitAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const terms = formData.get("terms");
  };

  console.log(hash);

  return (
    <AppFrame>
      <div className="mb-auto mt-8">
        <LogoLockup noWordmark />
      </div>

      <AnimatePresence>
        {hash === TERMS_HASH && (
          <motion.div
            className="z-50"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div className="fixed inset-0 bg-dark bg-opacity-60" />
            <TermsAndCondition />
          </motion.div>
        )}
      </AnimatePresence>
      <form
        action={submitAction}
        className="relative my-8 mb-auto flex flex-col items-center text-center"
      >
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
            name={"name"}
          />
          <Textfield
            label={"Personal email address"}
            placeholder={"example@gmail.com"}
            onChange={setEmail}
            value={email}
            name={"email"}
          />
          <Checkbox name={"terms"}>
            <span>
              I accept the{" "}
              <a href={`${TERMS_HASH}`} className="font-sans-sm font-bold">
                Terms & Conditions
              </a>
            </span>
          </Checkbox>
        </div>

        {/* ADD CAPTCHA HERE */}
        <Button
          submit
          onClick={() => {
            // if (inputLanguage === "" || outputLanguage === "") {
            //   console.log(
            //     "Input or output language is empty, redirecting to language page",
            //   );
            //   router.push("/language");
            //   return;
            // }
            // if (!videoBlob) {
            //   console.log("Video not recorded, redirecting to record page");
            //   router.push("/record");
            //   return;
            // }
            // router.push("/uploading");
            // upload(videoBlob, {
            //   name,
            //   email,
            //   inputLanguage,
            //   outputLanguage,
            // });
          }}
        >
          {"Submit"}
        </Button>
      </form>

      <BottomBanner>Select languages available</BottomBanner>
    </AppFrame>
  );
}
