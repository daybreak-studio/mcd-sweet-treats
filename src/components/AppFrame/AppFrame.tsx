import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppFrame = ({ children }: Props) => {
  return (
    <>
      <div className="border-accent fixed inset-0 border-[12px] h-screen"></div>
      <div className="flex flex-col bg-light text-dark min-h-screen">
        {children}
      </div>
    </>
  );
};

export default AppFrame;
