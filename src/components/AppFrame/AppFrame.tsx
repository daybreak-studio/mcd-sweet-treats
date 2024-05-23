import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppFrame = ({ children }: Props) => {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-20 h-[100svh] border-[12px] border-accent"></div>
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-light text-dark">
        {children}
      </div>
    </>
  );
};

export default AppFrame;
