import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import { ToastOptions, ToastOptionsIdentifiable } from "./ToastOptions";
import useIsFirstRender from "@/hooks/isFirstRender";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { v1 as uuidv1 } from "uuid";

type Props = {
  className?: string;
};

// handler internal to this file
let _handleToastRequest: Function = () => {
  throw "Unable to show toast before <ToastRenderer/> mounted.";
};

const ToastRenderer = (props: Props) => {
  const [toasts, setToasts] = useState<ToastOptionsIdentifiable[]>([]);

  // mount the tigger as a call back on first render
  if (useIsFirstRender()) {
    _handleToastRequest = (toast: ToastOptions) => {
      // add toast to the toast state
      const id = uuidv1();
      setToasts((prev) => [...prev, { id, ...toast }]);
    };
  }

  const removeToast = (removeId: string) => {
    // remove array from here
    setToasts((prev) => {
      return prev.filter(({ id }) => id !== removeId);
    });
  };

  return (
    <div
      className={`fixed left-1/2 top-0 z-50 my-8 flex w-full -translate-x-1/2 flex-col items-center gap-2 px-8`}
    >
      <LayoutGroup>
        <AnimatePresence initial={true}>
          {toasts.map((toastOptions, index) => (
            <Toast
              {...toastOptions}
              key={toastOptions.id}
              index={index}
              onDismiss={() => {
                removeToast(toastOptions.id);
              }}
            />
          ))}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};

// send toast signal to re-render
export const toast = (options: ToastOptions) => _handleToastRequest(options);

export default ToastRenderer;
