//@ts-nocheck

import { useEffect, useState } from "react";

const useGoogleAnalytics = (trackingId: string, hasConsented: boolean) => {
  const [hasSetupAnalytics, setHasSetupAnalytics] = useState(false);

  useEffect(() => {
    if (!hasSetupAnalytics) return;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }

    function handlePageChange() {
      //@ts-ignore
      try {
        ga("send", "pageview", {
          page: location.pathname + location.search + location.hash,
        });
      } catch (e) {
        // do nothing because i am actually not sure if this code doing anything
      }
    }

    // listen for hash change
    window.addEventListener("popstate", handlePageChange);

    return () => window.removeEventListener("popstate", handlePageChange);
  }, [hasSetupAnalytics]);

  // setup the initial data layer to reject the consent
  useEffect(() => {
    if (!trackingId) return;
    const setupInitialDataLayer = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      //@ts-ignore
      gtag("consent", "default", {
        ad_user_data: "denied",
        ad_personalization: "denied",
        ad_storage: "denied",
        analytics_storage: "denied",
        wait_for_update: 500,
      });
      //@ts-ignore
      gtag("js", new Date());
      //@ts-ignore
      gtag("config", trackingId);
    };

    setupInitialDataLayer();
  }, [trackingId]);

  // setup the initial data layer to with the consent
  useEffect(() => {
    if (!hasConsented) return;
    if (!trackingId) return;

    // Function to load Google Analytics script
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
      script.async = true;
      // document.head.appendChild(script);
      var firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
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
      // gtag("js", new Date());
      // //@ts-ignore
      // gtag("config", trackingId);

      setHasSetupAnalytics(true);
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
