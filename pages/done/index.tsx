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

type Props = {};

const DonePage = (props: Props) => {
  const share = useCallback(async () => {
    const shareData = {
      title: "Grandma McFlurry",
      text: "Send grandma a sweet message",
      url: "https://sweetconnections.ai",
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AppFrame>
      <LogoLockup noWordmark />
      <div className="z-30 my-auto flex flex-col items-center pb-16 text-center">
        <h5 className="font-serif-sm max-w-[20ch] pb-4">
          {"Come to McDonald's and treat yourself to a"}
        </h5>
        <div className="pb-8">
          <GrandmaMcFlurryLogo />
        </div>
        <LinkButton href={"https://www.mcdonalds.com/ca/en-ca.html"}>
          Order Online
        </LinkButton>
        <div className="mt-8 flex flex-row divide-x divide-dark divide-opacity-20">
          <button className="mr-3" onClick={() => share()}>
            <ShareIconSVG />
          </button>
          <Link href="/" className="px-3">
            <h5 className="font-serif-base">Record another message</h5>
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 flex flex-col items-center overflow-hidden">
        <div className="absolute -bottom-32 w-[65rem] lg:-bottom-[18vw] lg:w-full">
          <Image
            className="h-full w-full"
            src="/images/meal.png"
            alt="McFlurry"
            width={1600}
            height={900}
          />
          <ScribbleTextSVG className="k absolute rotate-6 text-dark lg:bottom-[37vw] lg:right-[12vw] 2xl:bottom-[39vw] 2xl:right-[calc(16vw+2rem)]" />
        </div>
      </div>
      <BottomBanner>
        {"At participating McDonald's for a limited time."}
      </BottomBanner>
    </AppFrame>
  );
};

export default DonePage;
