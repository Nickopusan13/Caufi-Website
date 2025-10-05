"use client";

import { FormInput, FormSocial } from "./Form";
import { MdPerson, MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import { fetchLogin } from "@/utils/api";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ToasterProvider from "../ui/Toaster";

export default function LoginForm({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await fetchLogin({
        email,
        password,
        rememberMe,
      });
      toast.success("Login complete: ", user);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something Wrong";
      toast.error(message, { duration: 2000 });
    }
  };
  return (
    <div className="flex lg:items-end justify-center">
      <ToasterProvider />
      <div className="bg-[#D9D9D9] rounded-b-2xl lg:rounded-b-none rounded-t-2xl pt-2 pb-5 px-2 lg:pt-5 lg:pb-8 lg:px-5 text-black dark:bg-[#2C0B0B] dark:text-white">
        <div className="flex text-center justify-center pt-2">
          <div className="font-bold flex flex-col gap-2 font-poppins">
            <h1 className="text-[20px]">WELCOME BACK</h1>
            <h2 className="text-[25px]">LOGIN TO YOUR ACCOUNT</h2>
          </div>
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="relative text-black flex justify-around items-center pt-5">
              <FormInput
                labels="Email Address"
                id="login-email"
                name="login-email"
                type="email"
                icon={<MdPerson />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                labels="Password"
                id="login-password"
                name="login-password"
                type="password"
                icon={<MdLock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between mx-15 pt-2 lg:pt-5 text-[12px]">
              <div>
                <a
                  className="border-b text-blue-600 hover:text-blue-900"
                  href="/login/forgot-password"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="cursor-pointer"
                />
                <span className="ml-1">Remember me</span>
              </div>
            </div>
            <div className="flex justify-center pt-4 lg:pt-5">
              <motion.button
                className="bg-[#212121] text-white text-[10px] lg:text-[13px] py-5 px-25 lg:px-30 rounded-2xl"
                type="submit"
                whileHover={{ scale: 1.05, backgroundColor: "red" }}
                whileTap={{ scale: 0.95 }}
              >
                LOGIN
              </motion.button>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm my-4 mx-3">
              <div className="flex-grow border-t border-black opacity-40"></div>
              <span className="px-1">or</span>
              <div className="flex-grow border-t border-black opacity-40"></div>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <FormSocial socialType="Login" />
        </div>
        <div className="flex justify-center mt-4 text-[13px]">
          <p>
            {`Don't have an account?`}
            <button
              type="button"
              onClick={onToggle}
              className="font-bold border-b-2 ml-1 hover:text-blue-600"
            >
              REGISTER HERE
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
