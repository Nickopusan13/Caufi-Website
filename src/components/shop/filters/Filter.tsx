"use client";

import { AnimatePresence, motion } from "framer-motion";
import { filterShop, filterItem } from "./Item";
import { FaChevronLeft, FaChevronRight, FaSort } from "react-icons/fa";
import { IoCloseCircle, IoColorFilterSharp } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { PriceRange } from "./PriceRange";
import { CategoryFilter } from "./CategoryFilter";
import AllFilters from "./AllFilters";
import OutsideClickHandler from "react-outside-click-handler";
import { productCloth } from "../product-shop/Item";

export default function FilterProduct() {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const allFilterRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };
  useEffect(() => {
    document.documentElement.classList.toggle(
      "no-scroll",
      openFilter === "All Filters"
    );
    return () => document.documentElement.classList.remove("no-scroll");
  }, [openFilter]);
  return (
    <div className="text-[13px]">
      <div className="flex flex-col items-center">
        <h1 className="text-[20px] lg:text-[25px] font-bold">{`Women's Clothes`}</h1>
        <div className="flex relative items-center mt-5 w-full">
          <button
            className="absolute left-0 z-10 p-2 rounded-full shadow"
            onClick={scrollLeft}
          >
            <FaChevronLeft className="text-black dark:text-white" />
          </button>
          <div
            className="flex gap-1 lg:gap-2 overflow-x-scroll overflow-y-hidden scrollbar-none py-2 px-1 mx-10"
            ref={scrollRef}
          >
            {filterShop.map((item) => {
              return (
                <motion.button
                  className="bg-[#E2E2E2] text-black border-2 border-[#BEBEBE] py-1 px-3 rounded-[10px] shrink-0"
                  key={item}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 1.1 }}
                >
                  {item}
                </motion.button>
              );
            })}
          </div>
          <button
            className="absolute right-0 z-10 p-2 rounded-full shadow"
            onClick={scrollRight}
          >
            <FaChevronRight className="text-black dark:text-white" />
          </button>
        </div>
      </div>
      <OutsideClickHandler onOutsideClick={() => setOpenFilter(null)}>
        <div className="flex mt-2 mx-2 justify-between h-10">
          <div className="flex gap-3 text-black">
            {filterItem.map((item) => {
              const allFilters = item.title === "All Filters";
              const filterPrice = item.title === "Price Range";
              const filterCategory = item.title === "Category";
              const isOpen = openFilter === item.title;
              return (
                <div
                  className={`relative z-50 ${
                    !allFilters ? "hidden md:block lg:block" : ""
                  }`}
                  key={item.title}
                >
                  <motion.button
                    className={`flex bg-[#BBBBBB] px-3 py-2 items-center border-2 border-[#BEBEBE] transition-all duration-200 ${
                      isOpen && !allFilters
                        ? "pb-5 rounded-b-none rounded-t-2xl"
                        : "pb-2 rounded-2xl"
                    }`}
                    onClick={() => {
                      setOpenFilter(isOpen ? null : item.title);
                    }}
                  >
                    {allFilters && item.icon && (
                      <span className="mr-1">{item.icon}</span>
                    )}
                    <span>{item.title}</span>
                    {!allFilters && item.icon && (
                      <span className="ml-1 flex">
                        <motion.span
                          initial={false}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="inline-block origin-center"
                        >
                          {item.icon}
                        </motion.span>
                      </span>
                    )}
                  </motion.button>
                  {filterPrice && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bg-[#BBBBBB] px-6 py-4 rounded-bl-2xl rounded-r-2xl"
                        >
                          <PriceRange />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                  {filterCategory && (
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bg-[#BBBBBB] rounded-bl-2xl rounded-r-2xl"
                        >
                          <CategoryFilter />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
            <button className="h-10 text-red-600">Reset</button>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center">
              <p>{productCloth.length} Products</p>
            </div>
            <div className="border-1 border-gray-400"></div>
            <button className="flex items-center gap-1">
              <span>
                {" "}
                <FaSort />
              </span>
              <motion.span
                className="bg-[#BBBBBB] border-[#BEBEBE] rounded-full px-2 py-1 text-black"
                whileHover={{ scale: 1.1 }}
              >
                Sort By
              </motion.span>{" "}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {openFilter === "All Filters" && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-[100]"
                onClick={() => setOpenFilter(null)}
              />
              <motion.div
                ref={allFilterRef}
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 p-3 lg:p-5 w-[350px] h-full z-100 bg-white dark:bg-zinc-900 dark:text-white rounded-r-2xl overflow-x-hidden overflow-y-auto scrollbar scrollbar-track-white scrollbar-corner-gray-500 scrollbar-thumb-gray-500 dark:scrollbar-track-zinc-900"
              >
                <div className="flex justify-between items-center">
                  <h1 className="text-[25px] font-extrabold flex items-center gap-1">
                    <span>
                      <IoColorFilterSharp size={30} />
                    </span>
                    All Filters
                  </h1>
                  <motion.button
                    onClick={() => setOpenFilter(null)}
                    className="rounded-full"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IoCloseCircle
                      className="text-black dark:text-white hover:text-[#8f8f8f] transition-all duration-100"
                      size={35}
                    />
                  </motion.button>
                </div>
                <AllFilters />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </OutsideClickHandler>
    </div>
  );
}
