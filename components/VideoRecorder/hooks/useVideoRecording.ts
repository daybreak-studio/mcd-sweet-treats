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

  const initializeRecorder = async () => {
    if (!(canvasElm instanceof HTMLCanvasElement) || !videoElm) return;
    if (!hasPermissionGranted) {
      console.log("User has not granted permission, aborting.");
      return;
    }

    setIsMediaRecorderReady(false);
    try {
      const recorder = await createAVRecorder(canvasElm, setRecordedBlobData);

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
