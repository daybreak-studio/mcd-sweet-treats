import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {};

const DonePage = (props: Props) => {
  return (
    <AppFrame>
      {"Check you inbox and come to McDonald's to treat yourself to a"}
      <LinkButton href={"https://google.com"}> Order Online</LinkButton>
      <Link href="/">Record another message</Link>
      <Image src="/images/meal.png" alt="McFlurry" width={300} height={300} />
    </AppFrame>
  );
};

export default DonePage;
