import React, { createContext, useContext, useMemo } from "react";
import Image from "next/image";
import { constrainDimensions } from "@/util/contrainDimensions";

interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

type Props = {
  children: React.ReactNode;
  srcList: ImageInfo[];
  constraint: {
    width: number;
    height?: number;
  };
};

const ImagePoolContext = createContext<ReturnType<typeof useNextImageList>>([]);

const useNextImageList = ({ srcList, constraint }: Props) => {
  const allImages = useMemo(
    () =>
      srcList.map(({ src, width, height }, index) => {
        // default constained width is 200
        const constrainedSize = constrainDimensions(
          width,
          height,
          constraint.width,
          constraint.height,
        );
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
    [],
  );

  return allImages;
};

export function useImageFromPool(srcIncludes: string) {
  const pool = useContext(ImagePoolContext);
  return useMemo(
    () => pool.find((image) => image.props.src.includes(srcIncludes)),
    [pool, srcIncludes],
  );
}

const ImagePoolProvider = (props: Props) => {
  const allImages = useNextImageList(props);

  return (
    <ImagePoolContext.Provider value={allImages}>
      {props.children}
    </ImagePoolContext.Provider>
  );
};

export default ImagePoolProvider;
