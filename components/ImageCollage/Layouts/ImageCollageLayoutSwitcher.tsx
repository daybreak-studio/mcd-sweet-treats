import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import LandingCollageImageLayout from "./LandingCollageImageLayout";
import LanguageCollageImageLayout from "./LanguageCollageImageLayout";
import UserInfoCollageImageLayout from "./UserInfoCollageImageLayout";

type Props = {};

const ImageCollageLayoutSwitcher = (props: Props) => {
  const path = usePathname();
  return (
    <AnimatePresence mode="wait">
      {path === "/" && <LandingCollageImageLayout key="landing" />}
      {path === "/get-started" && <LandingCollageImageLayout key="landing" />}
      {path === "/language" && <LanguageCollageImageLayout key="landing" />}
      {path === "/user-info" && <UserInfoCollageImageLayout key="landing" />}
      {path === "/uploading" && <UserInfoCollageImageLayout key="landing" />}
    </AnimatePresence>
  );
};

export default ImageCollageLayoutSwitcher;
