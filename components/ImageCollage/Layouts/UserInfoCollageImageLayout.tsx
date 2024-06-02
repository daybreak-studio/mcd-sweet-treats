import React, { useMemo } from "react";
import ImageCollage, { ImageCollageItem } from "../ImageCollage";
import { useImageFromPool } from "@/components/ImagePool/ImagePoolProvider";

type Props = {};

const UserInfoCollageImageLayout = (props: Props) => {
  const imgLeftTop = useImageFromPool("user-info-left-top");
  const imgLeftBottom = useImageFromPool("user-info-left-bottom");
  const imgRightTop = useImageFromPool("user-info-right-top");
  const imgRightBottom = useImageFromPool("user-info-right-bottom");

  return (
    <ImageCollage>
      {/* left items */}
      {imgLeftBottom.isLoaded && (
        <ImageCollageItem
          width={28}
          left={-5}
          top={42}
          rotation={10}
          entrance="left"
        >
          {imgLeftBottom.img}
        </ImageCollageItem>
      )}
      {imgLeftTop.isLoaded && (
        <ImageCollageItem
          width={15}
          left={2}
          top={16}
          rotation={-5}
          entrance="left"
        >
          {imgLeftTop.img}
        </ImageCollageItem>
      )}
      {/* right items */}
      {imgRightTop.isLoaded && (
        <ImageCollageItem
          width={20}
          right={-2}
          top={20}
          rotation={2}
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
          rotation={10}
          entrance="right"
        >
          {imgRightBottom.img}
        </ImageCollageItem>
      )}
    </ImageCollage>
  );
};

export default UserInfoCollageImageLayout;
