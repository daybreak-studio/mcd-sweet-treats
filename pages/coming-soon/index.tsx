import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React, { useCallback } from "react";
import Image from "next/image";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Cookies from "@/components/Cookies";

type Props = {};

const DonePage = (props: Props) => {
  return (
    <>
      <LogoLockup />
      <div className="flex flex-grow flex-col items-center justify-center text-center">
        <h1 className="font-serif-2xl pb-8">
          Check back soon to send a sweet message to grandma.
        </h1>
        <h2 className="font-serif-md">
          In the meantime, come to McDonald’s to try the Grandma McFlurry today.
        </h2>
      </div>
    </>
  );
};

export default DonePage;
