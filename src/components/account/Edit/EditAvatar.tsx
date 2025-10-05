"use client";

import { DialogTitle } from "@headlessui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

export default function EditAvatar({ onClose }: { onClose: () => void }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <DialogTitle className="text-xl font-bold text-black dark:text-white">
          Edit Avatar
        </DialogTitle>
        <button
          className="text-[30px] text-zinc-500 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          onClick={onClose}
        >
          <IoIosCloseCircle />
        </button>
      </div>
      <div className="relative flex items-center justify-center w-50 h-50 mx-auto rounded-full overflow-hidden">
        <Image
          className="w-full h-full rounded-full object-cover"
          src={preview || "https://avatar.iran.liara.run/public/girl"}
          alt="preview"
          fill
        />
      </div>
      <div className="flex items-center justify-center gap-5 font-bold">
        <input
          ref={fileInputRef}
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
        <motion.button
          className="py-2 px-5 bg-blue-500 text-white rounded-2xl"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Avatar
        </motion.button>
        {preview && (
          <motion.button
            className="py-2 px-5 bg-zinc-300 text-black rounded-2xl"
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.1 }}
          >
            Save Avatar
          </motion.button>
        )}
      </div>
    </div>
  );
}
