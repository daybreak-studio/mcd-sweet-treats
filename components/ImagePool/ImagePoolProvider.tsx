import React, {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

const ImagePoolContext = createContext<ReturnType<typeof useNextImageList>>({
  allImages: [],
  loadedList: {},
});

const useNextImageList = ({ srcList, constraint }: Props) => {
  const [loadedList, setLoadedList] = useState<{ [key: string]: boolean }>({});
  const allImages = useMemo(
    () =>
      srcList.map(({ src, width, height }, index) => {
        const handleLoad = () =>
          setLoadedList((prev) => {
            prev[src] = true;
            return { ...prev };
          });
        // default constained width is 200
        const constrainedSize = constrainDimensions(
          width,
          height,
          constraint.width,
          constraint.height,
        );
        return (
          <Image
            onLoad={handleLoad}
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

  return { allImages, loadedList };
};

export function useImageFromPool(srcIncludes: string) {
  const pool = useContext(ImagePoolContext);
  const imgElm = useMemo(
    () => pool.allImages.find((image) => image.props.src.includes(srcIncludes)),
    [pool, srcIncludes],
  );

  const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
  const isLoaded = useMemo(
    () => pool.loadedList[imgElm?.props.src],
    [imgElm?.props.src, pool.loadedList],
  );

  return {
    img: React.cloneElement(imgElm as React.JSX.Element, { ref: imgRef }),
    isLoaded,
  };
}

const ImagePoolProvider = (props: Props) => {
  const imgList = useNextImageList(props);

  return (
    <ImagePoolContext.Provider value={imgList}>
      {props.children}
    </ImagePoolContext.Provider>
  );
};

export default ImagePoolProvider;
