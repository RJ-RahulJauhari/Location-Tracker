"use client";

import "../../../app/globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


import { useState, useEffect } from "react";



export default function HomeLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
  );
}
