// app/page.js (or another relevant file if using a different route)
"use client";
import React, { useEffect } from 'react';
import { useClerk } from '@clerk/nextjs';
import HomePage from '@/pages/HomePage';

const Page = () => {
  const { user } = useClerk();

  useEffect(() => {
    const checkUserAndSave = async () => {
      if (user) {
        try {
          console.log('User exists:', user);
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user.fullName ,
              email: user.primaryEmailAddress?.emailAddress
            }),
          });

          if (response.ok) {
            console.log('User data saved successfully');
          } else {
            const errorData = await response.json();
            console.error('Failed to save user data:', errorData);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.log('No user is authenticated');
      }
    };

    checkUserAndSave();
  }, [user]);

  return (
    <div className="w-full h-3/4 sm:h-full">
      <HomePage />
    </div>
  );
};

export default Page;
