"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminHeader({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-55 flex justify-between px-8 items-center bg-white">
        <h1 className="w-full text-xl font-bold">Caufi Admin Panel</h1>
        <div className="flex h-full w-full gap-2 justify-center">
          <button onClick={() => setShowMenu((prev) => !prev)} type="button">
            <AiOutlineMenu className="text-lg" />
          </button>
          <div className="relative h-13 w-full py-2">
            <input
              className="bg-zinc-100 h-full rounded-2xl pl-8 pr-3 w-100 focus:outline-2"
              type="text"
              placeholder="Search..."
            />
            <FaSearch className="absolute text-[20px] text-black left-1.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-4 relative">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <IoIosNotifications className="text-2xl text-blue-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/Avatar.png"
                  fill
                  alt="User Admin"
                  className="rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-semibold">Nicko</span>
                <span className="text-xs text-gray-500">Admin</span>
              </div>
              <FaAngleDown
                className={`transition-transform duration-200 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {open && (
                <OutsideClickHandler
                  onOutsideClick={(e: MouseEvent) => {
                    if (
                      e.target instanceof Element &&
                      e.target.closest("button")
                    )
                      return;
                    setOpen(false);
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border p-2 animate-fadeIn z-50"
                  >
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-red-500">
                      Logout
                    </button>
                  </motion.div>
                </OutsideClickHandler>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
