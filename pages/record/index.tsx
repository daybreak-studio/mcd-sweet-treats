import AppFrame from "@/components/AppFrame/AppFrame";
import VideoRecorder from "@/components/VideoRecorder/VideoRecorder";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const RecordPage = (props: Props) => {
  const router = useRouter();

  const handleRecordingComplete = async (blob: Blob) => {
    // let the user fill in the info
    router.push("/user-info");
  };

  return (
    <div className="fixed inset-0 h-full w-full bg-gradient-to-t from-[#581619] to-dark to-30% ">
      <VideoRecorder onCompleteRecording={handleRecordingComplete} />
    </div>
  );
};

export default RecordPage;
