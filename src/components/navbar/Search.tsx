import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { recommendations } from "../item";

export default function SearchNavbar({ cancel }: { cancel: () => void }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      cancel();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cancel]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="w-full h-full flex lg:justify-between gap-4 lg:gap-0 justify-center lg:px-10 p-5">
        <a
          className="font-extrabold sm:text-[25px] text-[20px] lg:text-[30px]"
          href=""
        >
          CAUFI.
        </a>
        <div className="lg:grow flex lg:justify-center">
          <form action="">
            <div className="relative flex h-full text-black dark:text-black">
              <label
                className={`absolute left-2.5 lg:text-base text-[13px] transition-all duration-300 pointer-events-none ${
                  search
                    ? "translate-y-0 translate-x-1 lg:text-[10px] text-[10px] lg:opacity-100 opacity-0"
                    : "lg:mt-2.5 mt-1.5 opacity-40"
                }`}
                htmlFor="input-search"
              >
                Enter search
              </label>
              <input
                className="bg-white border-black border-2 lg:w-[500px] w-full lg:rounded-[10px] pl-2 pr-9 focus:outline-none text-[14px] lg:text-[15px]"
                type="text"
                name="input-search"
                id="input-search"
                placeholder=""
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
                ref={inputRef}
                required
              />
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
              >
                <FaSearch className="absolute right-2 top-2 lg:top-3 size-4  lg:size-5" />
              </motion.button>
            </div>
          </form>
          <div className="flex ml-3">
            <motion.button
              onClick={cancel}
              whileHover={{ scale: 1.2, color: "blue" }}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </div>
      <div className="dark:bg-[#1B1B1B] bg-[#DADADA] flex flex-col gap-3 w-full h-full px-4 items-center lg:px-50 py-5">
        <h1 className="font-extrabold text-[17px] flex gap-1">
          <Sparkles className="w-5 h-5" />
          Recommendations
          <Sparkles className="w-5 h-5" />
        </h1>
        <div className="flex flex-wrap gap-1 lg:gap-3 justify-center">
          {recommendations.map((item) => {
            return (
              <motion.button
                key={item.label}
                className="flex dark:bg-[#313131] bg-[#B3B3B3] p-2 rounded-[5px] text-[15px] items-center"
                whileHover={{ scale: 1.2, backgroundColor: "#464646" }}
                whileTap={{ scale: 1.1, backgroundColor: "#464646" }}
              >
                <a href="">{item.label}</a>
                <span className="ml-1">{item.icon}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
