import AppFrame from "@/components/AppFrame/AppFrame";
import WebcamTensor from "@/components/WebcamTensor";
import React from "react";

type Props = {};

const RecordPage = (props: Props) => {
  return (
    <AppFrame>
      <WebcamTensor />
    </AppFrame>
  );
};

export default RecordPage;
