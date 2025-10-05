"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { promoSlides } from "./Item";

export default function Promo() {
  return (
    <div className="w-full h-full pb-10 pt-10 transition-colors duration-300">
      <div className="rounded-b-4xl lg:pb-10 flex flex-col lg:flex-row justify-around items-center pt-5 bg-[#B3FFCB] lg:max-w-[90%] w-full mx-auto dark:bg-[#294031]">
        <div className="flex flex-col lg:items-baseline lg:justify-start text-center lg:text-left justify-center items-center lg:w-[30%]">
          <div className="flex">
            <div className="text-black dark:text-white font-bold text-[30px] lg:text-[36px] text-center">
              <h1 className="flex gap-1">
                MATCH <span className="font-irish-grover underline">INDIE</span>
              </h1>
              <div className="font-irish-grover underline">AESTHETICS</div>
            </div>
            <div className="font-ink-free text-white flex justify-center items-center pl-10 text-[25px]">
              <div className="bg-[#4A2774]/60 absolute rounded-full blur-md px-14 py-8"></div>
              <span className="relative">-20%</span>
            </div>
          </div>
          <div className="text-black dark:text-white font-bold pt-5 lg:pt-10">
            Let’s try this new outfit looks super good, right? If you want more,
            just click Shop Now. Lots of cool discounts waiting!
          </div>
          <div className="w-full pt-5 pb-5 lg:pb-0 lg:pt-15 flex justify-center lg:flex-none lg:justify-start ">
            <motion.button
              className="text-white font-bold bg-[#4A2774] px-5 rounded-full flex justify-center items-center py-[20px] lg:mt-10"
              whileHover={{ scale: 1.2, backgroundColor: "#713AB3" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ backgroundColor: "#4A2774" }}
            >
              Shop Now <FaArrowRight className="ml-1" />
            </motion.button>
          </div>
        </div>
        <motion.div
          className="w-[90%] lg:w-[50%] pb-10 lg:pb-0 flex justify-center lg:justify-end rounded-4xl"
          whileHover={{ scale: 1.05 }}
        >
          <Swiper
            loop={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay, Navigation, EffectFade]}
            navigation={true}
            direction="horizontal"
            spaceBetween={5}
            className="rounded-4xl w-[700px] h-[400px] "
          >
            {promoSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={slide.image}
                  className="object-cover rounded-4xl dark:brightness-75 mx-auto"
                  fill
                  alt="Promo Caufi Image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
}
