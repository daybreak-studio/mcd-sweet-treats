import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import useViewport from "../../../hooks/useViewport";
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

  // Deprecate usage of isMoble for aspect ratio handling
  // const { isMobile } = useViewport();

  // Get device type
  const getDeviceType = () => {
    const userAgent =
      // Make sure window is not undefined and navigator exists before accessing userAgent
      typeof window !== "undefined" && window.navigator
        ? window.navigator.userAgent
        : "";
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i,
      ),
    );
    const tablet = Boolean(userAgent.match(/Tablet|iPad/i));
    if (tablet) {
      return "tablet";
    } else if (mobile) {
      return "mobile";
    } else {
      return "desktop";
    }
  };

  // Get device type on load
  const deviceType = useMemo(getDeviceType, []);

  // Get aspect ratio based on device type
  const aspectRatio = useMemo(() => {
    switch (deviceType) {
      case "mobile":
        return 16 / 9;
      case "tablet":
        return 9 / 16;
      case "desktop":
        return 9 / 16;
      default:
        // If we somehow do not match any of these, default to 9/16 as safety net.
        return 9 / 16;
    }
  }, [deviceType]);

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
