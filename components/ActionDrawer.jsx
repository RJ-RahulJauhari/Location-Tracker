"use client";

import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from './ui/button';

const ActionDrawer = () => {
  return (
    <Drawer className="fixed bottom-0 left-0 right-0 sm:hidden">
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Actions</DrawerTitle>
          <DrawerDescription>Manage your actions here.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActionDrawer;
