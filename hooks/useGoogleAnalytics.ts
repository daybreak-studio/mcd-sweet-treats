declare global {
  interface Window {
    dataLayer: {
      [key: string]: any;
    }[];
  }
}

import { useEffect } from "react";

const useGoogleAnalytics = (trackingId: string, hasConsented: boolean) => {
  // setup the initial data layer to with the consent
  useEffect(() => {
    if (!hasConsented) return;
    if (!trackingId) return;

    // Function to load Google Analytics script
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      document.head.appendChild(script);
    };

    // Function to initialize Google Analytics
    const initializeAnalytics = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      //@ts-ignore
      gtag("consent", "update", {
        ad_user_data: "granted",
        ad_personalization: "granted",
        ad_storage: "granted",
        analytics_storage: "granted",
      });

      //@ts-ignore
      gtag("js", new Date());
      //@ts-ignore
      gtag("config", trackingId);
    };

    // Load the script and initialize Google Analytics
    loadScript();
    initializeAnalytics();

    // Clean up function
    return () => {
      // Remove the Google Analytics script
      const script = document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"]`,
      );
      if (script) {
        document.head.removeChild(script);
      }
      // Reset dataLayer
      window.dataLayer = [];
    };
  }, [trackingId, hasConsented]);
};

export default useGoogleAnalytics;
