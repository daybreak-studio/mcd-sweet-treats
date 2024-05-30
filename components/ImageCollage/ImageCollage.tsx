import { motion } from "framer-motion";
import React, { MutableRefObject, useMemo, useRef } from "react";
import Image from "next/image";
import { AnimationConfig } from "../AnimationConfig";
import { useMediaQuery, useResizeObserver } from "usehooks-ts";
import { shuffleArray } from "@/util/shuffleArray";
import { constrainDimensions } from "../../util/contrainDimensions";
import { useWindowDimension } from "@/hooks/useWindowDimension";

type Props = {
  children: React.ReactNode;
};

interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

const ImageCollage = ({ children }: Props) => {
  const shouldShowCollage = useMediaQuery("(min-width:1200px)", {
    initializeWithValue: false,
  });

  return <>{shouldShowCollage && children}</>;
};

export const ImageCollageItem = ({
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
  const shouldMoveAway = useMediaQuery("(max-width:1500px)", {
    initializeWithValue: false,
  });
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const windowDim = useWindowDimension();
  const { width: elmWidth = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const shouldHide = windowDim.width / elmWidth < 3;

  const rightValue = right
    ? `${shouldMoveAway ? right - width * 0.5 : right}rem`
    : "auto";
  const leftValue = left
    ? `${shouldMoveAway ? left - width * 0.5 : left}rem`
    : "auto";

  return (
    <>
      {!shouldHide ? (
        <motion.div
          ref={ref}
          style={{
            width: `${width * 1.8}vh`,
            // width: `${width}rem`,
            minWidth: `${width}rem`,
            maxHeight: `${width}rem`,
            top: top ? `${top}vh` : "auto",

            bottom: bottom ? `${bottom}vh` : "auto",

            // marginLeft: left ? (shouldMoveAway ? `${1.4 * left}rem` : 0) : 0,
            // marginRight: right ? (shouldMoveAway ? `${1.4 * right}rem` : 0) : 0,
          }}
          initial={{
            x: `${40 * animDirection}vw`,
            rotate: rotation - 20,
            y: 0,
            right: rightValue,
            left: leftValue,
          }}
          animate={{
            rotate: rotation,
            x: 0,
            y: 0,
            right: rightValue,
            left: leftValue,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING,
            },
          }}
          exit={{
            x: `${40 * animDirection}vw`,
            rotate: rotation * 4,
            y: 0,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_INVERTED,
            },
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
      ) : null}
    </>
  );
};

export function useShuffledImagePool(srcList: ImageInfo[]) {
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
