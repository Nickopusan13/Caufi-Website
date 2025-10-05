"use client";

import DarkModeToggle from "../DarkMode";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DropDown } from "./DropDown";
import { productImages, productItems } from "./ItemsDropDown";
import { FaSearch } from "react-icons/fa";
import SearchNavbar from "./Search";
import { menus } from "./ItemsDropDown";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";

export default function NavBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 5;
  const [showSearch, setShowSearch] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY + scrollThreshold) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY - scrollThreshold) {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const handleScroll = () => {
      if (openDropdown) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openDropdown]);

  const handleMouseEnter = (menu: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header
      className={`fixed z-100 top-0 left-0 right-0 bg-transparent flex text-black dark:bg-zinc-900 dark:text-white transition-all duration-300 flex-col ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex px-2 py-2 lg:py-5 justify-around items-center w-full bg-white border-b-1 dark:bg-zinc-900">
        <Link href="/">
          <h1 className="hidden lg:block md:block font-extrabold sm:text-[25px] text-[20px] lg:text-[30px]">
            CAUFI.
          </h1>
        </Link>
        <div className="relative w-fit bg-gray-300 dark:bg-gray-600 rounded-2xl border-none lg:border-none md:border-none lg:bg-none md:bg-none">
          <motion.button
            className="block lg:hidden p-2 bg-white rounded-2xl"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch className="text-black text-xl" />
          </motion.button>
          <div className="hidden lg:block relative lg:w-70">
            <FaSearch className="absolute fill-black top-3 right-2" />
            <input
              className="block bg-white w-full text-black rounded-[10px] py-2 pl-2 pr-8 border-2 lg:text-[14px] focus:outline-none"
              type="text"
              name="search-item"
              id="search-item"
              placeholder="Search for products"
              onClick={() => setShowSearch(true)}
            />
          </div>
        </div>
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 lg:mt-2 z-100 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center w-full"
            >
              <OutsideClickHandler onOutsideClick={() => setShowSearch(false)}>
                <SearchNavbar cancel={() => setShowSearch(false)} />
              </OutsideClickHandler>
            </motion.div>
          )}
        </AnimatePresence>
        <nav className="lg:text-[15px] flex lg:gap-1 items-center flex-wrap justify-center lg:justify-end-safe">
          <div className="lg:mr-2 mr-0 flex items-center mb-1 lg:mb-0">
            {menus.map((menu) => {
              const dropDownMenus = ["Product", "Collections"];
              const hasDropDown = dropDownMenus.includes(menu.title);
              const ref = menu.title === "Product" ? productRef : collectionRef;
              return hasDropDown ? (
                <div
                  key={menu.title}
                  ref={ref}
                  onMouseEnter={() => handleMouseEnter(menu.title)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setOpenDropdown(menu.title)}
                  className="relative"
                >
                  <Link
                    className={`navbar-style ${
                      openDropdown === menu.title ? "text-blue-500" : ""
                    }`}
                    href={menu.href}
                  >
                    {menu.title}
                  </Link>
                </div>
              ) : (
                <div key={menu.title}>
                  <Link className="navbar-style" href={menu.href}>
                    {menu.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="gap-2 flex">
            <Link
              href="/login"
              type="button"
              className="bg-[#3C1212] text-white p-[5px] text-[12px] lg:p-[10px] lg:text-[15px] rounded-[10px] lg:px-7 px-3 border-[2px] dark:border-black cursor-pointer hover:bg-[#B91C1C] transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              type="button"
              className="text-black p-[5px] lg:p-[10px] rounded-[10px] px-3 lg:px-7 text-[12px] lg:text-[15px] border-[2px] bg-[#D9D9D9] dark:border-black cursor-pointer hover:bg-[#B91C1C] transition-colors duration-200"
            >
              Register
            </Link>
            <DarkModeToggle />
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full w-full left-0 z-40" // Changed from top-[70px] to top-full to eliminate gap
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            {openDropdown === "Product" && (
              <DropDown
                rightTitle="Recommended"
                imageColumns={productImages}
                itemColumns={productItems}
              />
            )}
            {openDropdown === "Collections" && (
              <DropDown
                rightTitle="Collections"
                imageColumns={productImages}
                itemColumns={productItems}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
