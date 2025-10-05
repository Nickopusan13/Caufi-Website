"use client";

import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { filterKey } from "./Item";
import { motion, AnimatePresence } from "framer-motion";

interface FilterProps {
  category: boolean;
  price: boolean;
  stock: boolean;
}

export default function AllFilters() {
  const [isOpen, setIsOpen] = useState<FilterProps>({
    category: true,
    price: true,
    stock: true,
  });
  const toggleFilter = (filterName: keyof FilterProps) => {
    setIsOpen((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };
  return (
    <div className="text-black dark:text-white">
      <div className="border-2 w-full"></div>
      <div className="flex flex-col mt-4 gap-5">
        {filterKey.map((item) => {
          return (
            <div key={item.title} className="flex flex-col items-center gap-5">
              <button
                type="button"
                className="flex items-center w-full justify-between px-5"
                onClick={() => toggleFilter(item.key)}
              >
                <h1 className="font-bold text-[20px]">{item.title}</h1>
                <motion.span
                  initial={false}
                  animate={{ rotate: isOpen[item.key] ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <FaChevronDown />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen[item.key] && (
                  <motion.div
                    key="dropdown"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full"
                  >
                    {item.component}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
