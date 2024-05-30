import { AnimWrap } from "@/components/AnimWrap";
import AppFrame from "@/components/AppFrame/AppFrame";
import BottomBanner from "@/components/Banner/BottomBanner";
import LinkButton from "@/components/Button/LinkButton";
import SwirlGraphicBottom from "@/components/Graphics/SwirlGraphicBottom";
import SwirlGraphicTop from "@/components/Graphics/SwirlGraphicTop";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import { motion } from "framer-motion";

export default function RulesPage() {
  return (
    <AppFrame>
      <LogoLockup />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={AnimWrap.AnimParentA}
        className="relative my-8 flex flex-grow flex-col items-center justify-center text-center"
      >
        <SwirlGraphicTop className="relative left-4 mb-6 block md:hidden" />
        <motion.h1
          variants={AnimWrap.bounceUpA}
          className="font-serif-xl mb-2 w-8/12 text-center md:font-serif-xl xl:font-serif-2xl"
        >
          Be good for <br /> Grandma
        </motion.h1>
        <motion.div
          variants={{
            hidden: { rotate: 10, y: 48, opacity: 0 },
            visible: { y: 0, rotate: 0, opacity: 1 },
          }}
          className="font-serif-sm max-w-[26ch] origin-top-left md:font-serif-md md:mb-16 md:max-w-[34ch]"
        >
          {
            "Like grandma says, if you don't have anything nice to say, don't say anything at all."
          }
        </motion.div>
        <SwirlGraphicBottom className="relative -left-16 -top-16 block md:hidden" />
        <LinkButton href={"/language"}>{"I promise"}</LinkButton>
      </motion.div>

      <BottomBanner>
        {
          "McDonald’s reserves the right to not render videos that contain offensive items."
        }
      </BottomBanner>
    </AppFrame>
  );
}
