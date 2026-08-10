import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./container.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harmoniq",
  description:
    "Harmoniq is a multi-page web application for discovering, creating, and sharing articles within a community",
  openGraph: {
    title: "Harmoniq",
    url: "http://localhost:3000/",
    description:
      "Harmoniq is a multi-page web application for discovering, creating, and sharing articles within a community",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Harmoniq logo",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable}`}>
      <body>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
