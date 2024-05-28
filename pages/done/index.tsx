import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import BottomBanner from "@/components/Banner/BottomBanner";

type Props = {};

const DonePage = (props: Props) => {
  return (
    <AppFrame>
      <LogoLockup noWordmark />
      <div className="z-30 my-auto flex flex-col items-center pb-16 text-center">
        <h5 className="font-serif-sm pb-4">
          Come to McDonald&apos;s to treat yourself to a
        </h5>
        <div className="pb-8">
          <GrandmaMcFlurryLogo />
        </div>
        <LinkButton href={"https://www.mcdonalds.com/ca/en-ca.html"}>
          Order Online
        </LinkButton>
        <Link href="/" className="mt-8">
          <h5 className="font-serif-sm">Record another message</h5>
        </Link>
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
        </div>
      </div>
      <BottomBanner>
        {"At participating McDonald's for a limited time."}
      </BottomBanner>
    </AppFrame>
  );
};

export default DonePage;
