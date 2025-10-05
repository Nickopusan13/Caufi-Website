"use client";

import { useState } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { availabilityFilters } from "./Item";

export const AvailabilityFilters: React.FC = () => {
  const [checked, setChecked] = useState(
    Array(availabilityFilters.length).fill(false)
  );
  const handleCheckChanged = (index: number, value: boolean) => {
    setChecked((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  return (
    <div className="flex flex-col w-full overflow-y-auto max-h-100 min-w-60 overflow-x-hidden scrollbar-thin">
      {availabilityFilters.map((item: { title: string }, index: number) => {
        return (
          <motion.div key={item.title}>
            <label
              htmlFor={`check-${index}`}
              className="w-full items-center gap-1 flex px-5 py-3 cursor-pointer hover:bg-[#a9a9a9] hover:border-l-5 border-red-600 transition-all duration-200"
            >
              <Checkbox.Root
                id={`check-${index}`}
                checked={checked[index]}
                onCheckedChange={(val) =>
                  handleCheckChanged(index, val === true)
                }
                className="w-4 h-4 mr-1 rounded-[5px] border border-gray-800 dark:border-gray-400 flex items-center justify-center outline-none focus:outline-none focus:ring-0"
              >
                <Checkbox.Indicator>
                  <CheckIcon className="w-full h-full  text-white bg-blue-800 rounded-[5px]" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span>{item.title}</span>
            </label>
          </motion.div>
        );
      })}
    </div>
  );
};
