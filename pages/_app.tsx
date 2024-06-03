import type { AppProps } from "next/app";
import VideoUploadProvider from "@/components/VideoUploadProvider/VideoUploadProvider";
import UserInfoProvider from "@/components/UserInfoProvider/UserInfoProvider";
import { WindowDimensionContextProvider } from "@/hooks/useWindowDimension";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Head from "next/head";
import CookiesGate from "@/components/Cookies";
import ImagePoolProvider from "@/components/ImagePool/ImagePoolProvider";
import IMAGES_MANIFEST from "@/data/images-manifest.json";
import ImageCollageLayoutSwitcher from "@/components/ImageCollage/Layouts/ImageCollageLayoutSwitcher";
import AppFrame from "@/components/AppFrame/AppFrame";
import { Analytics } from "@vercel/analytics/react";
import ToastRenderer from "@/components/Toast/ToastRenderer";

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

  return (
    <>
      <Head>
        <title>Sweet Connections | McDonald&apos;s</title>
        <meta name="description" content="Send grandma a sweet message." />
        <meta property="og:title" content="Sweet Connections | McDonald's" />
        {/* <meta property="og:site_name" content="McDonald's" /> */}

        <meta
          property="og:description"
          content="Send grandma a sweet message."
        />
        <meta property="og:url" content="https://sweetconnections.ai" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://sweetconnections.ai/og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Send grandma a sweet message." />
      </Head>
      <Analytics />
      <ReCaptchaProvider>
        <WindowDimensionContextProvider>
          <ImagePoolProvider
            srcList={IMAGES_MANIFEST}
            constraint={{
              width: 200,
            }}
          >
            <UserInfoProvider>
              <VideoUploadProvider>
                <CookiesGate>
                  <AnimatePresence initial={false} mode="wait">
                    {pathname === "/record" && (
                      <Component
                        {...pageProps}
                        key={"record"}
                        className={` ${font_speedee.variable}`}
                      />
                    )}
                    {pathname !== "/record" && (
                      <AppFrame key={"frame"}>
                        <AnimatePresence mode="wait">
                          <Component
                            {...pageProps}
                            key={pathname}
                            className={` ${font_speedee.variable}`}
                          />
                        </AnimatePresence>
                      </AppFrame>
                    )}
                  </AnimatePresence>
                  <ImageCollageLayoutSwitcher />
                  <ToastRenderer />
                </CookiesGate>
              </VideoUploadProvider>
            </UserInfoProvider>
          </ImagePoolProvider>
        </WindowDimensionContextProvider>
      </ReCaptchaProvider>
    </>
  );
}
