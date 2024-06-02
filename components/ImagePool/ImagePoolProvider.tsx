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
  const imgElm = useMemo(
    () => pool.find((image) => image.props.src.includes(srcIncludes)),
    [pool, srcIncludes],
  );

  const imgRef = useRef() as MutableRefObject<HTMLImageElement>;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!imgRef.current) return;
    const img = imgRef.current;

    if (img.complete) {
      setIsLoaded(true);
      return;
    }

    const handleLoad = () => {
      setIsLoaded(true);
    };
    img.addEventListener("load", handleLoad);
    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, [imgRef]);

  return {
    img: React.cloneElement(imgElm as React.JSX.Element, { ref: imgRef }),
    isLoaded,
  };
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
