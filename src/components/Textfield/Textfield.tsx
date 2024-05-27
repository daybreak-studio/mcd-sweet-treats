"use client";

import React, { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  name: string;
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
  name,
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
    <label className="flex select-none flex-col rounded-2xl bg-[rgba(191,53,62,.08)] px-3 py-2 text-left text-dark focus-within:outline focus-within:outline-accent">
      <div className="font-sans-sm font-normal opacity-50">{label}</div>
      <input
        name={name}
        ref={inputRef}
        className="font-sans-base bg-transparent font-bold placeholder-dark placeholder-opacity-30 outline-none"
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
