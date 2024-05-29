import type { AppProps } from "next/app";
import VideoUploadProvider from "@/components/VideoUploadProvider/VideoUploadProvider";
import UserInfoProvider from "@/components/UserInfoProvider/UserInfoProvider";
import { WindowDimensionContextProvider } from "@/hooks/useWindowDimension";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import ComingSoon from "./coming-soon";
import useIsDev from "@/hooks/useIsDev";

const font_speedee = localFont({
  src: [
    {
      path: "../public/typography/speedee/Speedee_Rg.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/typography/speedee/Speedee_Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-speedee",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();
  const hash = useIsDev();
  return (
    <ReCaptchaProvider>
      <WindowDimensionContextProvider>
        <UserInfoProvider>
          <VideoUploadProvider>
            <AnimatePresence mode="wait">
              {hash ? (
                <Component
                  {...pageProps}
                  key={pathname}
                  className={` ${font_speedee.variable}`}
                />
              ) : (
                <ComingSoon />
              )}
            </AnimatePresence>
          </VideoUploadProvider>
        </UserInfoProvider>
      </WindowDimensionContextProvider>
    </ReCaptchaProvider>
  );
}
