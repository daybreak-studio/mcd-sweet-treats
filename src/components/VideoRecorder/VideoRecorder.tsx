"use client";

import React, { useMemo } from "react";
import { useUserInfo } from "../UserInfoProvider/UserInfoProvider";
import { useState, useEffect } from "react";
import { useVideoRecording } from "./useVideoRecording";
import { useBodySegmentation } from "./useBodySegmentation";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDynamicDOMRef } from "@/hooks/useDynamicDOMRef";
import Button from "../Button/Button";
import RecordButton from "../RecordButton/RecordButton";

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
  const [videoRef, videoElm] = useDynamicDOMRef<HTMLVideoElement>();
  const [canvasRef, canvasElm] = useDynamicDOMRef<HTMLCanvasElement>();

  const [recorderState, setRecorderState] = useState<RecorderStates>(
    RecorderStates.INITIAL,
  );

  // for writing to the global state
  const { videoBlob, setVideoBlob } = useUserInfo();

  const recorder = useVideoRecording(canvasElm);
  useBodySegmentation(videoElm, canvasElm);

  const { startTimer, finishTimer, remainingTime, resetTimer, hasFinished } =
    useCountdownTimer(MAX_DURATION, 60);

  // Put the video stream on screen
  useEffect(() => {
    if (videoElm && recorder.videoStream) {
      videoElm.srcObject = recorder.videoStream;
      videoElm.play().catch(console.error);
    }
  }, [recorder.videoStream, videoElm]);

  // when there is data loaded, add to the user data
  useEffect(() => {
    setVideoBlob(recorder.recordedBlobData);
  }, [recorder.recordedBlobData, setVideoBlob]);

  // control flow for starting a recording
  const startRecording = () => {
    const success = recorder.startRecording();
    if (!success) {
      console.log("Cannot start recording");
      return;
    }
    setRecorderState(RecorderStates.RECORDING);
    startTimer();
  };

  // control flow for stopping a recording
  const stopRecording = () => {
    const success = recorder.stopRecording();
    if (!success) {
      console.log("Cannot stop recording");
      return;
    }
    setRecorderState(RecorderStates.RECORDED);
    finishTimer();
  };

  // reset the ui to the beginning
  const restartRecording = () => {
    setRecorderState(RecorderStates.INITIAL);
    resetTimer();
  };

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
      stopRecording();
      return;
    }
  };

  // stop recording when the timer reach zero
  useEffect(() => {
    if (hasFinished) stopRecording();
  }, [hasFinished]);

  return (
    <>
      {(recorderState === RecorderStates.INITIAL ||
        recorderState === RecorderStates.RECORDING) && (
        <>
          <div>
            <video ref={videoRef} autoPlay playsInline hidden />
            <canvas
              ref={canvasRef}
              className="absolute left-0 top-0 z-10 h-[100svh] w-full object-cover xl:object-contain"
            />
          </div>
          <div className="relative z-30 mb-24 mt-auto flex flex-col items-center">
            <div className="font-sans-base mb-2 text-light">
              {Math.round(remainingTime)}
            </div>
            <RecordButton
              maxDuration={MAX_DURATION}
              currentTime={remainingTime}
              isRecording={recorderState === RecorderStates.RECORDING}
              onClick={handleRecordButtonClick}
            />
          </div>
        </>
      )}

      {/* display the recording when the user has something recorded */}
      {recorderState === RecorderStates.RECORDED && (
        <>
          <div className="z-10 mb-12 flex flex-row">
            <button
              className="font-serif-md rounded-full px-12 py-6"
              onClick={restartRecording}
            >
              <h5 className="font-serif-md text-light">Redo</h5>
            </button>
            <button
              className="font-serif-md rounded-full bg-pink-200 px-12 py-6"
              onClick={() => videoBlob && onCompleteRecording(videoBlob)}
            >
              Done
            </button>
          </div>
          <video
            className="absolute inset-0 h-[100svh] w-full object-cover xl:object-contain"
            playsInline
            autoPlay
            loop
            src={recordedURLObject ? recordedURLObject : ""}
            controls
          />
        </>
      )}
    </>
  );
};

export default VideoRecorder;
