import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { useState, useEffect, useContext, createContext } from "react";
import { motion, cubicBezier, AnimatePresence, easeInOut } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useLocalStorage } from "usehooks-ts";

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
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

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
              className="fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-75"
            ></motion.div>
            <motion.div
              initial={{
                // opacity: 0,
                y: "100%",
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1,
                  duration: AnimationConfig.SLOW,
                  ease: AnimationConfig.EASING,
                },
              }}
              exit={{
                // opacity: 0,
                y: "100%",
                transition: {
                  duration: AnimationConfig.NORMAL,
                  ease: AnimationConfig.EASING_INVERTED,
                },
              }}
              className="fixed bottom-0 left-0 z-50 flex flex-col gap-4 bg-[#F9D0D6] p-8"
            >
              <h1 className="font-serif-lg">Before you begin...</h1>
              <h2 className="text-sm">
                This site is intended for US residents who are 13 years or
                older. Minors must have permission from a parent or legal
                guardian to submit a video. Information submitted via this site
                is subject to the HeyGen{" "}
                <a
                  href="#"
                  className="font-bold underline"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://www.example.com", "_blank");
                  }}
                >
                  Privacy Policy
                </a>{" "}
                and MailChimp{" "}
                <a
                  href="#"
                  className="font-bold underline"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://www.example.com", "_blank");
                  }}
                >
                  Privacy Policy
                </a>
                .
              </h2>
              <Checkbox
                className="pb-2"
                name={"Cookies"}
                onChange={(value) => setIsCookieChecked(value)}
                value={isCookieChecked}
              >
                <h3 className="pl-2 text-xs">
                  By accepting cookies, you agree to our use of Google Analytics
                  for site performance and usage insights.
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
