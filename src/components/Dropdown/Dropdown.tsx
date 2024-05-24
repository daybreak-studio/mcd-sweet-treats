import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ArrowDown from "../Graphics/ArrowDown";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";
import Heart from "../Graphics/Heart";

type Props = {
  label: string;
  value?: string;
  children: React.ReactNode;
  onChange?: (newValue: string) => void;
};

const DropdownMenu = ({ label, value, onChange, children }: Props) => {
  const selectRef = useRef() as MutableRefObject<HTMLSelectElement>;

  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
    setIsFocused(false);
    setInternalValue(e.target.value);
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (isFocused) {
      selectRef.current.focus();
      return;
    }
    selectRef.current.blur();
  }, [isFocused]);

  return (
    <label className="relative flex flex-col text-center">
      <div className="font-sans-sm select-none px-3 py-2 font-bold uppercase">
        {label}
      </div>
      <TracyShadow color={"#643525"} elevation={1}>
        <motion.div
          className="relative w-full"
          animate={{
            scale: isFocused ? 0.98 : 1,
          }}
        >
          <div className="absolute right-0 top-0 mr-4 flex h-full items-center">
            <ArrowDown fill={isFocused ? "#ff4f14" : "#220505"} />
          </div>
          <select
            ref={selectRef}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={internalValue}
            onChange={handleChange}
            className="font-sans-base w-full cursor-pointer rounded-full border border-dark bg-light px-3 py-4 text-center font-bold text-dark outline-none focus-within:border focus-within:border-accent focus-within:text-accent"
          >
            <option disabled value="">
              Select
            </option>
            {children}
          </select>
        </motion.div>
        <motion.div
          className="absolute -left-8 top-1/4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isFocused ? 1 : 0,
            x: isFocused ? 0 : 10,
            rotate: isFocused ? -20 : -10,
            scale: 1.5,
          }}
        >
          <Heart />
        </motion.div>
        <motion.div
          className="absolute -right-8 bottom-1/4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isFocused ? 1 : 0,
            x: isFocused ? 0 : -10,
            rotate: isFocused ? 17 : 10,
            scale: 0.8,
          }}
        >
          <Heart />
        </motion.div>
      </TracyShadow>
    </label>
  );
};

const DropdownItem = ({
  children,
  value,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return <option value={value}>{children}</option>;
};

const Dropdown = {
  menu: DropdownMenu,
  item: DropdownItem,
};

export default Dropdown;
