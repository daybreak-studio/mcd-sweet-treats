import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
  value?: boolean;
  onChange?: (isChecked: boolean) => void;
};

const Checkbox = ({ children, onChange, value = false }: Props) => {
  const [isChecked, setIsChecked] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    onChange?.(isChecked);
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(value);
  }, [value]);

  return (
    <label className="flex flex-row gap-2 font-sans-sm items-center select-none">
      <input
        className="w-0"
        type="checkbox"
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      />
      <motion.div
        animate={{
          backgroundColor: isChecked ? "#220505" : "#F9D0D6",
          opacity: isChecked || isFocused ? 1 : 0.5,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
          outline: isFocused ? "2px solid #FF4F14" : "",
        }}
        className="border-2 border-dark w-4 h-4 flex items-center justify-center p-2 rounded-md"
      >
        <motion.div
          animate={{
            opacity: isChecked ? 1 : 0,
            y: isChecked ? 0 : 10,
            transition: {
              duration: AnimationConfig.NORMAL,
              ease: AnimationConfig.EASING,
            },
          }}
        >
          <CheckedIcon />
        </motion.div>
      </motion.div>
      {children}
    </label>
  );
};

const CheckedIcon = () => (
  <svg
    width="13"
    height="12"
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7344 3L5.23438 8.5L2.73438 6"
      stroke="white"
      strokeWidth="1.94143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Checkbox;
