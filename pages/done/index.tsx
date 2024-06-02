import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React, { useCallback } from "react";
import Image from "next/image";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import BottomBanner from "@/components/Banner/BottomBanner";
import ShareIconSVG from "./share-icon.svg";
import ScribbleTextSVG from "./scribble-text.svg";
import { motion } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";

type Props = {};

const DonePage = (props: Props) => {
  const share = useCallback(async () => {
    const shareData = {
      title: "Grandma McFlurry",
      text: "Hi! Try this AI translation tool from McDonald’s. It lets you record a video for grandma then translates it into her native language. 🥰",
      url: "https://sweetconnections.ai",
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(shareData.url);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <LogoLockup noWordmark />
      <motion.div
        initial={"hidden"}
        animate={"visible"}
        exit={"exit"}
        variants={AnimWrap.AnimParentA}
        className="z-30 my-auto flex flex-col items-center pb-16 text-center"
      >
        <motion.h5
          variants={AnimWrap.bounceUpA}
          className="font-serif-sm max-w-[20ch] pb-4"
        >
          {"Come to McDonald's and treat yourself to a"}
        </motion.h5>
        <motion.div
          variants={AnimWrap.bounceUpA}
          className="h-[16vh] min-h-24 pb-8"
        >
          <GrandmaMcFlurryLogo className="h-full w-auto" />
        </motion.div>
        <LinkButton href={"https://www.mcdonalds.com/"}>
          Order Online
        </LinkButton>
        <motion.div
          variants={AnimWrap.bounceUpA}
          className="mt-8 flex flex-row divide-x divide-dark divide-opacity-20"
        >
          <button className="mr-3" onClick={() => share()}>
            <ShareIconSVG />
          </button>
          <Link href="/" className="px-3">
            <h5 className="font-serif-base">Record another message</h5>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="pointer-events-none fixed inset-0 flex flex-col items-center overflow-hidden"
      >
        <div className="absolute -bottom-32 w-[65rem] lg:-bottom-[18vw] lg:w-full">
          <Image
            className="h-full w-full"
            src="/images/meal.png"
            alt="McFlurry"
            width={1965}
            height={1106}
          />
          <ScribbleTextSVG className="k absolute rotate-6 text-dark lg:bottom-[37vw] lg:right-[12vw] 2xl:bottom-[39vw] 2xl:right-[calc(16vw+2rem)]" />
        </div>
      </motion.div>
      <BottomBanner>
        Grandma McFlurry available at participating McDonald’s for a limited
        time.
      </BottomBanner>
    </>
  );
};

export default DonePage;
