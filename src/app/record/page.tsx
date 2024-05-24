"use client";

import AppFrame from "@/components/AppFrame/AppFrame";
import { useUserInfo } from "@/components/UserInfoProvider/UserInfoProvider";
import VideoRecorder from "@/components/VideoRecorder/VideoRecorder";
import {
  InputLanguageKey,
  OutputLanguageKey,
} from "@/components/VideoUploadProvider/Languages";
import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const RecordPage = (props: Props) => {
  const { upload } = useVideoUpload();
  const { email, name, inputLanguage, outputLanguage } = useUserInfo();
  const router = useRouter();

  const handleRecordingComplete = async (blob: Blob) => {
    // initiate the upload
    upload(blob, {
      name: name,
      email: email,
      inputLanguage: inputLanguage as InputLanguageKey,
      outputLanguage: outputLanguage as OutputLanguageKey,
    });
    router.push("/uploading");
  };

  return (
    <AppFrame>
      <VideoRecorder onCompleteRecording={handleRecordingComplete} />
    </AppFrame>
  );
};

export default RecordPage;
