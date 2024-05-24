"use client";

import React, { useMemo } from "react";
import { useUserInfo } from "../UserInfoProvider/UserInfoProvider";
import { useState, useEffect } from "react";
import { useVideoRecording } from "./useVideoRecording";
import { useBodySegmentation } from "./useBodySegmentation";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { useDynamicDOMRef } from "@/hooks/useDynamicDOMRef";

type Props = {};
const MAX_DURATION = 30; // Max video recording length

enum RecorderStates {
  INITIAL = "INITIAL",
  RECORDING = "RECORDING",
  RECORDED = "RECORDED",
}

const VideoRecorder = (props: Props) => {
  const [videoRef, videoElm] = useDynamicDOMRef<HTMLVideoElement>();
  const [canvasRef, canvasElm] = useDynamicDOMRef<HTMLCanvasElement>();

  const [recorderState, setRecorderState] = useState<RecorderStates>(
    RecorderStates.INITIAL,
  );

  // for writing to the global state
  const { videoBlob, setVideoBlob } = useUserInfo();

  const recorder = useVideoRecording(canvasElm);
  useBodySegmentation(videoElm, canvasElm);

  const { startTimer, finishTimer, elapsedTime, resetTimer } =
    useCountdownTimer(MAX_DURATION);

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
  const clearRecording = () => {
    setRecorderState(RecorderStates.INITIAL);
    resetTimer();
  };

  const recordedURLObject = useMemo(
    () => videoBlob && URL.createObjectURL(videoBlob),
    [videoBlob],
  );

  return (
    <div>
      {(recorderState === RecorderStates.INITIAL ||
        recorderState === RecorderStates.RECORDING) && (
        <div>
          <video ref={videoRef} autoPlay playsInline hidden />
          <canvas
            style={{
              opacity: recorderState === RecorderStates.INITIAL ? 0.7 : 1,
            }}
            onClick={() => {
              recorderState === RecorderStates.INITIAL
                ? startRecording()
                : stopRecording();
            }}
            ref={canvasRef}
            className="absolute left-0 top-0 z-10 h-[100svh] w-full object-cover xl:object-contain"
          />
        </div>
      )}

      {/* display the recording when the user has something recorded */}
      {recorderState === RecorderStates.RECORDED && (
        <div>
          <button
            className="absolute z-20 bg-slate-500"
            onClick={clearRecording}
          >
            Redo
          </button>
          <video
            className="absolute left-0 top-0 z-10 h-[100svh] w-full object-cover xl:object-contain"
            playsInline
            autoPlay
            muted
            loop
            src={recordedURLObject ? recordedURLObject : ""}
            controls
          />
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
