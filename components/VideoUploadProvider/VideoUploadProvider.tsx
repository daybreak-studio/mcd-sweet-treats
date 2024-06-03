"use client";

import React, {
  MutableRefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { inputLanguageMap, outputLanguageMap } from "./Languages";
import {
  IdentifiableUploadRecord,
  UploadRecord,
  createIdentifiableUploadRecord,
  validateUploadRecord,
} from "./UploadRecord";

const REGION = "us-east-2"; // AWS Region
const IDENTITY_POOL_ID = "us-east-2:4adc1a3c-60e1-4661-bd5f-34131a974c9a"; // AWS Cognito Identity Pool ID

type Props = {
  children: React.ReactNode;
};

const VideoUploadContext = createContext({
  upload: async (file: Blob, info: UploadRecord) => {},
  abort: async () => {},
  progress: 0,
  isUploading: false,
});
VideoUploadContext.displayName = "VideoUploadContext";

export const useVideoUpload = () => useContext(VideoUploadContext);

const awsConfig = {
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION },
    identityPoolId: IDENTITY_POOL_ID,
  }),
};
const s3Client = new S3Client(awsConfig);
const dynamoDbClient = new DynamoDBClient(awsConfig);
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

const VideoUploadProvider = ({ children }: Props) => {
  const parallelUploads3Ref = useRef() as MutableRefObject<Upload>;
  const hasUploadAborted = useRef(false);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const putItemToDynamoDB = async ({
    uuid,
    name,
    email,
    inputLanguage,
    outputLanguage,
  }: IdentifiableUploadRecord) => {
    try {
      const threeDaysInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
      const ttl = Math.floor(Date.now() / 1000) + threeDaysInSeconds;
      const command = new PutCommand({
        TableName: "UserData",
        Item: {
          id: uuid,
          name: name,
          email: email,
          inputLanguage: inputLanguageMap[inputLanguage],
          outputLanguage: outputLanguageMap[outputLanguage],
          ttl: ttl,
          created_at: new Date().toISOString(),
        },
      });
      const response = await dynamoDbDocClient.send(command);
      console.log("Item added to DynamoDB:", response);
    } catch (error) {
      console.error("Error adding item to DynamoDB:", error);
    }
  };

  const upload = async (file: Blob, info: UploadRecord) => {
    // throw error if the upload record is not valid
    const validatedUploadRecord = validateUploadRecord(info);
    const record = createIdentifiableUploadRecord(validatedUploadRecord);

    if (!file) {
      throw "Abort upload: File cannot be null";
    }

    if (isUploading) {
      console.log("New upload not initiated: there has been on-going upload");
      return;
    }

    // init the upload states
    hasUploadAborted.current = false;
    setIsUploading(true);
    setProgress(0);

    try {
      const startTime = new Date();
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
          Bucket: "mcdonalds-test-input",
          Key: `${record.uuid}`,
          Body: file,
        },
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });
      parallelUploads3Ref.current = parallelUploads3;

      parallelUploads3.on("httpUploadProgress", (progress) => {
        if (progress.loaded && progress.total) {
          setProgress(progress.loaded / progress.total);
        }
      });

      await parallelUploads3.done();
      await putItemToDynamoDB(record);

      const endTime = new Date();
      console.log(
        `Time taken to upload: ${(endTime.getTime() - startTime.getTime()) / 1000} seconds`,
      );
      setIsUploading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const abort = async () => {
    if (!parallelUploads3Ref.current) return;
    try {
      await parallelUploads3Ref.current.abort();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VideoUploadContext.Provider
      value={{
        upload,
        abort,
        progress,
        isUploading,
      }}
    >
      {children}
    </VideoUploadContext.Provider>
  );
};

export default VideoUploadProvider;
