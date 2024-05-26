import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { useEffect, useState } from "react";

export function useBodySegmentation(
  videoElm?: HTMLVideoElement,
  canvasElm?: HTMLCanvasElement,
) {
  const [isVideoFeedReady, setIsVideoFeedReady] = useState(false);

  useEffect(() => {
    if (!videoElm || !canvasElm) {
      return;
    }
    setIsVideoFeedReady(false);
    let asyncCleanupWrapper = (async () => {
      const cleanupFunction = await runBodySegment(videoElm, canvasElm);
      return cleanupFunction;
    })();
    return () => {
      setIsVideoFeedReady(false);
      asyncCleanupWrapper.then((cleanup) => cleanup());
    };
  }, [videoElm, canvasElm]);

  // Run the body segmentation model on the video feed
  const runBodySegment = async (
    videoElm: HTMLVideoElement,
    canvasElm: HTMLCanvasElement,
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

    let segmentationAnimFrame = 0;

    const processSegmentation = async () => {
      if (videoElm && canvasElm && videoElm.readyState === 4) {
        const segmentation = await segmenter.segmentPeople(videoElm);
        const foregroundThreshold = 0.5;
        const backgroundBlurAmount = 7;
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
      }
    };

    // If the video is playing, start processing the segmentation
    const startSegmentation = () => {
      setIsVideoFeedReady(true);
      segmentationAnimFrame = requestAnimationFrame(processSegmentation);
    };

    if (videoElm) {
      videoElm.addEventListener("playing", startSegmentation);
    }

    return () => {
      if (videoElm) {
        videoElm.removeEventListener("playing", startSegmentation);
        cancelAnimationFrame(segmentationAnimFrame);
      }
    };
  };

  return isVideoFeedReady;
}
