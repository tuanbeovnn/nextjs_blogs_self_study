"use client";
import { PropsWithChildren } from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
