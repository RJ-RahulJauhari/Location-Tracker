"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignIn } from "@clerk/clerk-react"; // Ensure correct import
import { SignUp } from "@clerk/clerk-react"; // Ensure correct import
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClerk } from "@clerk/clerk-react";

export default function Home() {
  const router = useRouter();
  const { user } = useClerk();
  const [activeTab, setActiveTab] = useState('sign-in');

  const handleSignInSuccess = async (event) => {
    if (user) {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          savedLocations: [],
        }),
      });

      if (response.ok) {
        
        router.push('/home');
      } else {
        console.error('Failed to save user data');
      }
    }
  };

  const switchToSignUpTab = () => {
    setActiveTab('sign-up');
  };

  return (
    <main className="min-h-screen h-full w-full flex overflow-hidden bg-black">
      {/* Slanted Left Section */}
      <div className="hidden sm:relative sm:w-1/2 sm:h-screen sm:flex sm:items-center sm:justify-center sm:overflow-hidden sm:-skew-x-12">
        <div className="absolute inset-0 transform bg-black">
          {/* Background Image */}
          <img
            className="absolute inset-0 object-cover w-full h-full"
            src="https://wallpapers.com/images/hd/qhd-earth-on-space-kiekw28xeblbjdy9.jpg"
            alt="Background"
          />
        </div>
        {/* Text Container */}
        <div className="relative z-10 flex justify-center items-center w-full h-full">
          <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl text-white">
            Location Hub
          </h1>
        </div>
      </div>
      {/* Right Section */}
      <div className="min-h-screen w-full flex flex-col justify-center items-center sm:w-1/2 sm:flex sm:flex-col sm:items-center sm:justify-center">
        <img
          className="sm:hidden absolute inset-0 z-0 object-cover w-full h-full"
          src="https://wallpapers.com/images/hd/qhd-earth-on-space-kiekw28xeblbjdy9.jpg"
          alt="Background"
        />
        <h1 className="sm:hidden text-center text-6xl font-extrabold tracking-tight lg:text-8xl text-white pb-5 z-10">
          Location Hub
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="sign-in">Sign-In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign-Up</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignIn
              afterSignInUrl="/home"
              onSignInSuccess={handleSignInSuccess}
              signUpUrl="#"
              signUpLinkProps={{
                onClick: (e) => {
                  e.preventDefault();
                  switchToSignUpTab();
                },
              }}
            />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUp
              afterSignUpUrl="/home"
              onSignInSuccess={handleSignInSuccess}
            />
          </TabsContent>
          <TabsContent value="other">
            <Button onClick={() => router.push('/home')}>Continue without creating an account!</Button>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
