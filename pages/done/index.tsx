import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";

type Props = {};

const DonePage = (props: Props) => {
  return (
    <AppFrame caption={"At participating McDonald's for a limited time."}>
      <LogoLockup />
      <div className="z-30 flex flex-grow flex-col items-center pt-16 text-center">
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

      <div className="pointer-events-none fixed inset-0 flex flex-col overflow-hidden">
        <Image
          className="mt-auto origin-bottom translate-y-[10%] scale-[200%] md:w-full md:scale-150 xl:translate-y-[20%] xl:scale-100"
          src="/images/meal.png"
          alt="McFlurry"
          quality={100}
          width={500}
          height={500}
        />
      </div>
    </AppFrame>
  );
};

export default DonePage;
