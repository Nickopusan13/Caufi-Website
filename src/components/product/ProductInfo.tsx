"use client";

import { motion } from "framer-motion";
import {
  ColorDropDown,
  LikeButton,
  StarRating,
  ProductSize,
} from "./ProductComponent";
import Image from "next/image";
import { ProductInfoImages } from "./item";
import { useState } from "react";

const paymentMethod = [
  "/icon/BRI.png",
  "/icon/BCA.png",
  "/icon/DANA.png",
  "/icon/OVO.png",
  "/icon/SHOPEEPAY.png",
  "/icon/MANDIRI.png",
];

export default function ProductInfo() {
  const MotionImage = motion.create(Image);
  const [selectedImage, setSelectedImage] = useState({
    src: ProductInfoImages.images[0],
    alt: ProductInfoImages.title,
  });
  return (
    <div className="text-black flex flex-col lg:flex-row">
      <div className="flex gap-2 h-[400px] lg:h-[500px] lg:justify-normal justify-center">
        <div className="flex w-[120px] flex-col gap-2 h-full">
          {ProductInfoImages.images.map((image, index) => (
            <button
              type="button"
              key={index}
              className="relative flex-1 w-full"
              onClick={() =>
                setSelectedImage({ src: image, alt: ProductInfoImages.title })
              }
            >
              <MotionImage
                key={index}
                src={image}
                alt={ProductInfoImages.title}
                className="object-cover"
                loading="lazy"
                fill
              />
            </button>
          ))}
        </div>
        <div className="w-[400px] h-full">
          <div className="relative w-full h-full">
            <MotionImage
              key={selectedImage.src}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              fill
            />
          </div>
        </div>
      </div>
      <div className="lg:ml-10 mt-2 lg:mt-0 w-full flex flex-col dark:text-white">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-[20px]">{ProductInfoImages.title}</h1>
          <LikeButton size={30} />
        </div>
        <StarRating
          size={20}
          rating={ProductInfoImages.review.rating}
          reviewCount={ProductInfoImages.review.count}
          maxStars={5}
        />
        <div className="flex gap-2 font-bold py-2">
          <p className="before:content-['Rp.']">
            {ProductInfoImages.price.toLocaleString("id-ID")}
          </p>
          <p className="before:content-['Rp.'] line-through opacity-40">
            {ProductInfoImages.discount.toLocaleString("id-ID")}
          </p>
        </div>
        <ColorDropDown color={ProductInfoImages.color} />
        <ProductSize size={ProductInfoImages.size} />
        <div className="flex justify-around mt-10 text-white">
          <motion.button
            className="bg-black px-10 py-5 rounded-2xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy Now
          </motion.button>
          <motion.button
            className="bg-[#7D0000] px-10 py-5 rounded-2xl"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
        <div className="flex items-center justify-center mt-4 w-full transition-all duration-300">
          <div className="bg-[#D9D9D9] dark:bg-[#262626] p-4 rounded-2xl">
            <span className="text-[#707070]">
              Enjoy{" "}
              <a
                className="border-b font-bold dark:hover:text-[#C1C1C1] hover:text-[#2E2E2E]"
                href=""
              >
                FREE express
              </a>{" "}
              &{" "}
              <a
                className="border-b font-bold dark:hover:text-[#C1C1C1]  hover:text-[#2E2E2E]"
                href=""
              >
                FREE returns
              </a>{" "}
              on order over Rp.900.000
            </span>
          </div>
        </div>
        <div className="flex mt-5 lg:mt-10 justify-center items-center = useContext(second) flex-col gap-2 dark:text-white">
          <h1 className="opacity-50">Payment Method</h1>
          <div className="flex flex-wrap lg:flex-row justify-center lg:justify-normal gap-5">
            {paymentMethod.map((payment) => {
              return (
                <motion.img
                  className="w-15 object-contain"
                  key={payment}
                  src={payment}
                  alt=""
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
