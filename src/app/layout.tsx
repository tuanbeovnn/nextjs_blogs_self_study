import Layout from "@/components/Layout";
import { ReduxProvider } from "@/sagas/provider";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProvider } from "@/components/Common/ThemeProvider";
import React from "react";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={workSans.className} suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
        </ReduxProvider>
        <ToastContainer bodyClassName="font-primary text-sm"></ToastContainer>
      </body>
    </html>
  );
}
