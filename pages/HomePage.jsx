"use client";
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false, // Disable server-side rendering for this component
});

const HomePage = () => {
  return (
    <DynamicMap />
  );
}

export default HomePage;
