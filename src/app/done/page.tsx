import AppFrame from "@/components/AppFrame/AppFrame";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import React from "react";

type Props = {};

const DonePage = (props: Props) => {
  return (
    <AppFrame>
      {"Check you inbox and come to McDonald's to treat yourself to a"}
      <LinkButton href={"https://google.com"}> Order Online</LinkButton>
      <Link href="/">Record another message</Link>
    </AppFrame>
  );
};

export default DonePage;
