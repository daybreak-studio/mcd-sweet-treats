import React from "react";

type Props = {
  children: React.ReactNode;
  caption?: string;
};

const AppFrame = ({ children, caption }: Props) => {
  return (
    <main>
      <div className="pointer-events-none fixed inset-0 z-50 h-[100svh] border-[1rem] border-accent xl:border-[1rem]"></div>
      <div className="relative flex min-h-[100svh] flex-col bg-gradient-to-t from-[#F3BAC3] to-[#F9D0D6] p-8 text-dark">
        {children}
      </div>
      <div className="font-sans-xs fixed bottom-0 mb-8 w-full px-8 opacity-50">
        <h5 className="w-full text-center">{caption}</h5>
      </div>
    </main>
  );
};

export default AppFrame;
