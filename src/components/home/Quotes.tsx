"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MotionImage = motion.create(Image);

export default function Quotes() {
  return (
    <div className="w-full h-full pt-20 lg:pt-20 lg:pb-20 flex justify-center lg:justify-between items-center flex-col lg:flex-row">
      <a href="#">
        <motion.div
          initial={{ rotate: 15, boxShadow: "0px 4px 24px #2C0B0B" }}
          whileHover={{ rotate: 20, scale: 1.03 }}
          className="w-[200px] h-[300px] lg:w-[300px] lg:h-[500px] lg:ml-30 bg-gray-500"
        >
          <MotionImage
            src="/assets/ex3.jpg"
            alt="Model"
            className="object-cover rounded-md shadow-2xl shadow-black dark:brightness-75"
            style={{ rotate: -20 }}
            loading="lazy"
            fill
          />
        </motion.div>
      </a>
      <div className="lg:max-w-[50%] pt-10 px-2 lg:pr-20">
        <div className="lg:font-bold lg:text-black hidden lg:text-[100px] lg:block lg:text-center mb-[-50px] dark:text-white">{`"`}</div>
        <h1 className="font-itim text-[25px] lg:text-[50px] text-black leading-tight text-center pb-10 dark:text-white">
          Every stitch, every thread, every layer made to match your energy and
          built to stand out in any crowd.
        </h1>
        <div className="border-2 border-black dark:border-white"></div>
        <div className="text-black flex justify-between mx-2 font-bold dark:text-white">
          <h1>CAUFI.</h1>
          <h1>DEVELOPER</h1>
        </div>
      </div>
    </div>
  );
}
