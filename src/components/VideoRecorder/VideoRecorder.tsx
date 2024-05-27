"use client";

import React, { useCallback, useMemo } from "react";
import { useUserInfo } from "../UserInfoProvider/UserInfoProvider";
import { useState, useEffect } from "react";
import { useVideoRecording } from "./hooks/useVideoRecording";
import { useBodySegmentation } from "./hooks/useBodySegmentation";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDynamicDOMRef } from "@/hooks/useDynamicDOMRef";
import Button from "../Button/Button";
import RecordButton from "../RecordButton/RecordButton";

import DoneSVG from "./done.svg";
import RedoSVG from "./redo.svg";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useAVPermission } from "./hooks/useAVPermission";

type Props = {
  onCompleteRecording: (blob: Blob) => void;
};
const MAX_DURATION = 30; // Max video recording length

enum RecorderStates {
  INITIAL = "INITIAL",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const VideoRecorder = ({ onCompleteRecording }: Props) => {
  const { hasUserGrantedPermissions, requestPermission } = useAVPermission();

  const [videoRef, videoElm] = useDynamicDOMRef<HTMLVideoElement>();
  const [canvasRef, canvasElm] = useDynamicDOMRef<HTMLCanvasElement>();

  const [recorderState, setRecorderState] = useState<RecorderStates>(
    RecorderStates.INITIAL,
  );
  const [shouldShowNavButtons, setShouldShowNavButtons] = useState(true);

  // for writing to the global state
  const { videoBlob, setVideoBlob } = useUserInfo();

  const recorder = useVideoRecording(
    canvasElm,
    videoElm,
    hasUserGrantedPermissions,
  );
  const isVideoFeedReady = useBodySegmentation(
    videoElm,
    canvasElm,
    recorder.isMediaRecorderReady,
  );
  const isCameraExperienceReady = isVideoFeedReady && hasUserGrantedPermissions;

  const { startTimer, finishTimer, remainingTime, resetTimer, hasFinished } =
    useCountdownTimer(MAX_DURATION, 60);

  const [approximateVideoDuration, setApproimateVideoDuration] = useState(0);

  // when there is data loaded, add to the user data
  useEffect(() => {
    // Move the blob data from recorded blob to the storage to reduce memory usage
    setVideoBlob(recorder.recordedBlobData);
  }, [recorder.recordedBlobData, setVideoBlob]);

  // control flow for starting a recording
  const startRecording = useCallback(() => {
    console.log("start recording");
    const success = recorder.startRecording();
    if (!success) {
      console.log("Cannot start recording");
      return;
    }
    setRecorderState(RecorderStates.RECORDING);
    startTimer();
  }, [recorder, startTimer]);

  // control flow for stopping a recording
  const stopRecording = useCallback(() => {
    const success = recorder.stopRecording();
    if (!success) {
      console.log("Cannot stop recording");
      return;
    }
    setRecorderState(RecorderStates.RECORDED);
    setApproimateVideoDuration(MAX_DURATION - remainingTime);
    resetTimer();
  }, [recorder, resetTimer, remainingTime]);

  // reset the ui to the beginning
  const restartRecording = useCallback(() => {
    // remove the junk to create reduce memory usage
    recorder.clearRecordedBlobData();
    setRecorderState(RecorderStates.INITIAL);
    resetTimer();
  }, [recorder, resetTimer]);

  const recordedURLObject = useMemo(
    () => videoBlob && URL.createObjectURL(videoBlob),
    [videoBlob],
  );

  const handleRecordButtonClick = () => {
    if (recorderState === RecorderStates.INITIAL) {
      startRecording();
      return;
    }
    if (recorderState === RecorderStates.RECORDING) {
      finishTimer();
      return;
    }
  };

  // stop recording when the timer reach zero
  useEffect(() => {
    if (hasFinished && recorder.isRecording) {
      stopRecording();
    }
  }, [hasFinished, stopRecording, recorder.isRecording]);

  // handling permission rejection or refreshing video feed
  useEffect(() => {
    if (hasUserGrantedPermissions && isVideoFeedReady) {
      return;
    }

    // stop recording if the user aborted the permission
    if (recorder.isRecording) {
      stopRecording();
      setRecorderState(RecorderStates.INITIAL);
    }
  }, [
    recorder.isRecording,
    hasUserGrantedPermissions,
    isVideoFeedReady,
    stopRecording,
  ]);

  return (
    <div className="fixed inset-0 flex h-svh">
      <div className="relative m-auto flex  h-full max-h-full w-full max-w-full items-center justify-center border-[1rem] border-accent bg-black sm:aspect-[9/16] sm:h-[90vh] sm:w-auto">
        <AnimatePresence mode={"wait"}>
          {(recorderState === RecorderStates.INITIAL ||
            recorderState === RecorderStates.RECORDING) && (
            <React.Fragment key={"initial"}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isVideoFeedReady ? 1 : 0,
                  transition: {
                    duration: AnimationConfig.SLOW,
                  },
                }}
                exit={{
                  opacity: 0,
                  transition: {
                    duration: AnimationConfig.NORMAL,
                  },
                }}
                className="absolute inset-0 z-10"
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  hidden
                  muted
                  className="hidden"
                />
                <canvas
                  ref={canvasRef}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isCameraExperienceReady ? 0 : 1,
                }}
                className="font-sans-sm absolute inset-0 z-30 mx-auto flex max-w-[26ch] items-center justify-center text-center text-light"
              >
                {!hasUserGrantedPermissions ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isCameraExperienceReady ? 0 : 1,
                      pointerEvents: isCameraExperienceReady ? "none" : "all",
                      transition: {
                        delay: isCameraExperienceReady ? 0 : 1,
                      },
                    }}
                    className="flex flex-col items-center gap-4"
                  >
                    <p>
                      To provide you with the best experience, we need access to
                      your camera and microphone for recording.
                    </p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isCameraExperienceReady ? 0 : 1,
                        pointerEvents: isCameraExperienceReady ? "none" : "all",
                        transition: {
                          delay: isCameraExperienceReady ? 0 : 3,
                        },
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => requestPermission()}
                      className="rounded-full bg-light bg-opacity-[.15] px-4 py-2 text-light"
                    >
                      Grant Access
                    </motion.button>
                  </motion.div>
                ) : (
                  ""
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9,
                  transition: {
                    duration: AnimationConfig.FAST,
                    ease: AnimationConfig.EASING,
                  },
                }}
                className="relative z-30 mb-16 mt-auto flex flex-col items-center"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: isCameraExperienceReady ? 1 : 0,
                    y: isCameraExperienceReady ? 0 : 10,
                    transition: {
                      duration: AnimationConfig.NORMAL,
                      ease: AnimationConfig.EASING,
                      delay: isVideoFeedReady ? AnimationConfig.FAST : 0,
                    },
                  }}
                  className="font-sans-base mb-2 select-none text-light"
                >
                  {Math.round(remainingTime)}
                </motion.div>
                <RecordButton
                  maxDuration={MAX_DURATION}
                  currentTime={remainingTime}
                  isRecording={recorderState === RecorderStates.RECORDING}
                  onClick={handleRecordButtonClick}
                  isLoading={!isCameraExperienceReady}
                />
              </motion.div>
            </React.Fragment>
          )}

          {/* display the recording when the user has something recorded */}
          {recorderState === RecorderStates.RECORDED && (
            <React.Fragment key={"recorded"}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 30,
                  transition: {
                    duration: AnimationConfig.NORMAL,
                    ease: AnimationConfig.EASING,
                  },
                }}
                className="absolute bottom-0 left-0 right-0 z-10 mb-24"
              >
                <motion.div
                  className="flex flex-row justify-center gap-4"
                  animate={{
                    y: shouldShowNavButtons ? 0 : 30,
                    transition: {
                      duration: AnimationConfig.NORMAL,
                      ease: AnimationConfig.EASING,
                    },
                  }}
                >
                  <Button
                    isVisible={shouldShowNavButtons}
                    onClick={restartRecording}
                    secondary
                    inverted
                  >
                    <RedoSVG />
                    Redo
                  </Button>
                  <Button
                    isVisible={shouldShowNavButtons}
                    onClick={() => videoBlob && onCompleteRecording(videoBlob)}
                    inverted
                  >
                    <DoneSVG />
                    Done
                  </Button>
                </motion.div>
              </motion.div>
              <VideoPlayer
                src={recordedURLObject ? recordedURLObject : ""}
                className="h-full w-full"
                approximateDuration={approximateVideoDuration}
                onScrubEnd={() => setShouldShowNavButtons(true)}
                onScrubStart={() => setShouldShowNavButtons(false)}
              />
            </React.Fragment>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoRecorder;
