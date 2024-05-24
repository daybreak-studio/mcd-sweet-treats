"use client";

import React from "react";
import { useUserInfo } from "../UserInfoProvider/UserInfoProvider";
import { useRef, useState, useEffect } from "react";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import useViewport from "@/hooks/useViewport";
import { getSupportedMimeType } from "./getSupportedMimeType";

type Props = {};
const MAX_DURATION = 30; // Max video recording length

enum RecorderStates {
  INITIAL = "INITIAL",
  RECORDING = "RECORDING",
  RECORDED = "RECO",
}

const VideoRecorder = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [recorderState, setRecorderState] = useState<RecorderStates>(
    RecorderStates.INITIAL,
  );
  const { videoBlob, setVideoBlob } = useUserInfo();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [duration, setDuration] = useState(MAX_DURATION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobile } = useViewport();

  // // Run the body segmentation model on the video feed
  useEffect(() => {
    initMediaStream();
    runBodySegment(videoRef, canvasRef);
  }, [isMobile]);

  // Update the video element's srcObject when videoStream updates
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play().catch(console.error);
    }
  }, [videoStream]);

  // Initialize the media stream
  const initMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          frameRate: { ideal: 60 },
          aspectRatio: isMobile ? 16 / 9 : 9 / 16,
        },
        audio: true,
      });

      // Only use the video track
      const videoStream = new MediaStream([stream.getVideoTracks()[0]]);
      setVideoStream(videoStream);

      // Combine the video stream with the audio stream
      if (canvasRef.current && stream.getAudioTracks().length > 0) {
        const canvasStream = canvasRef.current.captureStream(60);
        const videoTrack = canvasStream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        const combinedStream = new MediaStream([videoTrack, audioTrack]);
        const mimeType = getSupportedMimeType();
        console.log(mimeType);
        // Create a new MediaRecorder with the combined stream using the support mimeType.
        if (mimeType) {
          const recorder = new MediaRecorder(combinedStream, { mimeType });
          recorder.ondataavailable = handleDataAvailable;
          setMediaRecorder(recorder);
        }
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  // Handle the data available event from the MediaRecorder
  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      setVideoBlob(event.data);
    }
  };

  useEffect(() => {
    console.log("MediaRecorder State", mediaRecorder);
  }, [mediaRecorder]);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      setRecorderState(RecorderStates.RECORDING);
      setDuration(MAX_DURATION);
      timerRef.current = setInterval(() => {
        setDuration((prevDuration) => {
          const newDuration = prevDuration - 1;
          if (newDuration <= 0) stopRecording();
          return newDuration;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    console.log("stopRecording");
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecorderState(RecorderStates.RECORDED);
      console.log(recorderState);
      // setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const clearRecording = () => {
    setVideoBlob(null); // Clear the recorded blob
    setDuration(MAX_DURATION); // Reset timer to 30s
    setRecorderState(RecorderStates.INITIAL);
    initMediaStream(); // Reinitialize the webcam stream
  };

  // Run the body segmentation model on the video feed
  const runBodySegment = async (
    videoRef: React.RefObject<HTMLVideoElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
  ) => {
    const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
    const segmenterConfig: bodySegmentation.MediaPipeSelfieSegmentationMediaPipeModelConfig =
      {
        runtime: "mediapipe",
        solutionPath:
          "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
      };
    const segmenter = await bodySegmentation.createSegmenter(
      model,
      segmenterConfig,
    );

    const processSegmentation = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        videoRef.current.readyState === 4
      ) {
        const segmentation = await segmenter.segmentPeople(videoRef.current);
        const foregroundThreshold = 0.5;
        const backgroundBlurAmount = 7;
        const edgeBlurAmount = 5;
        const flipHorizontal = true;

        await bodySegmentation.drawBokehEffect(
          canvasRef.current,
          videoRef.current,
          segmentation,
          foregroundThreshold,
          backgroundBlurAmount,
          edgeBlurAmount,
          flipHorizontal,
        );
        requestAnimationFrame(processSegmentation);
      }
    };

    // If the video is playing, start processing the segmentation
    const startSegmentation = () => {
      requestAnimationFrame(processSegmentation);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("playing", startSegmentation);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("playing", startSegmentation);
      }
    };
  };

  return (
    <div>
      {(recorderState === RecorderStates.INITIAL ||
        recorderState === RecorderStates.RECORDING) && (
        <div style={{}}>
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
      {recorderState === RecorderStates.RECORDED && videoBlob && (
        <>
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
            src={URL.createObjectURL(videoBlob)}
            controls
          />
        </>
      )}
    </div>
  );
};

export default VideoRecorder;
