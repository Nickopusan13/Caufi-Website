"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type clothItem = {
  category: string;
  title: string;
  images: string[];
  price: number;
  color: string[];
  size: string[];
  href: string;
};

interface ProductSellProps {
  cloths: clothItem[];
}

const MotionImage = motion.create(Image);

export default function ProductSell({ cloths }: ProductSellProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const availableColors = [...new Set(cloths.flatMap((item) => item.color))];
  const availableSizes = [...new Set(cloths.flatMap((item) => item.size))];
  return (
    <>
      {cloths.map((cloth, index) => (
        <a
          href={cloth.href}
          key={index}
          className="ml-1 lg:ml-3 h-full flex flex-col"
          style={{ outline: "none" }}
        >
          <div className="relative w-full h-[215px] lg:h-[290px]">
            <AnimatePresence mode="wait">
              <MotionImage
                className="object-cover rounded-t-2xl lg:shadow-2xl"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                key={hoveredIndex === index ? "hover" : "default"}
                loading="lazy"
                src={hoveredIndex === index ? cloth.images[1] : cloth.images[0]}
                alt={cloth.title}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                fill
              />
            </AnimatePresence>
          </div>
          <div className="bg-[#f0f0f0] drop-shadow-2xl shadow-black flex flex-col dark:bg-[#191919] dark:text-white justify-center">
            <div className="px-2 py-1">
              <h1 className="text-[12px] lg:text-[14px] opacity-50">
                {cloth.category}
              </h1>
              <h2 className="font-bold text-[15px] lg:text-[17px]">
                {cloth.title}
              </h2>
              <p className="lg:hidden text-[12px] before:content-['Rp.'] right-0 font-bold text-red-800">
                {cloth.price.toLocaleString("id-ID")}
              </p>
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-1 lg:min-h-[12px]">
                  {availableColors.map((color, idx) => {
                    const isAvailable = cloth.color.includes(color);
                    return (
                      <div
                        key={idx}
                        className={`h-3 w-3 rounded-[3px] ${
                          isAvailable ? "" : "opacity-0"
                        }`}
                        style={{ backgroundColor: color }}
                      ></div>
                    );
                  })}
                </div>
                <div className="flex text-[12px] lg:text-[13px] lg:min-h-[20px]">
                  {availableSizes.map((size, idx) => {
                    const isAvailable = cloth.size.includes(size);
                    return (
                      <p
                        key={idx}
                        className={` px-[1px] opacity-60 ${
                          isAvailable
                            ? "text-black dark:text-white"
                            : "opacity-0"
                        }`}
                      >
                        {size}
                      </p>
                    );
                  })}
                </div>
                <p className="hidden lg:block text-[12px] before:content-['Rp.'] right-0 font-bold text-black dark:text-white">
                  {cloth.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </>
  );
}
