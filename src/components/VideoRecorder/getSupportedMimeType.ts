// Get the supported media type, required for multi browser support since Safari and Chrome handle this differently.
export const getSupportedMimeType = () => {
  const types = [
    "video/webm; codecs=vp9",
    "video/webm; codecs=vp8",
    "video/webm; codecs=h264",
    "video/mp4",
  ];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) || null;
};
