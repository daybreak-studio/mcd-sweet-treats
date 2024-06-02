import React, { useMemo } from "react";
import ImageCollage, { ImageCollageItem } from "../ImageCollage";
import { useImageFromPool } from "@/components/ImagePool/ImagePoolProvider";

type Props = {};

const LandingCollageImageLayout = (props: Props) => {
  const imgLeftTop = useImageFromPool("landing-left-top");
  const imgLeftMiddle = useImageFromPool("landing-left-middle");
  const imgLeftBottom = useImageFromPool("landing-left-bottom");
  const imgRightTop = useImageFromPool("landing-right-top");
  const imgRightMiddle = useImageFromPool("landing-right-middle");
  const imgRightBottom = useImageFromPool("landing-right-bottom");

  return (
    <ImageCollage>
      {/* left items */}
      {imgLeftMiddle.isLoaded && (
        <ImageCollageItem
          width={25}
          left={-5}
          top={40}
          rotation={8}
          entrance="left"
        >
          {imgLeftMiddle.img}
        </ImageCollageItem>
      )}
      {imgLeftTop.isLoaded && (
        <ImageCollageItem
          width={15}
          left={2}
          top={8}
          rotation={-3}
          entrance="left"
        >
          {imgLeftTop.img}
        </ImageCollageItem>
      )}
      {imgLeftBottom.isLoaded && (
        <ImageCollageItem
          width={18}
          left={-1}
          top={64}
          rotation={-10}
          entrance="left"
        >
          {imgLeftBottom.img}
        </ImageCollageItem>
      )}
      {/* right items */}
      {imgRightTop.isLoaded && (
        <ImageCollageItem
          width={15}
          right={-2}
          top={8}
          rotation={-5}
          entrance="right"
        >
          {imgRightTop.img}
        </ImageCollageItem>
      )}

      {imgRightBottom.isLoaded && (
        <ImageCollageItem
          width={16}
          right={-4}
          top={50}
          rotation={6}
          entrance="right"
        >
          {imgRightBottom.img}
        </ImageCollageItem>
      )}
      {imgRightMiddle.isLoaded && (
        <ImageCollageItem
          width={18}
          right={-2}
          top={35}
          rotation={-10}
          entrance="right"
        >
          {imgRightMiddle.img}
        </ImageCollageItem>
      )}
    </ImageCollage>
  );
};

export default LandingCollageImageLayout;
