import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

export function useVideoInfo(
  videoRef: RefObject<HTMLVideoElement> | MutableRefObject<HTMLVideoElement>,
) {
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // have enough info
    // Ready state
    // 0 - HAVE_NOTHING
    // 1 - HAVE_METADATA;
    // 2 - HAVE_CURRENT_DATA;
    // 3 - HAVE_FUTURE_DATA;
    // 4 - HAVE_ENOUGH_DATA;

    if (video.readyState > 0) {
      setDuration(video.duration);
      setIsVideoReady(true);
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsVideoReady(true);
      // console.log(`The video is ${video.duration} seconds long.`);
    };
    const handleDurationChange = () => {};

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("durationchange", handleDurationChange);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, [videoRef]);

  return { videoRef, duration, isVideoReady };
}
