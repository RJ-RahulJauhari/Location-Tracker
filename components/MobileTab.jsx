import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";

const MobileTab = ({ action, children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Badge variant="outline">{action}</Badge>
      </PopoverTrigger>
      <PopoverContent>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default MobileTab;
