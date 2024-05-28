"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";


type Props = {
  label: string;
  name: string;
  placeholder: string;
  onChange?: (newValue: string) => void;
  onCommit?: (newValue: string) => void;
  onCancel?: () => void;
  value?: string;
  error?: string | undefined;
  autoFocus?: boolean;
};

const Textfield = ({
  label,
  placeholder,
  onChange,
  onCommit,
  value,
  name,
  autoFocus,
  error,
}: Props) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (typeof value === "string") {
      setInternalValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = () => {
    onCommit?.(internalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Escape") {
      inputRef.current.blur();
    }
  };

  return (
    <label className="flex flex-col items-start">
      <div
        className={`${error ? "outline outline-red-700" : "outline-accent"} ${isFocused ? "outline outline-2" : error && "outline-1"} flex w-full select-none flex-col rounded-2xl bg-[rgba(191,53,62,.08)] px-5 py-4 text-left text-dark`}
      >
        <motion.div
          className="font-sans-sm font-normal "
          initial={{
            opacity: 0.5,
          }}
          animate={{
            opacity: isFocused ? 0.8 : 0.5,
          }}
        >
          {label}
        </motion.div>
        <input
          autoFocus={autoFocus}
          name={name}
          ref={inputRef}
          className="font-sans-base bg-transparent font-bold placeholder-dark placeholder-opacity-30 outline-none"
          onBlur={() => {
            setIsFocused(false);
            handleBlur();
          }}
          onKeyDown={handleKeyDown}
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.div
            className="font-sans-xs flex overflow-hidden pl-4 text-red-700"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <span className="my-1">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </label>
  );
};

export default Textfield;
