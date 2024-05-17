import AppFrame from "@/components/AppFrame/AppFrame";
import Button from "@/components/Button/Button";
import { LogoLockup } from "@/components/LogoLockup/LogoLockup";
import Image from "next/image";

export default function Home() {
  return (
    <AppFrame>
      <div className="mt-8 mb-auto">
        <LogoLockup />
      </div>
      <h1 className="font-serif-lg">Send grandma a sweet message</h1>
      <div>Your video goes here</div>
      <div className="mb-12">
        <Button>Continue</Button>
      </div>
      <div className="mb-8 font-sans-xs opacity-50">
        Select languages available.
      </div>
    </AppFrame>
  );
}
