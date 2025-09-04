//now we use this instead of _app.js

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from '../components/Layout';
import { StateContext } from "./context/StateContext";
import { Toaster } from "../components/ui/sonner"
import { ThemeProvider } from "next-themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Decibel Den",
description: "Your one-stop shop.",
  icons: {
    icon: "/DecibelDen.png", // path relative to the public folder
    shortcut: "/DecibelDen.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <StateContext>

              <Layout>
                <Toaster />
                    {children}
              </Layout>
          </StateContext>
                </ThemeProvider>
      </body>
    </html>
  );
}
