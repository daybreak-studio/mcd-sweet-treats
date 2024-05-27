import useScrub from "@/hooks/useScrub";
import { useVideoSeeker } from "@/hooks/useVideoSeeker";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import {
  clamp,
  motion,
  useAnimate,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";
import PorgressBar from "./PorgressBar";
import PlayIcon from "./play.svg";

type Props = {
  src: string;
  className?: string;
  // the duration that roughly calculated by the video recording flow
  approximateDuration: number;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
};

const VideoPlayer = ({
  src,
  className = "",
  approximateDuration,
  onScrubEnd,
  onScrubStart,
}: Props) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;

  const windowDim = useWindowDimension();
  const [duration, setDuration] = useState(approximateDuration);

  const videoWidth = useMemo(() => {
    if (!videoRef.current) return windowDim.width;
    return videoRef.current.getBoundingClientRect().width;
  }, [windowDim.width]);

  const [shouldPlay, setShouldPlay] = useState(true);
  const seek = useVideoSeeker({ videoRef, isVideoReady: true });

  const scrubWidth = videoWidth / 2;
  const pixelPerSec = scrubWidth / duration;

  const {
    containerRef,
    current: scrubOffset,
    target: scrubOffsetTarget,
    isScrubbing,
    hasScrubbed,
  } = useScrub({
    maxDistance: scrubWidth,
    inverseGesture: true,
    canUseMouseWheel: true,
    responsiveness: 0.5,
  });

  useAnimationFrame(() => {
    if (isScrubbing) return;
    if (!videoRef.current) return;
    scrubOffsetTarget.set(-videoRef.current.currentTime * pixelPerSec);
  });

  useMotionValueEvent(scrubOffset, "change", (latest) => {
    if (!isScrubbing || !videoRef.current) return;
    // videoRef.current.currentTime = -latest / pixelPerSec;
    seek(-latest / pixelPerSec);
  });

  const currentTime = useTransform(
    scrubOffset,
    (latest) => duration * (-latest / scrubWidth),
  );

  useEffect(() => {
    if (isScrubbing && hasScrubbed) {
      onScrubStart?.();
    }
  }, [isScrubbing, hasScrubbed]);

  useEffect(() => {
    if (!isScrubbing) onScrubEnd?.();
  }, [isScrubbing]);

  // console.log(pixelPerSec * duration);
  // useMotionValueEvent(currentTime, "change", (latest) => console.log(latest));

  useEffect(() => {
    if (!shouldPlay || isScrubbing) {
      videoRef.current?.pause();
      return;
    }
    // enter pause state if the browser rejects playing initially
    videoRef.current?.play().catch(() => setShouldPlay(false));
  }, [shouldPlay, isScrubbing]);

  const handleDurationChange = () => {
    const d = videoRef.current?.duration;

    if (!d) return;
    if (d === Infinity) return;

    console.log(`duration change`, videoRef.current?.duration);
    setDuration(videoRef.current?.duration);
  };

  return (
    <div className={`${className} touch-none`} ref={containerRef}>
      <motion.video
        // click to play/pause
        onClickCapture={() => !hasScrubbed && setShouldPlay(!shouldPlay)}
        className="h-full w-full object-cover"
        playsInline
        autoPlay
        loop
        src={src}
        ref={videoRef}
        onDurationChange={handleDurationChange}
        animate={{
          opacity: shouldPlay ? 1 : 0.9,
        }}
        // controls
      />
      <PlayIcon
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 scale-150"
        style={{
          visibility: !shouldPlay && !isScrubbing ? "visible" : "hidden",
        }}
      />
      <div className="pointer-events-none absolute bottom-12 left-0 right-0 z-20 mx-auto flex max-w-72 justify-center">
        <PorgressBar
          duration={duration}
          currentTime={currentTime}
          isActive={isScrubbing && hasScrubbed}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
