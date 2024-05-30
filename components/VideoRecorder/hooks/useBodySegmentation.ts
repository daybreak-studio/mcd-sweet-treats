import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { useEffect, useState } from "react";

export function useBodySegmentation(
  videoElm: HTMLVideoElement | undefined,
  canvasElm: HTMLCanvasElement | undefined,
  isRecorderReady: boolean,
) {
  const [isVideoFeedReady, setIsVideoFeedReady] = useState(false);
  const [segmenter, setSegmenter] =
    useState<bodySegmentation.BodySegmenter | null>(null);

  // init the body segementation
  useEffect(() => {
    const asyncCleanupWrapper = (async () => {
      const model =
        bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
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
      setSegmenter(segmenter);

      return () => {
        segmenter.dispose();
      };
    })();

    return () => {
      asyncCleanupWrapper.then((cleanup) => cleanup && cleanup());
    };
  }, []);

  useEffect(() => {
    if (!videoElm || !canvasElm || !segmenter || !isRecorderReady) {
      return;
    }

    setIsVideoFeedReady(false);
    let asyncCleanupWrapper = (async () => {
      const cleanupFunction = await runBodySegmentLoop(
        videoElm,
        canvasElm,
        segmenter,
      );
      return cleanupFunction;
    })();
    return () => {
      console.log("cleanup segmentation");
      setIsVideoFeedReady(false);
      asyncCleanupWrapper.then((cleanup) => cleanup());
    };
  }, [videoElm, canvasElm, isRecorderReady, segmenter]);

  // Run the body segmentation model on the video feed
  const runBodySegmentLoop = async (
    videoElm: HTMLVideoElement,
    canvasElm: HTMLCanvasElement,
    segmenter: bodySegmentation.BodySegmenter,
  ) => {
    let segmentationAnimFrame = 0;

    const processSegmentation = async () => {
      if (videoElm && canvasElm && videoElm.readyState === 4) {
        try {
          // console.log(videoElm);
          const segmentation = await segmenter.segmentPeople(videoElm);
          const foregroundThreshold = 0.5;
          const backgroundBlurAmount = 8;
          const edgeBlurAmount = 5;
          const flipHorizontal = true;

          await bodySegmentation.drawBokehEffect(
            canvasElm,
            videoElm,
            segmentation,
            foregroundThreshold,
            backgroundBlurAmount,
            edgeBlurAmount,
            flipHorizontal,
          );
          segmentationAnimFrame = requestAnimationFrame(processSegmentation);
        } catch (e) {
          console.log(e);
        }
      }
    };

    // If the video is playing, start processing the segmentation
    const startSegmentation = () => {
      console.log("segmentation started");
      setIsVideoFeedReady(true);
      segmentationAnimFrame = requestAnimationFrame(processSegmentation);
    };
    const stopSegmentation = () => {
      console.log("segmentation stopped");
      setIsVideoFeedReady(false);
      cancelAnimationFrame(segmentationAnimFrame);
    };

    if (videoElm) {
      videoElm.addEventListener("playing", startSegmentation);
      videoElm.addEventListener("pause", stopSegmentation);
    }

    return () => {
      if (videoElm) {
        videoElm.removeEventListener("playing", startSegmentation);
        videoElm.removeEventListener("pause", stopSegmentation);
        cancelAnimationFrame(segmentationAnimFrame);
      }
    };
  };

  return isVideoFeedReady;
}
