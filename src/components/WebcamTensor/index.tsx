"use client";

import { useRef, useState, useEffect } from "react";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import React from "react";
import useViewport from "@/hooks/useViewport";

const REGION = "us-east-2"; // AWS Region
const IDENTITY_POOL_ID = "us-east-2:4adc1a3c-60e1-4661-bd5f-34131a974c9a"; // AWS Cognito Identity Pool ID
const MAX_DURATION = 30; // Max video recording length.

const inputLanguageMap = {
  English: "English",
  Filipino: "Filipino (Philippines)",
  Japanese: "Japanese (Japan)",
  Korean: "Korean (Korea)",
  Mandarin: "Chinese (Mandarin, Simplified)",
  Thai: "Thai (Thailand)",
  Vietnamese: "Vietnamese (Vietnam)",
  Portuguese: "Portuguese (Portugal)",
  Cantonese: "Chinese (Cantonese, Traditional)",
  Hindi: "Hindi (India)",
  Turkish: "Turkish (Türkiye)",
  Spanish: "Spanish (Spain)",
};

const outputLanguageMap = {
  Mandarin: "Chinese (Mandarin, Simplified)",
  Cantonese: "Chinese (Cantonese, Traditional)",
  English: "English",
  Filipino: "Filipino (Philippines)",
  Hindi: "Hindi (India)",
  Japanese: "Japanese (Japan)",
  Korean: "Korean (Korea)",
  Spanish: "Spanish (Spain)",
  Thai: "Thai (Thailand)",
  Urdu: "Urdu (Pakistan)",
  Vietnamese: "Vietnamese (Vietnam)",
  Italian: "Italian (Italy)",
  Arabic: "Arabic",
  Hebrew: "Hebrew (Israel)",
  Ukrainian: "Ukrainian (Ukraine)",
  Gujarati: "Gujarati (India)",
  Telugu: "Telugu (India)",
  Tamil: "Tamil (India)",
  Bengali: "Bengali (India)",
  Malayalam: "Malayalam (India)",
  Lao: "Lao (Laos)",
  Burmese: "Burmese (Myanmar)",
  Indonesian: "Indonesian (Indonesia)",
  Malay: "Malay (Malaysia)",
  Nepali: "Nepali (Nepal)",
  Portuguese: "Portuguese (Portugal)",
  French: "French (France)",
  German: "German (Germany)",
  Polish: "Polish (Poland)",
  Russian: "Russian (Russia)",
};

// Create arrays from keys in the language maps.
const inputLanguageOptions = Object.keys(inputLanguageMap);
const outputLanguageOptions = Object.keys(outputLanguageMap);

const awsConfig = {
  region: REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: REGION },
    identityPoolId: IDENTITY_POOL_ID,
  }),
};

// Create the S3 and DynamoDB clients using AWS Config.
const s3Client = new S3Client(awsConfig);
const dynamoDbClient = new DynamoDBClient(awsConfig);
const dynamoDbDocClient = DynamoDBDocumentClient.from(dynamoDbClient);

export default function WebcamTensor() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [latestRecording, setLatestRecording] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(MAX_DURATION);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputLanguage, setInputLanguage] = useState("");
  const [outputLanguage, setOutputLanguage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isMobile } = useViewport();

  // // Run the body segmentation model on the video feed
  useEffect(() => {
    initMediaStream();
    runBodySegment(videoRef, canvasRef);
  }, []);

  // Update the video element's srcObject when videoStream updates
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play().catch(console.error);
    }
  }, [videoStream]);

  // Update the latestRecording when recordedBlobs updates
  useEffect(() => {
    const latestRecording = recordedBlobs.pop();
    if (latestRecording) {
      setLatestRecording(latestRecording);
    }
  }, [recordedBlobs]);

  // Initialize the media stream
  const initMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          frameRate: { ideal: 60 },
          aspectRatio: isMobile ? 16 / 9 : 9 / 16,
        },
        audio: true,
      });
      // Only use the video track
      const videoStream = new MediaStream([stream.getVideoTracks()[0]]);
      setVideoStream(videoStream);
      // Combine the video stream with the audio stream
      if (canvasRef.current && stream.getAudioTracks().length > 0) {
        const canvasStream = canvasRef.current.captureStream(60);
        const videoTrack = canvasStream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];
        const combinedStream = new MediaStream([videoTrack, audioTrack]);
        const mimeType = getSupportedMimeType();
        // Create a new MediaRecorder with the combined stream using the support mimeType.
        if (mimeType) {
          const recorder = new MediaRecorder(combinedStream, { mimeType });
          recorder.ondataavailable = handleDataAvailable;
          setMediaRecorder(recorder);
        }
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  // Get the supported media type, required for multi browser support since Safari and Chrome handle this differently.
  const getSupportedMimeType = () => {
    const types = [
      "video/webm; codecs=vp9",
      "video/webm; codecs=vp8",
      "video/webm; codecs=h264",
      "video/mp4",
    ];
    return types.find((type) => MediaRecorder.isTypeSupported(type)) || null;
  };

  // Handle the data available event from the MediaRecorder
  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data && event.data.size > 0) {
      setRecordedBlobs((prev) => [...prev, event.data]);
    }
  };

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      setRecording(true);
      setDuration(MAX_DURATION);
      timerRef.current = setInterval(() => {
        setDuration((prevDuration) => {
          const newDuration = prevDuration - 1;
          if (newDuration <= 0) stopRecording();
          return newDuration;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      setRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const redoRecording = () => {
    setRecordedBlobs([]);
    setLatestRecording(null);
    setDuration(MAX_DURATION);
    initMediaStream();
  };

  const downloadRecording = () => {
    if (latestRecording) {
      const url = URL.createObjectURL(latestRecording);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded-video.webm";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  };

  const putItemToDynamoDB = async (uuid: string) => {
    try {
      const threeDaysInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
      const ttl = Math.floor(Date.now() / 1000) + threeDaysInSeconds;
      const command = new PutCommand({
        TableName: "UserData",
        Item: {
          id: uuid,
          name: name,
          email: email,
          inputLanguage:
            inputLanguageMap[inputLanguage as keyof typeof inputLanguageMap],
          outputLanguage:
            outputLanguageMap[outputLanguage as keyof typeof outputLanguageMap],
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

  const uploadFile = async (file: Blob) => {
    if (!name || !email || !inputLanguage || !file) {
      alert("Please fill in all required fields.");
      return;
    }

    const uuid = uuidv4();

    try {
      const startTime = new Date();
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
          Bucket: "mcdonalds-input",
          Key: `uploads/${uuid}`,
          Body: file,
        },
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        if (progress.loaded && progress.total) {
          setUploadProgress((progress.loaded / progress.total) * 100);
        }
      });
      await parallelUploads3.done();
      await putItemToDynamoDB(uuid);
      alert(
        "Upload completed successfully. Please refresh the HeyGen dashboard for the completed video!",
      );
      const endTime = new Date();
      console.log(
        `Time taken to upload: ${(endTime.getTime() - startTime.getTime()) / 1000} seconds`,
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Run the body segmentation model on the video feed
  const runBodySegment = async (
    videoRef: React.RefObject<HTMLVideoElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
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
      if (
        videoRef.current &&
        canvasRef.current &&
        videoRef.current.readyState === 4
      ) {
        const segmentation = await segmenter.segmentPeople(videoRef.current);
        const foregroundThreshold = 0.5;
        const backgroundBlurAmount = 7;
        const edgeBlurAmount = 5;
        const flipHorizontal = true;

        await bodySegmentation.drawBokehEffect(
          canvasRef.current,
          videoRef.current,
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

    if (videoRef.current) {
      videoRef.current.addEventListener("playing", startSegmentation);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("playing", startSegmentation);
      }
    };
  };

  return (
    <>
      <div className="absolute bottom-0 z-10 w-screen p-8">
        {!recording ? (
          <>
            {latestRecording ? (
              <button
                className="rounded-3xl bg-gray-200 px-6 py-2 text-black active:bg-gray-400"
                onClick={redoRecording}
              >
                Redo
              </button>
            ) : (
              <button
                className="rounded-3xl bg-gray-200 px-6 py-2 text-black active:bg-gray-400"
                onClick={startRecording}
              >
                Record
              </button>
            )}
          </>
        ) : (
          <button
            className="mr-2 rounded-3xl bg-gray-200 px-6 py-2 text-black"
            onClick={stopRecording}
          >
            Stop — {duration} seconds
          </button>
        )}
        {latestRecording && (
          <>
            <button
              className="rounded-3xl bg-gray-200 px-6 py-2 text-black"
              onClick={downloadRecording}
            >
              Download
            </button>
            <button
              className="rounded-3xl bg-gray-200 px-6 py-2 text-black"
              onClick={() => uploadFile(latestRecording)}
            >
              Upload
            </button>

            <h1 className="mb-2 mt-2 rounded-md bg-gray-200 px-6 py-2 text-black">
              Upload Progress {uploadProgress}%
            </h1>
          </>
        )}
        <select
          name="Input Language"
          onChange={(e) => setInputLanguage(e.target.value)}
          value={inputLanguage}
          className="w-full"
        >
          <option value="">Select Input Language</option>
          {inputLanguageOptions.map((language, key) => (
            <option key={key} value={language}>
              {language}
            </option>
          ))}
        </select>
        <select
          name="Output Language"
          onChange={(e) => setOutputLanguage(e.target.value)}
          value={outputLanguage}
          className="w-full"
        >
          <option value="">Select Output Language</option>
          {outputLanguageOptions.map((language, key) => (
            <option key={key} value={language}>
              {language}
            </option>
          ))}
        </select>
        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          className="w-full p-2"
        ></input>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          className="w-full p-2"
        ></input>
      </div>
      {!latestRecording && (
        <div>
          <video ref={videoRef} autoPlay playsInline hidden />
          <canvas
            ref={canvasRef}
            // width={WIDTH}
            // height={HEIGHT}
            className="absolute left-0 top-0 h-[100svh] w-full object-cover xl:object-contain"
          />
        </div>
      )}
      {latestRecording && (
        <video
          className="absolute left-0 top-0 h-[100svh] w-full object-cover xl:object-contain"
          playsInline
          autoPlay
          muted
          loop
          src={URL.createObjectURL(latestRecording)}
          controls
        />
      )}
    </>
  );
}
