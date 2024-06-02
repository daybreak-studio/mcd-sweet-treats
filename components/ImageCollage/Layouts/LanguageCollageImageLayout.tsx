import React, { useMemo } from "react";
import ImageCollage, { ImageCollageItem } from "../ImageCollage";
import { useImageFromPool } from "@/components/ImagePool/ImagePoolProvider";

type Props = {};

const LanguageCollageImageLayout = (props: Props) => {
  const imgLeftTop = useImageFromPool("language-left-top");
  const imgLeftMiddle = useImageFromPool("language-left-middle");
  const imgLeftBottom = useImageFromPool("language-left-bottom");
  const imgRightTop = useImageFromPool("language-right-top");
  const imgRightBottom = useImageFromPool("language-right-bottom");

  return (
    <ImageCollage>
      {/* left items */}
      {imgLeftMiddle.isLoaded && (
        <ImageCollageItem
          width={22}
          left={-5}
          top={40}
          rotation={6}
          entrance="left"
        >
          {imgLeftMiddle.isLoaded}
        </ImageCollageItem>
      )}
      {imgLeftTop.isLoaded && (
        <ImageCollageItem
          width={15}
          left={2}
          top={8}
          rotation={-5}
          entrance="left"
        >
          {imgLeftTop.img}
        </ImageCollageItem>
      )}
      {imgLeftBottom.isLoaded && (
        <ImageCollageItem
          width={18}
          left={-1}
          top={65}
          rotation={-4}
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
    </ImageCollage>
  );
};

export default LanguageCollageImageLayout;
