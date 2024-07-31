"use client"

import { Roboto } from "next/font/google";
import {ClerkProvider,} from '@clerk/nextjs'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store";
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';

const roboto = Roboto({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

const metadata = {
  title: "Location Hub",
  description: "Location based Actions",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>
        <Provider store={store}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
           {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
