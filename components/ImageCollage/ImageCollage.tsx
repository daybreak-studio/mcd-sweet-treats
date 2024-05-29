import { motion } from "framer-motion";
import React, { useMemo } from "react";
import Image from "next/image";
import { AnimationConfig } from "../AnimationConfig";
import { useMediaQuery } from "usehooks-ts";
import { shuffleArray } from "@/util/shuffleArray";

type Props = {};

interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

const familyImages = [
  // left
  {
    src: "/collage/MCWK664X24I_Sweet_Treat_GrandmaDisposables_CAR_IG_FB_1080x1080_FR_RT.png",
    width: 1080,
    height: 1080,
  },
  {
    src: "/collage/MCWK680X24I_Sweet_Treat_GrandmaDisposables_KISS_IG_FB_1080x1080_FR_RT.png",
    width: 1080,
    height: 1080,
  },
  {
    src: "/collage/MCWK679X24I_Sweet_Treat_GrandmaDisposables_GARDEN_IG_FB_1080x1080_FR_RT.png",
    width: 1080,
    height: 1080,
  },
];

const mcdImages = [
  {
    src: "/collage/mcd-images-1.jpg",
    width: 1080,
    height: 1080,
  },
  {
    src: "/collage/mcd-images-2.jpg",
    width: 1080,
    height: 1080,
  },
  {
    src: "/collage/mcd-images-2.jpg",
    width: 1080,
    height: 1080,
  },
];

const ImageCollage = (props: Props) => {
  const shouldShowCollage = useMediaQuery("(min-width:800px)", {
    initializeWithValue: false,
  });

  const shuffledFamilyImage = useShuffledImagePool(familyImages);
  const shuffledMcdImage = useShuffledImagePool(mcdImages);

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
            rotation={-10}
            entrance="left"
          >
            {shuffledMcdImage[0]}
          </ImageItem>
          <ImageItem
            width={20}
            right={-5}
            bottom={10}
            rotation={-7}
            entrance="right"
          >
            {shuffledFamilyImage[1]}
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

  return (
    <motion.div
      style={{
        maxWidth: `${width}vw`,
        minWidth: `${width * 1}rem`,
        top: top ? `${top}vh` : "auto",
        right: right ? `${right}vw` : "auto",
        bottom: bottom ? `${bottom}vh` : "auto",
        left: left ? `${left}vw` : "auto",
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
      className="fixed z-50 flex flex-row"
    >
      <motion.div
        drag={true}
        whileDrag={{ scale: 1.2 }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="cursor-grab shadow-md shadow-[rgba(0,0,0,.2)]"
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
        return (
          <Image
            key={index}
            src={src}
            width={width}
            height={height}
            alt=""
            className="pointer-events-none"
          />
        );
      }),
    );
  }, []);

  return ALlImages;
}

export default ImageCollage;
