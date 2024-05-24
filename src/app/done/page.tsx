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
    <AppFrame>
      <div className="fixed inset-0 flex flex-col overflow-hidden">
        <Image
          className="mt-auto origin-bottom scale-[200%] md:w-full md:scale-150 xl:translate-y-[20%] xl:scale-100"
          src="/images/meal.png"
          alt="McFlurry"
          quality={100}
          width={500}
          height={500}
        />
      </div>

      <div className="mt-8 pb-32">
        <LogoLockup noWordmark />
      </div>
      <div className="mb-auto flex flex-col text-center">
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
      <div className="font-sans-xs z-20 w-full bg-opacity-25 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent pb-8 pt-16 text-center text-light">
        At participating McDonald’s for a limited time.
      </div>
    </AppFrame>
  );
};

export default DonePage;
