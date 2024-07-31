// src/app/home/layout.tsx (or .js if you're using JavaScript)
"use client";

import { Roboto } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "../../../app/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ActionDrawer from "@/components/ActionDrawer";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';

const roboto = Roboto({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export default function HomeLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <html lang="en">
        <body className={roboto.className}>
              <div className="flex flex-row w-full h-full flex-wrap">
                {!isMobile && (
                  <div className="w-1/4 h-screen">
                    <Sidebar />
                  </div>
                )}
                <div className={`flex flex-col flex-1 h-screen`}>
                  <Navbar />
                  <div className="w-full h-full">
                    {children}
                    <div className="py-2 px-2 sm:hidden">
                      <Sidebar />
                    </div>
                  </div>
                </div>
              </div>
        </body>
      </html>
  );
}
