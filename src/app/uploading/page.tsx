"use client";

import { useVideoUpload } from "@/components/VideoUploadProvider/VideoUploadProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const UploadingPage = (props: Props) => {
  const { progress, isUploading } = useVideoUpload();
  const router = useRouter();

  useEffect(() => {
    if (progress >= 1 || !isUploading) {
      router.push("/done");
    }
  }, [progress, isUploading, router]);

  return <div>progress: {progress}</div>;
};

export default UploadingPage;
