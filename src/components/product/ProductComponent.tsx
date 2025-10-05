"use client";

import { useState } from "react";
import { motion, spring } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaHeart,
  FaRegHeart,
  FaChevronDown,
} from "react-icons/fa";
import OutsideClickHandler from "react-outside-click-handler";

export const LikeButton = ({ size }: { size: number }) => {
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => setLiked(!liked);

  return (
    <motion.button
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: spring, stiffness: 300 }}
      onClick={toggleLiked}
      aria-label={liked ? "Unlike" : "Like"}
    >
      {liked ? (
        <FaHeart size={size} className="fill-red-600" />
      ) : (
        <FaRegHeart size={size} className="fill-gray-500" />
      )}
    </motion.button>
  );
};

export const StarRating = ({
  size,
  rating,
  reviewCount,
  maxStars,
}: {
  size: number;
  rating: number;
  reviewCount: number;
  maxStars: number;
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-blue-700" style={{ fontSize: `${size}px` }}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
      <span className="text-sm text-black dark:text-white font-medium">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-gray-500">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
};

export const ColorDropDown = ({ color }: { color: string[] }) => {
  const [selectedColor, setSelectedColor] = useState(color[0]);
  const [open, setOpen] = useState(false);
  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <div className="relative dark:text-white">
        <button
          type="button"
          className="flex w-full justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          <div>
            <span className="opacity-50">Color: </span>
            <span>
              {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
            </span>
          </div>
          <FaChevronDown />
        </button>
        {open && (
          <ul className="absolute z-10 w-full bg-gray-200 rounded-b-2xl dark:bg-zinc-800 overflow-y-auto h-50 scrollbar-thumb-gray-500 scrollbar-thin scrollbar-track-gray-200 dark:scrollbar-track-zinc-800">
            {color.map((color) => {
              const displayColor =
                color.charAt(0).toUpperCase() + color.slice(1);
              return (
                <li
                  className={` px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer text-[15px] ${
                    selectedColor === color ? "font-bold" : ""
                  }`}
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setOpen(false);
                  }}
                >
                  {displayColor}
                </li>
              );
            })}
          </ul>
        )}
        <div className="border opacity-30"></div>
      </div>
    </OutsideClickHandler>
  );
};

export const ProductSize = ({ size }: { size: string[] }) => {
  const [selectedSize, setSelectedSize] = useState(size[0]);
  return (
    <div>
      <div className="flex gap-1 mt-2 dark:text-white">
        <span className="opacity-50">Size : </span>
        <span>{selectedSize}</span>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex gap-2">
          {size.map((size) => (
            <button
              className="bg-[#D9D9D9] min-w-10 rounded-[5px] dark:text-black hover:bg-[#A0A0A0] active:bg-[#A0A0A0]"
              onClick={() => {
                setSelectedSize(size);
              }}
              key={size}
            >
              {size}
            </button>
          ))}
        </div>
        <div>
          <a
            className="opacity-50 border-b hover:text-[#2E2E2E] active:text-[#2E2E2E] dark:hover:opacity-80 dark:hover:text-white dark:text-white"
            href="#"
          >
            View size guide
          </a>
        </div>
      </div>
      <div className="border mt-2 opacity-30 dark:border-white"></div>
    </div>
  );
};
