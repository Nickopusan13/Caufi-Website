import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

type ImageItem = {
  image: string[];
  title: string;
  price: string;
};
type ItemData = {
  title: string;
  items: string[];
};

export const ProductColumn = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  const splitIndex = Math.ceil(items.length / 2);
  const firstColumn = items.slice(0, splitIndex);
  const secondColumn = items.slice(splitIndex);
  return (
    <div className="text-black dark:text-white transition-colors duration-300 flex flex-col lg:flex-none">
      <h1 className="text-center pb-1 font-bold text-[15px] md:text-[18px] lg:text-[18px]">
        {title}
      </h1>
      <div className="border-1"></div>
      <div className="lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 lg:gap-x-6 text-center pt-2 grid grid-cols-2 overflow-visible text-[14px] md:text-[14px] lg:text-[15px]">
        <ul>
          {firstColumn.map((item, index) => (
            <li key={index}>
              <motion.a
                className="inline-block mb-1"
                whileHover={{ scale: 1.2, color: "red" }}
                whileTap={{ scale: 1.2, color: "blue" }}
                href="#"
              >
                {item}
              </motion.a>
            </li>
          ))}
        </ul>
        <ul>
          {secondColumn.map((item, index) => (
            <li key={index}>
              <motion.a
                className="inline-block mb-1"
                whileHover={{ scale: 1.2, color: "red" }}
                whileTap={{ scale: 1.2, color: "blue" }}
                href="#"
              >
                {item}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const DropDown = ({
  rightTitle,
  imageColumns,
  itemColumns,
}: {
  rightTitle: string;
  imageColumns: ImageItem[];
  itemColumns: ItemData[];
}) => {
  return (
    <div className="bg-[#E4E4E4] dark:bg-[#3B3B3B] rounded-b-2xl w-full h-full px-10 pt-5 pb-10 flex justify-between">
      <div className="flex w-full gap-10 justify-center">
        {itemColumns.map((item, index) => (
          <ProductColumn
            key={index}
            title={item.title}
            items={item.items}
          ></ProductColumn>
        ))}
      </div>
      <div className="hidden md:block lg:block w-full overflow-x-auto whitespace-nowrap lg:ml-30 ml-5 scrollbar-8 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-700">
        <h1 className="text-center pb-1 font-bold text-[18px] lg:text-[18px]">
          {rightTitle}
        </h1>
        <div className="flex gap-5 pt-1 min-w-max">
          {imageColumns.map((item, index) => (
            <motion.a
              key={index}
              href="#"
              className="rounded-2xl w-[200px] shrink-0 max-w-full shadow-2xl"
            >
              <Swiper
                loop={true}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay, Navigation, EffectFade]}
                navigation={true}
                direction="horizontal"
                spaceBetween={5}
                className="w-[200px] h-[150px]"
              >
                {item.image.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      className="object-cover rounded-t-2xl"
                      alt="image"
                      src={image}
                      fill
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <motion.div className="bg-transparent px-2 py-1 rounded-b-2xl text-center border-t-2 text-black">
                <motion.h1 className="font-bold text-[15px] lg:text-base">
                  {item.title}
                </motion.h1>
                <motion.p className="text-[10px] lg:text-[12px] before:content-['Rp']">
                  {item.price}
                </motion.p>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
