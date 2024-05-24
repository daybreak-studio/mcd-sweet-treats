"use client";

import React, { createContext, useContext, useReducer, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

// Initial user information
const initialUserInfo = {
  name: "",
  email: "",
  inputLanguage: "",
  outputLanguage: "",
  hasAuthenticated: false,
  videoBlob: null as Blob | null,
  setVideoBlob: (recording: Blob | null) => {},
  setInputLanguage: (value: string) => {},
  setOutputLanguage: (value: string) => {},
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

// Context provider that manages the user information state and provides it to child components
const UserInfoProvider = ({ children }: Props) => {
  const [name, setName] = useLocalStorage("name", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [inputLanguage, setInputLanguage] = useLocalStorage(
    "inputLanguage",
    "",
    { initializeWithValue: false },
  );
  const [outputLanguage, setOutputLanguage] = useLocalStorage(
    "outputLanguage",
    "",
    { initializeWithValue: false },
  );
  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

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
