import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect, useContext, createContext } from "react";
import { motion, cubicBezier, AnimatePresence, easeInOut } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import useViewport from "@/hooks/useViewport";
import useGoogleAnalytics from "@/hooks/useGoogleAnalytics";
import { OpenInNewTab } from "@/components/OpenInNewTab";

const CookiesContext = createContext({
  isCookiesAccepted: false,
  isAskingPermission: false,
});
export const useCookiePreference = () => useContext(CookiesContext);

export default function CookiesGate({
  children,
}: {
  children: React.ReactNode;
}) {
  // ask the user cookie preference again if they have not consented
  const [isCookiesAccepted, setIsCookiesAccepted] = useLocalStorage(
    "cookies-preference",
    false,
    { initializeWithValue: false },
  );
  const [hasInit, setHasInit] = useState(false);
  const [hasAskedCookiePreference, setHasAskedCookiePreference] =
    useLocalStorage("has-asked-cookies-preference", false, {
      initializeWithValue: false,
    });
  const [isCookieChecked, setIsCookieChecked] = useState(true);
  const [isDrawerVisible, setIsDrawerVisible] = useState(true);

  useGoogleAnalytics("G-JNW1SSN9K2", isCookiesAccepted);

  useEffect(() => {
    console.log(isDrawerVisible);
    if (hasInit && hasAskedCookiePreference) {
      setIsDrawerVisible(false);
    }
  }, [hasAskedCookiePreference, hasInit]);

  const handleAccept = () => {
    setHasAskedCookiePreference(true);
    setIsCookiesAccepted(isCookieChecked);
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    setHasInit(true);
  }, []);

  const isMobile = useMediaQuery("(max-width:1024px)");

  return (
    <>
      <CookiesContext.Provider
        value={{
          isCookiesAccepted: isCookiesAccepted,
          isAskingPermission: isDrawerVisible,
        }}
      >
        {children}
      </CookiesContext.Provider>
      <AnimatePresence>
        {isDrawerVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.75, delay: 1, ease: "easeInOut" },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.75, delay: 0, ease: "easeInOut" },
              }}
              className="fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-50 lg:bg-opacity-65"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: isMobile ? "100%" : "20%",
              }}
              animate={
                isMobile
                  ? {
                      y: 0,
                      opacity: 1,
                      transition: {
                        delay: 1,
                        duration: AnimationConfig.SLOW,
                        ease: AnimationConfig.EASING,
                      },
                    }
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: 1,
                        duration: AnimationConfig.SLOW,
                        ease: AnimationConfig.EASING,
                      },
                    }
              }
              exit={{
                opacity: 0,
                y: "20%",
                transition: {
                  duration: AnimationConfig.FAST,
                  ease: AnimationConfig.EASING_INVERTED,
                },
              }}
              className="fixed bottom-0 left-0 z-50 flex w-full flex-col gap-4 bg-[#F9D0D6] p-8 lg:bottom-0 lg:left-0 lg:right-0 lg:top-0 lg:mx-auto lg:my-auto lg:h-fit lg:w-96 lg:rounded-xl"
            >
              <h1 className="font-serif-lg">Before you begin...</h1>
              <h2 className="text-sm">
                This site is intended for US residents who are 13 years or
                older. Minors must have permission from a parent or legal
                guardian to submit a video. Information submitted via this site
                is subject to{" "}
                <OpenInNewTab
                  href="https://www.heygen.com/terms"
                  className="font-medium underline"
                >
                  terms and conditions
                </OpenInNewTab>
                . For privacy policy,{" "}
                <OpenInNewTab
                  href="https://www.heygen.com/policy"
                  className="font-medium underline"
                >
                  click here
                </OpenInNewTab>
                .
              </h2>
              <Checkbox
                className="pb-2"
                name={"Cookies"}
                onChange={(value) => setIsCookieChecked(value)}
                value={isCookieChecked}
              >
                <h3 className="pl-2 text-xs">
                  By accepting{" "}
                  <a
                    href="#"
                    className="font-medium underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(
                        "https://policies.google.com/technologies/cookies?hl=en-US",
                        "_blank",
                      );
                    }}
                  >
                    cookies
                  </a>
                  , you agree to our use of Google Analytics for site
                  performance and usage insights.
                </h3>
              </Checkbox>

              <div className="flex justify-center">
                <Button className="w-full" onClick={handleAccept}>
                  I Understand
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
