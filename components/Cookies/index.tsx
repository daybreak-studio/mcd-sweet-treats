import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect, useContext, createContext } from "react";
import { motion, cubicBezier, AnimatePresence, easeInOut } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useLocalStorage } from "usehooks-ts";
import useViewport from "@/hooks/useViewport";

const CookiesContext = createContext({
  isCookiesAccepted: false,
  isAskingPermission: false,
});
export const useCookiePreference = () => useContext(CookiesContext);

export const OpenInNewTab = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
};

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
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { isMobile } = useViewport();

  useEffect(() => {
    if (hasInit && !hasAskedCookiePreference) {
      setIsDrawerVisible(true);
    }
  }, [hasAskedCookiePreference, setHasAskedCookiePreference, hasInit]);

  const handleAccept = () => {
    setIsCookiesAccepted(isCookieChecked);
    setIsDrawerVisible(false);
  };

  useEffect(() => {
    setHasInit(true);
  }, []);

  useEffect(() => {
    if (isDrawerVisible) {
      setHasAskedCookiePreference(true);
    }
  }, [isDrawerVisible, setHasAskedCookiePreference]);

  return (
    <>
      <CookiesContext.Provider
        value={{
          isCookiesAccepted: isCookiesAccepted,
          isAskingPermission: !isDrawerVisible,
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
              className="fixed left-0 top-0 z-50 h-screen w-full bg-black bg-opacity-50 xl:bg-opacity-65"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: "100%",
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
                  : { opacity: 1, transition: { duration: 1, delay: 1.2 } }
              }
              exit={{
                opacity: 0,
                y: "100%",
                transition: {
                  duration: AnimationConfig.NORMAL,
                  ease: AnimationConfig.EASING_INVERTED,
                },
              }}
              className="fixed bottom-0 left-0 z-50 flex w-full flex-col gap-4 bg-[#F9D0D6] p-8 xl:bottom-0 xl:left-0 xl:right-0 xl:top-0 xl:mx-auto xl:h-fit xl:w-1/4 xl:rounded-xl"
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
                  I understand
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
