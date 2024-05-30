import React, { useMemo } from "react";
import ImageCollage, {
  ImageCollageItem,
  useImageInPool,
  useImagePool,
} from "../ImageCollage";
import { familyImages } from "../FamilyImages";
import { mcdImages } from "../McdImages";

type Props = {};

const LandingCollageImageLayout = (props: Props) => {
  const combinedImages = useMemo(() => [...familyImages, ...mcdImages], []);
  const imgPool = useImagePool(combinedImages);

  const imgLeftTop = useImageInPool(
    imgPool,
    "McD_ST_Archival_Mandarin-2_RT.png",
  );
  const imgLeftMiddle = useImageInPool(imgPool, "mcd-images-2.jpg");
  const imgLeftBottom = useImageInPool(
    imgPool,
    "McD_ST_Archival_Hindi-3_RT.png",
  );

  const imgRightTop = useImageInPool(imgPool, "mcd-images-1.jpg");
  const imgRightMiddle = useImageInPool(
    imgPool,
    "McD_ST_Archival_Tagalog-3_RT.png",
  );
  const imgRightBottom = useImageInPool(imgPool, "mcd-images-3.jpg");

  return (
    <ImageCollage>
      {/* left items */}
      <ImageCollageItem
        width={22}
        left={-5}
        top={40}
        rotation={6}
        entrance="left"
      >
        {imgLeftMiddle}
      </ImageCollageItem>
      <ImageCollageItem
        width={15}
        left={2}
        top={8}
        rotation={-5}
        entrance="left"
      >
        {imgLeftTop}
      </ImageCollageItem>
      <ImageCollageItem
        width={18}
        left={-1}
        top={65}
        rotation={-4}
        entrance="left"
      >
        {imgLeftBottom}
      </ImageCollageItem>
      {/* right items */}
      <ImageCollageItem
        width={15}
        right={-2}
        top={8}
        rotation={-5}
        entrance="right"
      >
        {imgRightTop}
      </ImageCollageItem>

      <ImageCollageItem
        width={16}
        right={-4}
        top={50}
        rotation={6}
        entrance="right"
      >
        {imgRightBottom}
      </ImageCollageItem>
      <ImageCollageItem
        width={18}
        right={-2}
        top={30}
        rotation={-10}
        entrance="right"
      >
        {imgRightMiddle}
      </ImageCollageItem>
    </ImageCollage>
  );
};

export default LandingCollageImageLayout;
