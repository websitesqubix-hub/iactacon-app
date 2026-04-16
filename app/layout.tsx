import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IACTACON 2027",
  description: "Official Conference App",
  
  manifest: "/manifest.json",

  themeColor: "#1e3a8a",

  icons: {
    icon: "https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg",
    apple: "https://iactacon2027.com/wp-content/uploads/2026/02/cropped-logo-1.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}