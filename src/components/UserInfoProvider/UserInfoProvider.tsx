import React, { createContext, useReducer, useState } from "react";

// Initial user information
const initialUserInfo = {
  name: "",
  email: "",
  hasAuthenticated: false,
  setName: (value: string) => {},
  setEmail: (value: string) => {},
  authenticate: () => {},
};

// Define the type for user information
export type UserInfo = typeof initialUserInfo;

// Create a context for user information
const UserInfoContext = createContext(initialUserInfo);

// Define the props type
type Props = {
  children: React.ReactNode;
};

// Context provider that manages the user information state and provides it to child components
const UserInfoProvider = ({ children }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasAuthenticated, setHasAuthenticated] = useState(false);

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
