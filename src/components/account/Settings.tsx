"use client";

import { InformationItem } from "./components/InformationItem";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuLanguages } from "react-icons/lu";
import { IoLogOutSharp } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons/lib";
import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoIosCloseCircle } from "react-icons/io";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { userLogout } from "@/utils/api";
import toast from "react-hot-toast";
import ToasterProvider from "../ui/Toaster";

const OpenSettings = ({
  open,
  setOpen,
  title,
  onClick,
}: {
  open: boolean;
  setOpen: () => void;
  title: string;
  onClick?: () => void;
}) => {
  return (
    <Dialog
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      open={open}
      onClose={setOpen}
    >
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        animate={{ backgroundColor: "rgba(0,0,0,0.5)", opacity: 1 }}
        exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="rounded-2xl w-[90%] max-w-md"
      >
        <DialogPanel className="flex gap-5 flex-col items-center bg-white rounded-2xl text-black p-2 dark:bg-zinc-800 dark:text-white">
          <div className="flex w-full items-center relative justify-center mb-5">
            <DialogTitle className="font-bold text-xl">{title}</DialogTitle>
            <button
              className="absolute right-2 text-[30px] text-zinc-500 dark:text-zinc-200 hover:text-zinc-400"
              onClick={setOpen}
            >
              <IoIosCloseCircle />
            </button>
          </div>
          {title === "Change Language" ? (
            <div className="flex flex-col w-full">
              <RadioGroup.Root
                className="flex flex-col gap-2"
                defaultValue="English"
                aria-label="Select language"
              >
                {["English", "Indonesia"].map((lang) => (
                  <motion.label
                    key={lang}
                    className="flex items-center gap-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded-md transition-colors duration-200 hover:shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RadioGroup.Item
                      value={lang}
                      id={lang}
                      className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center"
                    >
                      <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-blue-500" />
                    </RadioGroup.Item>
                    {lang}
                  </motion.label>
                ))}
              </RadioGroup.Root>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center gap-3">
              <motion.button
                className="w-1/2 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
              >
                Yes
              </motion.button>
              <motion.button
                className="w-1/2 py-2 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-xl font-medium shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={setOpen}
              >
                Nope
              </motion.button>
            </div>
          )}
        </DialogPanel>
      </motion.div>
    </Dialog>
  );
};

const SettingsItem = ({
  icon: Icon,
  description,
  iconWrapperClassName,
  onClick,
}: {
  icon: IconType;
  description?: string | number;
  iconWrapperClassName?: string;
  onClick: () => void;
}) => {
  return (
    <motion.button
      className="flex items-center gap-4 shadow dark:shadow-white/7 rounded py-2 px-2 outline-none"
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
    >
      <div className={`rounded-lg text-[30px] p-2 ${iconWrapperClassName}`}>
        <Icon />
      </div>
      <div>
        <p className="md:text-lg lg:text-lg text-zinc-800 text-sm dark:text-zinc-100">
          {description}
        </p>
      </div>
    </motion.button>
  );
};

export default function Settings() {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);
  const handleLogout = async () => {
    try {
      const res = await userLogout();
      toast.success(res.message || "Logged out success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <ToasterProvider />
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex flex-col gap-3 outline-none">
        <InformationItem
          icon={RiLockPasswordFill}
          iconWrapperClassName="bg-gradient-to-br from-blue-500/30 to-blue-500/10 text-blue-500"
          description={"Change Password"}
          href="/change"
        />
        <SettingsItem
          icon={LuLanguages}
          iconWrapperClassName="bg-gradient-to-br from-green-500/30 to-green-500/10 text-green-500"
          description={"Language"}
          onClick={() => {
            setOpen(true);
            setSelected("Language");
          }}
        />
        <SettingsItem
          icon={IoLogOutSharp}
          iconWrapperClassName="bg-gradient-to-br from-yellow-500/30 to-yellow-500/10 text-yellow-500"
          description={"Logout"}
          onClick={() => {
            setOpen(true);
            setSelected("Logout");
          }}
        />
        <SettingsItem
          icon={MdOutlineDeleteForever}
          iconWrapperClassName="bg-gradient-to-br from-red-500/30 to-red-500/10 text-red-500"
          description={"Delete Account"}
          onClick={() => {
            setOpen(true);
            setSelected("Delete Account");
          }}
        />
      </div>
      <AnimatePresence>
        {open && selected === "Language" && (
          <OpenSettings
            open={open}
            setOpen={() => setOpen(false)}
            title="Change Language"
          />
        )}
        {open && selected === "Logout" && (
          <OpenSettings
            open={open}
            setOpen={() => setOpen(false)}
            title="Want to logout?"
            onClick={handleLogout}
          />
        )}
        {open && selected === "Delete Account" && (
          <OpenSettings
            open={open}
            setOpen={() => setOpen(false)}
            title="DELETE YOUR ACCOUNT?"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
