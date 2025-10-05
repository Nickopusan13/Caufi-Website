"use client";

import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/assets/pic1.jpg",
    title:
      "Made with organic cotton and plant-based dyes gentle on your skin and the planet.",
  },
  {
    image: "/assets/pic2.avif",
    title:
      "Sustainably made from breathable organic fibers for everyday comfort.",
  },
];

export default function ImageScroller() {
  return (
    <Swiper
      loop={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      modules={[Pagination, Autoplay, Navigation, EffectFade]}
      navigation={true}
      spaceBetween={10}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-[300px] lg:h-[600px]">
            <Image
              className="object-cover"
              loading="lazy"
              src={slide.image}
              alt="Caufi Clothes"
              fill
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <h2 className="text-[25px] lg:text-[48px] max-w-[90%] text-center text-white font-semibold">
                {slide.title}
              </h2>
              <motion.button
                type="button"
                className="mt-10 px-4 py-3 rounded-2xl text-rose-900 text-[13px] lg:text-base lg:px-6 lg:py-6 font-semibold"
                whileHover={{
                  scale: 1.3,
                  backgroundColor: "#B91C1C",
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.95 }}
                style={{ background: "#C7A3A3" }}
              >
                Shop All
              </motion.button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
