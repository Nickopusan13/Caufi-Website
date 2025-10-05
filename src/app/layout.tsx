import type { Metadata } from "next";
import {
  Amiko,
  Instrument_Sans,
  Irish_Grover,
  Itim,
  Inter,
  Poppins,
} from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Script from "next/script";

const amiko = Amiko({
  subsets: ["latin"],
  variable: "--font-amiko",
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const irishGrover = Irish_Grover({
  subsets: ["latin"],
  variable: "--font-grover",
  weight: ["400"],
  display: "swap",
});

const itim = Itim({
  subsets: ["latin"],
  variable: "--font-itim",
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caufi",
  description: "Caufi – Modern fashion for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {" "}
          {`
            if (localStorage.theme === "dark") {
              document.documentElement.classList.add("dark");
            } else {
              document.documentElement.classList.remove("dark");
            }
          `}
        </Script>
      </head>
      <body
        className={`font-irishGrover ${poppins.variable} ${amiko.variable} ${instrumentSans.variable} ${itim.variable} ${irishGrover.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
