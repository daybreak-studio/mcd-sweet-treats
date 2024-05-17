import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const speedee_regular = localFont({
  src: "../../public/typography/speedee/Speedee_Rg.woff2",
  display: "swap",
  variable: "--font-speedee-regular",
  weight: "400",
});

const speedee_bold = localFont({
  src: "../../public/typography/speedee/Speedee_Bd.woff2",
  display: "swap",
  variable: "--font-speedee-bold",
  weight: "600",
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
      <body className={`${speedee_regular.variable} ${speedee_bold.variable}`}>
        {children}
      </body>
    </html>
  );
}
