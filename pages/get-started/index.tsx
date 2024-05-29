import AppFrame from "@/components/AppFrame/AppFrame";
import BottomBanner from "@/components/Banner/BottomBanner";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import ImageCollage from "@/components/ImageCollage/ImageCollage";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GetStartedPage() {
  return (
    <>
      <AppFrame>
        <LogoLockup noWordmark />
        <div className="mt-auto flex h-full flex-grow flex-col items-center justify-center">
          <h1 className="font-serif-md my-4 w-[20ch] text-center">
            Record your video
            <br /> then treat yourself to a
          </h1>
          <div className="max-w-8/12 mb-8 h-[10svh] min-h-20">
            <GrandmaMcFlurryLogo className="h-full" />
          </div>
          <Image
            src="/images/mcflurry.png"
            width={300}
            height={300}
            alt="Grandma McFlurry"
            className="mb-12 h-[24svh] w-auto"
            priority
          />
          <LinkButton href={"/rules"}>{"Let's go"}</LinkButton>
        </div>
        <BottomBanner>
          {"At participating McDonald’s for a limited time."}
        </BottomBanner>
      </AppFrame>
      <ImageCollage />
    </>
  );
}
