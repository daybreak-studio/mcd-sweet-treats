import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import GrandmaMcFlurryLogo from "@/components/Graphics/GrandmaMcFlurryLogo";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GetStartedPage() {
  return (
    <AppFrame caption={"At participating McDonald’s for a limited time."}>
      <LogoLockup />
      <div className="my-8 flex h-full flex-grow flex-col items-center justify-center">
        <h1 className="font-serif-md mb-4 w-8/12 text-center">
          Record your video then treat yourself to a
        </h1>
        <div className="max-w-8/12 pb-8">
          <GrandmaMcFlurryLogo />
        </div>
        <Image
          src="/images/mcflurry.png"
          width={300}
          height={300}
          alt="Grandma McFlurry"
          className="mb-12 max-w-32"
          priority
        />
        <LinkButton href={"/rules"}>{"Let's go"}</LinkButton>
      </div>
    </AppFrame>
  );
}
