import React from "react";
import TracyShadow from "../TracyShadow";

type Props = {
  children: string;
  inverted?: boolean;
  onClick?: () => void;
};

const Button = ({ children, inverted, onClick }: Props) => {
  return (
    <TracyShadow color={"#643525"} elevation={1}>
      <button
        onClick={onClick}
        className={`h-16 rounded-full font-serif-base min-w-64 ${
          inverted ? "bg-light text-dark" : "bg-dark text-light"
        }`}
      >
        {children}
      </button>
    </TracyShadow>
  );
};

export default Button;
