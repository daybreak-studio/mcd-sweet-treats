import React from "react";

type Props = {
  children: React.ReactNode;
};

const Taost = ({ children }: Props) => {
  return <div className="rounded-md bg-dark">{children}</div>;
};

export default Taost;
