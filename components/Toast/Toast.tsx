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
      className={`font-sans-sm flex w-full max-w-[400px] gap-3 rounded-3xl bg-dark ${icon ? "pl-3 pr-5" : "px-5"} py-3 text-light`}
    >
      <div className="flex gap-3">
        {icon && <div className="flex items-center justify-center">{icon}</div>}
        <div>{text}</div>
      </div>
      {canDismiss && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="ml-auto opacity-50"
          onClick={onDismiss}
        >
          Dismiss
        </motion.button>
      )}
    </motion.div>
  );
};

export default Toast;
