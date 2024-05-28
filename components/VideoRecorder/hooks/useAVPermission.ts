import { useCallback, useEffect, useState } from "react";

export function useAVPermission() {
  // either prompt, granted or denied
  const [hasUserGrantedPermissions, setHasUserGrantedPermissions] =
    useState(false);

  const requestPermission = useCallback(() => {
    requestCameraAndMicrophonePermissions((granted, error) => {
      if (granted) {
        setHasUserGrantedPermissions(true);
      }
    });
  }, []);

  useEffect(() => {
    const handlePermissionStateChange = (state: PermissionState) => {
      if (state !== "granted") {
        setHasUserGrantedPermissions(false);
        return;
      }
      setHasUserGrantedPermissions(true);
    };

    observePermissionStateChange("camera", handlePermissionStateChange);
    observePermissionStateChange("microphone", handlePermissionStateChange);
  }, []);

  useEffect(() => {
    requestPermission();
  }, []);

  return { hasUserGrantedPermissions, requestPermission };
}

const VERBOSE = false;

type PermissionsCallback = (granted: boolean, error?: string) => void;

function requestCameraAndMicrophonePermissions(
  callback: PermissionsCallback,
): void {
  // Check if the browser supports media devices
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request access to the camera and microphone
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(function (stream) {
        // Access granted
        VERBOSE && console.log("Permission granted for camera and microphone.");

        // Do something with the stream (e.g., display it in a video element)
        const videoElement = document.createElement("video");
        videoElement.srcObject = stream;
        videoElement.autoplay = true;
        document.body.appendChild(videoElement);

        // Remove the video element after a certain period or event
        setTimeout(() => {
          videoElement.pause();
          videoElement.srcObject = null;
          document.body.removeChild(videoElement);
          // Stop all tracks to release the camera and microphone resources
          stream.getTracks().forEach((track) => track.stop());
          VERBOSE && console.log("Video element removed and stream stopped.");
        }, 10); // Adjust the timeout duration as needed

        // Call the callback function indicating success
        callback(true);
      })
      .catch(function (error) {
        // Handle errors here
        VERBOSE &&
          console.error(
            "Permission denied for camera and/or microphone:",
            error,
          );

        // Call the callback function indicating failure with the error message
        callback(false, error.message);
      });
  } else {
    VERBOSE &&
      console.error("Media devices are not supported in this browser.");

    // Call the callback function indicating failure with a custom error message
    callback(false, "Media devices are not supported in this browser.");
  }
}

type PermissionStatusCallback = (state: PermissionState) => void;

export function observePermissionStateChange(
  permissionName: "camera" | "microphone",
  callback: PermissionStatusCallback,
): Promise<() => void> {
  return new Promise((resolve, reject) => {
    // Check if the Permissions API is supported
    if (navigator.permissions) {
      // Query the current permission state
      navigator.permissions
        .query({ name: permissionName as PermissionName })
        .then((permissionStatus) => {
          // Initial state
          callback(permissionStatus.state);

          // Define the change handler
          const handleChange = () => {
            VERBOSE &&
              console.log(
                `Permission state for ${permissionName} changed to ${permissionStatus.state}.`,
              );
            callback(permissionStatus.state);
          };

          // Listen for changes to the permission state
          permissionStatus.addEventListener("change", handleChange);

          // Return a cleanup function
          resolve(() => {
            permissionStatus.removeEventListener("change", handleChange);
          });
        })
        .catch((error) => {
          console.error(`Error querying ${permissionName} permission:`, error);
          // Return a no-op cleanup function in case of error
          resolve(() => {});
        });
    } else {
      console.error("Permissions API is not supported in this browser.");
      // Return a no-op cleanup function if the Permissions API is not supported
      resolve(() => {});
    }
  });
}
