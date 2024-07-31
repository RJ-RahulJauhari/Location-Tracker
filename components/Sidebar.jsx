"use client"
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LocationBuzzer from './LocationBuzzer';
import SavedLocations from './SavedLocations';

const Sidebar = () => {

  return (
    <div className="min-h-screen max-h-full border-r-[1px] border-text-color p-4">
      <h1>Actions</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Location Buzzer</AccordionTrigger>
          <AccordionContent>
            <LocationBuzzer></LocationBuzzer>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Saved Locations</AccordionTrigger>
          <AccordionContent>
            <SavedLocations></SavedLocations>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-4">
          <AccordionTrigger>Settings</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default Sidebar;
