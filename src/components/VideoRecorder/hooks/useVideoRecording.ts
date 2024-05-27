import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import useViewport from "@/hooks/useViewport";
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

  const { isMobile } = useViewport();
  const aspectRatio = useMemo(() => (isMobile ? 16 / 9 : 9 / 16), [isMobile]);

  useEffect(() => {
    if (!(canvasElm instanceof HTMLCanvasElement) || !videoElm) return;
    if (!hasPermissionGranted) {
      console.log("User have not granted permission, abort");
      return;
    }

    console.log("creating AVRecorder");
    const asyncCleanupFunctionWrapper = (async function () {
      setIsMediaRecorderReady(false);

      try {
        const recorder = await createAVRecorder(
          canvasElm,
          aspectRatio,
          setRecordedBlobData,
        );

        setIsMediaRecorderReady(true);
        setAVRecorder(recorder);
        videoElm.srcObject = recorder.videoStream;
        videoElm.play().catch(console.error);

        console.log("created AVRecorder");
        return () => {
          console.log(`cleanup AVRecorder`);
          recorder.destory();
        };
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    })();

    return () => {
      asyncCleanupFunctionWrapper.then((cleanup) => {
        cleanup && cleanup();
      });
    };
  }, [aspectRatio, canvasElm, videoElm, hasPermissionGranted]);

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
