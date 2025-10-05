"use client";

import { useState, type ReactNode } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaFacebook, FaApple } from "react-icons/fa";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import clsx from "clsx";
import { userGoogleLogin } from "@/utils/api";

export const FormInput = ({
  labels,
  type,
  name,
  id,
  icon,
  value,
  onChange,
}: {
  labels: string;
  type: string;
  name: string;
  id: string;
  icon: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  {
    return (
      <div className="flex w-[50%] mx-2">
        <div className="absolute mt-2 ml-1">{icon}</div>
        <input
          className={clsx(
            "bg-white focus:outline-none p-2 w-full rounded-[5px] text-[12px] pl-6",
            type === "password" && "lg:pr-6 pr-8"
          )}
          type={isPassword && showPassword ? "text" : type}
          name={name}
          id={id}
          onChange={onChange}
          placeholder=""
          autoComplete={isPassword ? "new-password" : "off"}
          value={value}
          required
        />
        {isPassword && (
          <div className="relative">
            <div
              className="absolute right-0 mt-2 mr-3"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </div>
          </div>
        )}
        <label
          htmlFor={id}
          className={clsx(
            "absolute opacity-40 transition-all duration-200 pointer-events-none text-black",
            value
              ? "top-1 lg:translate-y-[-2px] lg:translate-x-2 lg:text-[12px] opacity-100 text-[10px] dark:text-white"
              : "top-7 ml-6 lg:top-7 lg:ml-6 lg:text-[12px] text-[12px]"
          )}
        >
          {labels}
        </label>
      </div>
    );
  }
};

export const FormSocial = ({ socialType }: { socialType: string }) => {
  return (
    <div className="flex flex-col gap-3 text-[12px] lg:text-[13px]">
      <motion.button
        className="flex justify-center items-center py-2 px-30 rounded-2xl bg-transparent border-zinc-400 border-1"
        whileHover={{ scale: 1.1 }}
        onClick={userGoogleLogin}
      >
        <FcGoogle className="mr-1" size={20} />
        {socialType} with Google
      </motion.button>
      <motion.button
        className="flex justify-center py-2 px-30 rounded-2xl bg-transparent border-zinc-400 border-1"
        whileHover={{ scale: 1.1 }}
      >
        <FaFacebook className="mr-1" color="#1877F2" size={20} />
        {socialType} with Facebook
      </motion.button>
      <motion.button
        className="flex justify-center py-2 px-30 rounded-2xl bg-transparent border-zinc-400 border-1"
        whileHover={{ scale: 1.1 }}
      >
        <FaApple className="mr-1" size={20} />
        {socialType} with Apple
      </motion.button>
    </div>
  );
};
