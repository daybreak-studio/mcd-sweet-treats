import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { useEffect } from "react";

export function useBodySegmentation(
  videoElm?: HTMLVideoElement,
  canvasElm?: HTMLCanvasElement,
) {
  useEffect(() => {
    if (!videoElm || !canvasElm) {
      return;
    }
    let cleanup = () => {};
    (async () => {
      cleanup = await runBodySegment(videoElm, canvasElm);
    })();
    return () => cleanup();
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
        requestAnimationFrame(processSegmentation);
      }
    };

    // If the video is playing, start processing the segmentation
    const startSegmentation = () => {
      requestAnimationFrame(processSegmentation);
    };

    if (videoElm) {
      videoElm.addEventListener("playing", startSegmentation);
    }

    return () => {
      if (videoElm) {
        videoElm.removeEventListener("playing", startSegmentation);
      }
    };
  };
}
