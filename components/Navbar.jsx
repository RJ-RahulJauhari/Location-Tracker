"use client";

import React from 'react';
import Link from 'next/link';
import { HomeIcon, SettingsIcon, MenuIcon } from 'lucide-react';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'; // Import UserButton, SignedIn, and SignedOut
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from './SearchBar';
import ActionDrawer from '@/components/ActionDrawer';
import MobileNavActions from './MobileNavActions';

const Navbar = () => {
  return (
    <div className="bg-text-color border-b-[1px] border-text-color px-5 py-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        {/* App Name */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <Link className="font-extrabold text-lg dark:text-white" href="/home" to={"/home"}>
            Location Hub
          </Link>

          {/* For mobile, show icons as a row */}
          <div className="flex gap-2 mt-2 sm:mt-0 sm:hidden">
            <ActionDrawer /> {/* ActionDrawer button */}
            <Link className="hoverable p-2" href="/home">
              <HomeIcon />
            </Link>
            <ThemeToggle />
            <SignedOut>
            <Link className="hoverable p-2" href="/">
              <SettingsIcon />
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton /> {/* UserButton from Clerk */}
          </SignedIn>
          </div>
        </div>

        {/* Search Bar */}
        <div className="my-2 sm:w-1/3 sm:flex sm:justify-center sm:my-2">
          <SearchBar />
        </div>

        {/* Icons for larger screens */}
        <div className="hidden sm:flex sm:gap-2 sm:items-center">
          <Link className="hoverable p-2" href="/home">
            <HomeIcon />
          </Link>
          <ThemeToggle />
          <SignedOut>
            <Link className="hoverable p-2" href="/">
              <SettingsIcon />
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton /> {/* UserButton from Clerk */}
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
