import { Card, CardTitle } from "@/components/ui/card";
import { CiMenuKebab } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import Filter from "./Filter";

export default function ChartCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="bg-white w-full px-10 h-[400px]">
      <div className="flex justify-between">
        <CardTitle className="font-bold text-lg">{title}</CardTitle>
        <div className="flex gap-5 items-center justify-center">
          <Filter />
          <PopOverKebab />
        </div>
      </div>
      {children}
    </Card>
  );
}

export const PopOverKebab = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <CiMenuKebab className="cursor-pointer w-5 h-5" />
      </PopoverTrigger>
      <PopoverContent
        className="flex flex-col gap-2 w-30 -mr-4 text-sm"
        align="end"
        sideOffset={4}
      >
        <button className="hover:bg-zinc-100 rounded-md">View</button>
        <button className="hover:bg-zinc-100 rounded-md">Export</button>
        <div className="border-2"></div>
        <button className="hover:bg-zinc-100 rounded-md text-red-600">
          Remove
        </button>
      </PopoverContent>
    </Popover>
  );
};
