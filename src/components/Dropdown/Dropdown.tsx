import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ArrowDown from "../Graphics/ArrowDown";
import TracyShadow from "../TracyShadow";
import { motion } from "framer-motion";
import Heart from "../Graphics/Heart";
import { AnimWrap } from "../AnimWrap";

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
  const [isHovered, setIsHovered] = useState(false);

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
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const currentRef = selectRef.current;
    currentRef.addEventListener("mouseenter", handleMouseEnter);
    currentRef.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentRef.removeEventListener("mouseenter", handleMouseEnter);
      currentRef.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.label className="relative flex flex-col text-center">
      <motion.div variants={AnimWrap.bounceUpB}
        className="font-sans-sm select-none px-3 py-2 font-bold uppercase origin-top-left">
        {label}
      </motion.div>
      <TracyShadow color={"#643525"}
        variants={AnimWrap.bounceUpA}
        elevation={1}>
        <motion.div
          className="relative w-full"

          animate={{
            scale: isFocused ? 0.98 : 1,
          }}
        >
          <div className="absolute right-0 top-0 mr-4 flex h-full items-center">
            <ArrowDown fill={isHovered ? "#ff4f14" : "#220505"} />
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
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 10,
            rotate: isHovered ? -20 : -10,
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
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
            rotate: isHovered ? 17 : 10,
            scale: 0.8,
          }}
        >
          <Heart />
        </motion.div>
      </TracyShadow>
    </motion.label>
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
