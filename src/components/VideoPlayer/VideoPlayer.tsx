import useScrub from "@/hooks/useScrub";
import { useVideoSeeker } from "@/hooks/useVideoSeeker";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import {
  clamp,
  useAnimate,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React, { RefObject, useEffect, useRef, useState } from "react";
import PorgressBar from "./PorgressBar";

type Props = {
  src: string;
  className?: string;
  // the duration that roughly calculated by the video recording flow
  approximateDuration: number;
};

const VideoPlayer = ({ src, className = "", approximateDuration }: Props) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;

  const windowDim = useWindowDimension();
  const [duration, setDuration] = useState(approximateDuration);

  const [shouldPlay, setShouldPlay] = useState(true);
  // const seek = useVideoSeeker({ videoRef, isVideoReady: true });

  const scrubWidth = windowDim.width / 2;
  const pixelPerSec = scrubWidth / duration;

  const [containerRef, scrubOffset, scrubOffsetTarget, isScrubbing] = useScrub({
    maxDistance: scrubWidth,
    canUseMouseWheel: true,
  });

  useAnimationFrame(() => {
    if (isScrubbing) return;
    if (!videoRef.current) return;
    scrubOffsetTarget.set(-videoRef.current.currentTime * pixelPerSec);
  });

  useMotionValueEvent(scrubOffset, "change", (latest) => {
    if (!isScrubbing || !videoRef.current) return;
    videoRef.current.currentTime = -latest / pixelPerSec;
  });

  const currentTime = useTransform(
    scrubOffset,
    (latest) => duration * (-latest / scrubWidth),
  );

  // console.log(pixelPerSec * duration);
  // useMotionValueEvent(currentTime, "change", (latest) => console.log(latest));

  useEffect(() => {
    if (!shouldPlay || isScrubbing) {
      videoRef.current?.pause();
      return;
    }
    videoRef.current?.play();
  }, [shouldPlay, isScrubbing]);

  const handleDurationChange = () => {
    const d = videoRef.current?.duration;

    if (!d) return;
    if (d === Infinity) return;

    console.log(`duration change`, videoRef.current?.duration);
    setDuration(duration);
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <video
        // click to play/pause
        onClick={() => setShouldPlay(!shouldPlay)}
        className="h-full w-full object-contain xl:object-contain"
        playsInline
        autoPlay
        loop
        src={src}
        ref={videoRef}
        onDurationChange={handleDurationChange}
        // controls
      />
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
        <PorgressBar duration={duration} currentTime={currentTime} />
      </div>
    </div>
  );
};

export default VideoPlayer;
