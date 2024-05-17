import AppFrame from "@/components/AppFrame/AppFrame";
import Image from "next/image";

export default function Home() {
  return (
    <AppFrame>
      <main className="m-12">
        <div className="font-sans-xs">font-sans-xs</div>
        <div className="font-sans-sm">font-sans-sm</div>
        <div className="font-sans-base mb-4">font-sans-base</div>
        <div className="font-serif-sm">font-serif-sm</div>
        <div className="font-serif-base">font-serif-base</div>
        <div className="font-serif-md">font-serif-md</div>
        <div className="font-serif-lg">font-serif-lg</div>
        <div className="font-serif-xl">font-serif-xl</div>
        <div className="font-serif-2xl">font-serif-2xl</div>
      </main>
    </AppFrame>
  );
}
