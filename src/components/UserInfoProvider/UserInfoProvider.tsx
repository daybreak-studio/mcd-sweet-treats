"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import {
  InputLanguageKey,
  OutputLanguageKey,
} from "../VideoUploadProvider/Languages";

// Initial user information
const initialUserInfo = {
  name: "",
  email: "",
  inputLanguage: "" as "" | InputLanguageKey,
  outputLanguage: "" as "" | OutputLanguageKey,
  hasAuthenticated: false,
  videoBlob: null as Blob | null | undefined,
  setVideoBlob: (recording: Blob | null) => {},
  setInputLanguage: (value: InputLanguageKey) => {},
  setOutputLanguage: (value: OutputLanguageKey) => {},
  setName: (value: string) => {},
  setEmail: (value: string) => {},
  authenticate: () => {},
};

// Define the type for user information
export type UserInfo = typeof initialUserInfo;

// Create a context for user information
const UserInfoContext = createContext(initialUserInfo);
UserInfoContext.displayName = "UserInfoContext";

// Define the props type
type Props = {
  children: React.ReactNode;
};

export const useUserInfo = () => useContext(UserInfoContext);

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () =>
      reject(new Error("Failed to convert Blob to Base64"));
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64: string, defaultType: string = ""): Blob | null {
  try {
    let type = defaultType;
    let base64Data = base64;

    // Check if the base64 string has the data URI scheme
    const dataUriPattern = /^data:([^;]+)(;.+)?;base64,(.+)$/;
    const matches = dataUriPattern.exec(base64);

    if (matches) {
      type = matches[1];
      base64Data = matches[3]; // Correctly get the base64 data now
    }

    // Decode Base64 string
    const byteCharacters = atob(base64Data);

    // Convert string to byte array
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Return a new Blob object
    return new Blob([byteArray], { type });
  } catch (error) {
    console.error("Failed to convert Base64 to Blob:", error);
    return null;
  }
}

// Context provider that manages the user information state and provides it to child components
const UserInfoProvider = ({ children }: Props) => {
  const [name, setName] = useLocalStorage("name", "", {
    initializeWithValue: false,
  });
  const [email, setEmail] = useLocalStorage("email", "", {
    initializeWithValue: false,
  });
  const [inputLanguage, setInputLanguage] = useLocalStorage<
    "" | InputLanguageKey
  >("inputLanguage", "", { initializeWithValue: false });
  const [outputLanguage, setOutputLanguage] = useLocalStorage<
    "" | OutputLanguageKey
  >("outputLanguage", "", { initializeWithValue: false });
  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null | undefined>(
    undefined,
  );

  useEffect(() => {
    // when it was just initializing, return
    if (videoBlob === undefined) {
      return;
    }
    // when it was deliberiatly set to null, clear the item
    if (videoBlob === null) {
      localStorage.removeItem("videoBlob");
      localStorage.removeItem("videoMimeType");
      return;
    }

    (async function () {
      try {
        const encodedVideo = (await blobToBase64(videoBlob)) as string;
        // save to local storage
        localStorage.setItem("videoBlob", encodedVideo);
        localStorage.setItem("videoMimeType", videoBlob.type);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [videoBlob]);

  // load the blob in the local storage
  useEffect(() => {
    const blobBase64Data = localStorage.getItem("videoBlob");
    const blobMimeType = localStorage.getItem("videoMimeType");

    if (
      typeof blobBase64Data === "undefined" ||
      typeof blobMimeType === "undefined" ||
      blobBase64Data === "undefined" ||
      blobMimeType === "undefined" ||
      !blobBase64Data ||
      !blobMimeType
    ) {
      return;
    }
    try {
      console.log("converting string to blob");

      const blob = base64ToBlob(blobBase64Data, blobMimeType);
      console.log("restoring video from previous session");
      setVideoBlob(blob);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Authenticate the user
  const authenticate = () => {
    // TODO: Implement real authentication
    setHasAuthenticated(true);
  };

  return (
    <UserInfoContext.Provider
      value={{
        name,
        setName,
        email,
        inputLanguage,
        outputLanguage,
        videoBlob,
        setVideoBlob,
        setInputLanguage,
        setOutputLanguage,
        setEmail,
        hasAuthenticated,
        authenticate,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
