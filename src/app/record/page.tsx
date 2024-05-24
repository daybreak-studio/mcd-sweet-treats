import AppFrame from "@/components/AppFrame/AppFrame";
import VideoRecorder from "@/components/VideoRecorder/VideoRecorder";
import React from "react";

type Props = {};

const RecordPage = (props: Props) => {
  return (
    <AppFrame>
      <VideoRecorder />
    </AppFrame>
  );
};

export default RecordPage;
