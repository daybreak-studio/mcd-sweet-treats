import React, { useEffect } from "react";
import {
  ToastOptions,
  ToastOptionsIdentifiable,
  defaultToastOptions,
} from "./ToastOptions";
import { motion } from "framer-motion";

type Props = Partial<ToastOptionsIdentifiable> & {
  onDismiss?: () => void;
  index?: number;
};

const DEFAULT_TOAST_TIMETOUT = 3000;

const Toast = ({
  onDismiss,
  text,
  icon,
  canDismiss,
  index,
  duration,
  id,
}: Props = defaultToastOptions) => {
  // do a timeout
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        onDismiss?.();
      },
      duration ? duration : DEFAULT_TOAST_TIMETOUT,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [duration, onDismiss]);

  return (
    <motion.div
      layoutId={id}
      initial={{
        opacity: 0,
        y: -4,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -4,
      }}
      className="z-5 font-sans-sm flex max-w-72 gap-4 rounded-3xl bg-dark px-5 py-3 text-light"
    >
      {icon && <div>{icon}</div>}
      <div>{text}</div>
      {canDismiss && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="opacity-50"
          onClick={onDismiss}
        >
          Dismiss
        </motion.button>
      )}
    </motion.div>
  );
};

export default Toast;
