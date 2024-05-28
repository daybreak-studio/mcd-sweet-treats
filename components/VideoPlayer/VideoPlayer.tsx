import useScrub from "../../hooks/useScrub";
import { useVideoSeeker } from "../../hooks/useVideoSeeker";
import { useWindowDimension } from "../../hooks/useWindowDimension";
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
import { useVideoInfo } from "./useVideoInfo";

type Props = {
  src: string;
  className?: string;
  // the duration that roughly calculated by the video recording flow
  approximateDuration?: number;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  onReady?: () => void;
  autoPlay?: boolean;
};

const VideoPlayer = ({
  src,
  className = "",
  approximateDuration,
  onScrubEnd,
  onScrubStart,
  onReady,
  autoPlay,
}: Props) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;

  const { isVideoReady, duration: accurateDuration } = useVideoInfo(videoRef);
  useEffect(() => {
    if (isVideoReady) onReady?.();
  }, [isVideoReady, onReady]);

  const duration = useMemo(() => {
    if (
      accurateDuration &&
      !isNaN(accurateDuration) &&
      accurateDuration !== Infinity &&
      accurateDuration !== 0
    ) {
      return accurateDuration;
    }
    return approximateDuration || 0;
  }, [accurateDuration, approximateDuration]);

  const windowDim = useWindowDimension();
  const videoWidth = useMemo(() => {
    if (!videoRef.current) return windowDim.width;
    return videoRef.current.getBoundingClientRect().width;
  }, [windowDim.width]);

  const [shouldPlay, setShouldPlay] = useState(autoPlay);
  const [hasPlayedSucecssfully, setHasPlayedSuccessfully] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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

  const currentTime = useTransform(scrubOffset, (latest) => {
    const t = duration * (-latest / scrubWidth);
    return t;
  });

  useEffect(() => {
    if (isScrubbing && hasScrubbed) {
      onScrubStart?.();
    }
  }, [isScrubbing, hasScrubbed]);

  useEffect(() => {
    if (!isScrubbing) onScrubEnd?.();
  }, [isScrubbing]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!shouldPlay || isScrubbing) {
      videoRef.current.pause();
      return;
    }

    // enter pause state if the browser rejects playing initially
    videoRef.current
      .play()
      .then(() => {
        setHasPlayedSuccessfully(true);
      })
      .catch(() => {
        setShouldPlay(false);
      });
  }, [shouldPlay, isScrubbing]);

  useEffect(() => {
    if (hasPlayedSucecssfully || isScrubbing) {
      setHasInteracted(true);
    }
  }, [hasPlayedSucecssfully, isScrubbing]);

  return (
    <div className={`${className} relative touch-pan-y`} ref={containerRef}>
      <motion.video
        // click to play/pause
        onClickCapture={() => !hasScrubbed && setShouldPlay(!shouldPlay)}
        className="h-full object-cover"
        playsInline
        autoPlay={autoPlay}
        loop
        src={src}
        ref={videoRef}
        animate={{
          opacity: shouldPlay ? 1 : 0.9,
        }}
        disableRemotePlayback
        // controls
      />
      <PlayIcon
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 scale-150"
        style={{
          visibility: !shouldPlay && !isScrubbing ? "visible" : "hidden",
        }}
      />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: hasInteracted ? 1 : 0,
        }}
        className="pointer-events-none absolute bottom-12 left-0 right-0 z-20 mx-auto flex max-w-72 justify-center"
      >
        <PorgressBar
          duration={duration}
          currentTime={currentTime}
          isActive={isScrubbing && hasScrubbed}
        />
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
