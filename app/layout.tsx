import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IACTACON 2027",
  description: "Official Conference App",

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "IACTACON 2027",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}