"use client";
import { useEffect, useState } from "react";

const getHash = () =>
  typeof window !== "undefined"
    ? decodeURIComponent(window.location.hash.replace("#", ""))
    : undefined;

const useIsDev = () => {
  const [hash, setHash] = useState<string | undefined>("");

  useEffect(() => {
    setHash(getHash());
  }, []);

  return hash === "dev";
};

export default useIsDev;
