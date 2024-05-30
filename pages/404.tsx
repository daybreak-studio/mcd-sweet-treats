import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import AppFrame from "@/components/AppFrame/AppFrame";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import LinkButton from "@/components/Button/LinkButton";
import Image from "next/image";
import BottomBanner from "@/components/Banner/BottomBanner";
import ScribbleTextSVG from "./done/scribble-text.svg";

const Custom404: NextPage = () => {
  return (
    <AppFrame inverted>
      <LogoLockup noWordmark />
      <div className="z-30 my-auto flex flex-col items-center pb-16 text-center">
        <h2 className="font-serif-2xl max-w-[16ch] pb-10">
          Oh dear, there
          <br /> seems to be an error.
        </h2>
        <LinkButton inverted href={"/"}>
          Order Online
        </LinkButton>
        <div className="mt-8 flex flex-row divide-x divide-dark divide-opacity-20">
          <Link href="/" className="font-serif-base px-3">
            Record a message
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 flex flex-col items-center overflow-hidden">
        <div className="absolute -bottom-32 w-[65rem] lg:-bottom-[18vw] lg:w-full">
          <Image
            className="h-full w-full"
            src="/images/meal.png"
            alt="McFlurry"
            quality={100}
            width={500}
            height={500}
          />
          <ScribbleTextSVG className="k absolute rotate-6 text-accent lg:bottom-[37vw] lg:right-[12vw] 2xl:bottom-[39vw] 2xl:right-[calc(16vw+2rem)]" />
        </div>
      </div>
      <BottomBanner>
        Grandma McFlurry available at participating McDonald’s for a limited
        time.
      </BottomBanner>
    </AppFrame>
  );
};

export default Custom404;
