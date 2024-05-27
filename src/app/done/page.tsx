"use client"

import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React, { use } from "react";
import Image from "next/image";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import GrandmaMcFlurryLogo, { GrandmaMcFlurryLogoSeperated } from "@/components/Graphics/GrandmaMcFlurryLogo";
import { motion } from "framer-motion";
import { AnimWrap } from "@/components/AnimWrap";
type Props = {};

const DonePage = (props: Props) => {
  return (
    <AppFrame caption={"At participating McDonald's for a limited time."}>
      <LogoLockup noWordmark />
      <motion.section initial="hidden" animate="visible" variants={AnimWrap.AnimParentA} className="z-30 flex flex-grow flex-col items-center pt-16 text-center">
        <motion.h5 variants={AnimWrap.bounceUpB} className="font-serif-sm pb-4">
          Come to McDonald&apos;s to treat yourself to a
        </motion.h5>
        <motion.div className="pb-8">
          <GrandmaMcFlurryLogoSeperated />
        </motion.div>
        <LinkButton href={"https://www.mcdonalds.com/ca/en-ca.html"}>
          Order Online
        </LinkButton>
        <Link href="/" className="mt-8" >
          <motion.h5 variants={AnimWrap.bounceUpB} className="font-serif-sm">Record another message</motion.h5>
        </Link>
        <motion.figure
          variants={{ hidden: { rotate: 15, opacity: 0, scale: 0.9, y: "35%" }, visible: { rotate: 0, opacity: 1, scale: 1, y: "0", transition: { bounce: .2, type: "spring", duration: .65, delay: .8 } } }}
          className="pointer-events-none fixed inset-0 flex flex-col overflow-hidden origin-bottom-left" >
          <Image
            className="mt-auto origin-bottom translate-y-[10%] scale-[200%] md:w-full md:scale-150 xl:translate-y-[20%] xl:scale-100"
            src="/images/meal.png"
            alt="McFlurry"
            quality={100}
            width={500}
            height={500}
          />
        </motion.figure>
      </motion.section>

    </AppFrame>
  );
};

export default DonePage;
