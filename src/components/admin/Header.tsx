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
      <header className="fixed top-0 left-0 right-0 z-55 flex justify-between px-8 items-center bg-zinc-900">
        <h1 className="w-full text-xl font-bold text-white">
          Caufi Admin Panel
        </h1>
        <div className="flex h-full w-full gap-2 justify-center">
          <button onClick={() => setShowMenu((prev) => !prev)} type="button">
            <AiOutlineMenu className="text-lg" />
          </button>
        </div>
        <div className="flex w-full justify-end gap-4 relative items-center">
          <button className="relative p-2 rounded-full hover:bg-zinc-700 transition">
            <IoIosNotifications className="text-2xl text-blue-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-700 transition"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/assets/Avatar.png"
                  fill
                  alt="User Admin"
                  className="rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
              <div className="hidden sm:flex flex-col items-start text-left text-white">
                <span className="text-sm font-semibold">Nicko</span>
                <span className="text-xs">Admin</span>
              </div>
              <FaAngleDown
                className={`transition-transform duration-200 text-white ${
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
                    className="absolute right-0 mt-2 w-48 bg-zinc-900 shadow-lg rounded-xl border p-2 animate-fadeIn z-50 text-white"
                  >
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-700">
                      Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-700">
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-zinc-700 text-red-400">
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
