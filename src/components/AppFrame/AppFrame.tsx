import React from "react";

type Props = {
  children: React.ReactNode;
};

const AppFrame = ({ children }: Props) => {
  return (
    <>
      <div className="border-accent fixed inset-0 border-[12px] h-screen pointer-events-none z-20"></div>
      <div className="flex flex-col items-center justify-center bg-light text-dark min-h-screen">
        {children}
      </div>
    </>
  );
};

export default AppFrame;
