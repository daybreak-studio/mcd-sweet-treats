import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import VideoUploadProvider from "@/components/VideoUploadProvider/VideoUploadProvider";
import UserInfoProvider from "@/components/UserInfoProvider/UserInfoProvider";

const font_speedee = localFont({
  src: [
    {
      path: "../../public/typography/speedee/Speedee_Rg.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/typography/speedee/Speedee_Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-speedee",
});

export const metadata: Metadata = {
  title: "Grandma McFlurry",
  description: "Send grandma a sweet message",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overscroll-none bg-accent ${font_speedee.variable}`}>
        <UserInfoProvider>
          <VideoUploadProvider>{children}</VideoUploadProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
}
