"use client";

import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const EditorButton = ({
  icon,
  onClick,
  desc,
  isActive = false,
  disabled,
}: {
  icon: ReactNode;
  onClick?: () => void;
  desc: string;
  isActive?: boolean;
  disabled?: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`p-2 rounded
            ${isActive ? "bg-zinc-500 text-white" : "hover:bg-zinc-200"}
            ${disabled ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{desc}</p>
      </TooltipContent>
    </Tooltip>
  );
};
