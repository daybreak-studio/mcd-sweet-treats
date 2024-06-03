import { useEffect, useState } from "react";
import { AVRecorder, createAVRecorder } from "../createAVRecorder";

export function useVideoRecording(
  canvasElm: HTMLCanvasElement | undefined,
  videoElm: HTMLVideoElement | undefined,
  hasPermissionGranted: boolean,
) {
  const [recordedBlobData, setRecordedBlobData] = useState<Blob | null>(null);
  const [avRecorder, setAVRecorder] = useState<AVRecorder | null>(null);
  const [isMediaRecorderReady, setIsMediaRecorderReady] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getVideoSettings = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        frameRate: { ideal: 60 },
      },
      audio: true,
    });

    const videoTrack = stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    stream.getTracks().forEach((track) => track.stop());

    return settings;
  };

  const initializeRecorder = async () => {
    if (!(canvasElm instanceof HTMLCanvasElement) || !videoElm) return;
    if (!hasPermissionGranted) {
      console.log("User has not granted permission, aborting.");
      return;
    }

    setIsMediaRecorderReady(false);
    try {
      // const aspectRatio = await determineAspectRatio();

      const recorder = await createAVRecorder(
        canvasElm,
        // aspectRatio,
        setRecordedBlobData,
      );

      setAVRecorder(recorder);
      setIsMediaRecorderReady(true);

      videoElm.srcObject = recorder.videoStream;
      videoElm.play().catch(console.error);

      console.log("Created AVRecorder");

      return () => {
        console.log("Cleaning up AVRecorder");
        recorder.destroy();
      };
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  useEffect(() => {
    const cleanup = initializeRecorder();

    return () => {
      cleanup
        .then((cleanupFn) => {
          if (typeof cleanupFn === "function") {
            cleanupFn();
          }
        })
        .catch(console.error);
    };
  }, [canvasElm, videoElm, hasPermissionGranted]);

  const startRecording = () => {
    if (avRecorder && avRecorder.isInactive()) {
      setRecordedBlobData(null);
      avRecorder.start();
      setIsRecording(true);
      return true;
    }
    return false;
  };

  const stopRecording = () => {
    if (avRecorder && avRecorder.isRecording()) {
      avRecorder.stop();
      setIsRecording(false);
      return true;
    }
    return false;
  };

  const clearRecordedBlobData = () => {
    setRecordedBlobData(null);
  };

  return {
    isMediaRecorderReady,
    startRecording,
    stopRecording,
    clearRecordedBlobData,
    avRecorder,
    isRecording,
    recordedBlobData,
  };
}
