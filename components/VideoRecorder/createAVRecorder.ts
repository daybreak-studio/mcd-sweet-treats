import { getSupportedMimeType } from "./getSupportedMimeType";

/**
 * Function that configure a media recorder
 * @param canvas
 * @param aspectRatio
 * @param onBlobAvailable
 * @returns
 */
export async function createAVRecorder(
  canvas: HTMLCanvasElement,
  aspectRatio: number,
  onBlobAvailable: (blob: Blob) => void,
) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "user",
      frameRate: { ideal: 60 },
      aspectRatio: aspectRatio,
    },
    audio: true,
  });

  // Only use the video track
  const videoStream = new MediaStream([stream.getVideoTracks()[0]]);
  // setVideoStream(videoStream);

  // Combine the video stream with the audio stream
  if (stream.getAudioTracks().length === 0) {
    throw "No available input audio track";
  }
  if (!canvas) {
    throw "Canvas cannot be null";
  }
  const canvasStream = canvas.captureStream(60);
  const videoTrack = canvasStream.getVideoTracks()[0];
  const audioTrack = stream.getAudioTracks()[0];
  const combinedStream = new MediaStream([videoTrack, audioTrack]);
  const mimeType = getSupportedMimeType();

  if (!mimeType) {
    throw `Mime type '${mimeType}' not supported`;
  }

  // Create a new MediaRecorder with the combined stream using the support mimeType.
  const recorder = new MediaRecorder(combinedStream, { mimeType });
  recorder.ondataavailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      onBlobAvailable(event.data);
    }
  };

  let _isDestroyed = false;
  const destory = () => {
    // top all the media stream
    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    _isDestroyed = true;
  };
  const isDestroyed = () => {
    return _isDestroyed;
  };

  const isInactive = () => {
    return recorder.state === "inactive";
  };

  const isRecording = () => {
    return recorder.state === "recording";
  };

  const isPaused = () => {
    return recorder.state === "paused";
  };

  const start = () => {
    recorder.start();
  };

  const stop = () => {
    recorder.stop();
  };

  return {
    videoStream,
    destory,
    start,
    stop,
    isDestroyed,
    isInactive,
    isRecording,
    isPaused,
  };
}

export type AVRecorder = Awaited<ReturnType<typeof createAVRecorder>>;
