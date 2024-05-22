"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  placeholder: string;
  onChange?: (newValue: string) => void;
  onCommit?: (newValue: string) => void;
  onCancel?: () => void;
  value?: string;
};

const Textfield = ({
  label,
  placeholder,
  onChange,
  onCommit,
  value,
}: Props) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [internalValue, setInternalValue] = useState("");

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
    if (e.code === "Enter") {
      inputRef.current.blur();
    }

    if (e.code === "Escape") {
      inputRef.current.blur();
    }
  };

  return (
    <label className="bg-[rgba(191,53,62,.08)] flex flex-col px-3 py-2 text-dark rounded-2xl focus-within:outline focus-within:outline-accent select-none">
      <div className="font-sans-sm font-normal">{label}</div>
      <input
        ref={inputRef}
        className="bg-transparent font-bold font-sans-base outline-none placeholder-dark placeholder-opacity-30"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        value={internalValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Textfield;
