import { motion } from "framer-motion";
import React, { useMemo } from "react";
import Image from "next/image";
import { AnimationConfig } from "../AnimationConfig";
import { useMediaQuery } from "usehooks-ts";
import { shuffleArray } from "@/util/shuffleArray";
import { familyImages } from "./FamilyImages";
import { mcdImages } from "./McdImages";
import { constrainDimensions } from "./contrainDimensions";

type Props = {};

interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

const ImageCollage = (props: Props) => {
  const shouldShowCollage = useMediaQuery("(min-width:1000px)", {
    initializeWithValue: false,
  });

  const shuffledFamilyImage = useShuffledImagePool(familyImages);
  const shuffledMcdImage = useShuffledImagePool(mcdImages);

  const shouldSwapMCDImage = useMemo(() => Math.random() >= 0.5, []);

  return (
    <>
      {shouldShowCollage && (
        <>
          <ImageItem width={30} left={-5} top={15} rotation={5} entrance="left">
            {shuffledFamilyImage[0]}
          </ImageItem>
          <ImageItem
            width={20}
            left={-5}
            top={50}
            rotation={-14}
            entrance="left"
          >
            {shouldSwapMCDImage ? shuffledMcdImage[0] : shuffledFamilyImage[1]}
          </ImageItem>
          <ImageItem
            width={20}
            right={-5}
            bottom={10}
            rotation={-4}
            entrance="right"
          >
            {shouldSwapMCDImage ? shuffledFamilyImage[1] : shuffledMcdImage[0]}
          </ImageItem>
        </>
      )}
    </>
  );
};

const ImageItem = ({
  children,
  left,
  top,
  bottom,
  width,
  right,
  rotation = 0,
  entrance,
}: {
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
  width: number;
  rotation?: number;
  children: React.ReactNode;
  entrance: "left" | "right";
}) => {
  const animDirection = entrance === "left" ? -1 : 1;
  const shouldMoveAway = useMediaQuery("(max-width:1200px)", {
    initializeWithValue: false,
  });

  return (
    <motion.div
      style={{
        width: `${width}vw`,
        minWidth: `${width}rem`,
        top: top ? `${top}vh` : "auto",
        right: right ? `${right}vw` : "auto",
        bottom: bottom ? `${bottom}vh` : "auto",
        left: left ? `${left}vw` : "auto",
        marginLeft: left ? (shouldMoveAway ? `${1.4 * left}rem` : 0) : 0,
        marginRight: right ? (shouldMoveAway ? `${1.4 * right}rem` : 0) : 0,
      }}
      initial={{
        x: `${40 * animDirection}vw`,
        rotate: rotation * 8,
        y: -40 * rotation,
      }}
      animate={{
        rotate: rotation,
        x: 0,
        y: 0,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      }}
      exit={{
        x: `${40 * animDirection}vw`,
        rotate: rotation * 8,
        y: -40 * rotation,
      }}
      className="fixed z-50 flex origin-center flex-row"
    >
      <motion.div
        drag={true}
        whileDrag={{ scale: 1.2 }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="h-full w-full cursor-grab shadow-md shadow-[rgba(0,0,0,.2)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

function useShuffledImagePool(srcList: ImageInfo[]) {
  const ALlImages = useMemo(() => {
    return shuffleArray(
      srcList.map(({ src, width, height }, index) => {
        const constrainedSize = constrainDimensions(width, height, 200);

        return (
          <Image
            key={index}
            src={src}
            width={constrainedSize.width}
            height={constrainedSize.height}
            alt=""
            className="pointer-events-none w-full"
          />
        );
      }),
    );
  }, []);

  return ALlImages;
}

export default ImageCollage;
