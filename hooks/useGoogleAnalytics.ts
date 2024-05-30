//@ts-nocheck
import { useEffect } from "react";

const GAID = "G-JNW1SSN9K2";

export function useGoogleAnalytics() {
  useEffect(() => {
    //
  }, []);
}

function setupAnalytics() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("consent", "default", {
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_storage: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
  gtag("js", new Date());
  gtag("config", GAID);
}
