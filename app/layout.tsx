import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";

config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mumtaz Aziz",
  description: "Mumtaz Aziz",
  alternates: {
    canonical: "https://www.mumtazaziz.com",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
