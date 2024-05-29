import React from "react";
import BottomBanner from "../Banner/BottomBanner";

type Props = {
  children: React.ReactNode;
  caption?: string;
};

const AppFrame = ({ children, caption }: Props) => {
  return (
    <main>
      <div className="pointer-events-none fixed inset-0 z-50 h-[100dvh] border-[1rem] border-accent xl:border-[1rem]">
        <div className="font-sans-xs fixed bottom-0 w-full px-8 opacity-50">
          {caption && <BottomBanner>{caption}</BottomBanner>}
        </div>
      </div>
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-t from-[#F3BAC3] to-[#F9D0D6] p-8 text-dark">
        {children}
      </div>
    </main>
  );
};

export default AppFrame;
