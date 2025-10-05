"use client";

import { FormInput, FormSocial } from "./Form";
import { MdMail, MdPerson, MdLock } from "react-icons/md";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { fetchRegister } from "@/utils/api";
import ToasterProvider from "../ui/Toaster";
import toast from "react-hot-toast";

export default function RegisterForm({ onToggle }: { onToggle: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!!", { duration: 2000 });
      return;
    }
    try {
      const user = await fetchRegister({
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Registration complete: ", user);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onToggle();
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
            <h1 className="text-[20px]">{`LET'S GET STARTED`}</h1>
            <h2 className="text-[25px]">CREATE AN ACCOUNT</h2>
          </div>
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <div className="relative text-black flex justify-around items-center pt-5">
              <FormInput
                labels="First Name"
                id="first-name"
                name="first-name"
                type="text"
                icon={<MdPerson />}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                labels="Last Name"
                id="last-name"
                name="last-name"
                type="text"
                icon={<MdPerson />}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="relative text-black flex justify-around items-center pt-5 mt-2">
              <FormInput
                labels="Password"
                id="register-password"
                name="register-password"
                type="password"
                icon={<MdLock />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                labels="Confirm Password"
                id="register-confirm-password"
                name="register-confirm-password"
                type="password"
                icon={<MdLock />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="relative text-black flex justify-around items-center pt-5 mt-2">
              <FormInput
                labels="Email Address"
                id="register-email"
                name="register-email"
                type="email"
                icon={<MdMail />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center pt-4 lg:pt-5">
              <motion.button
                className="bg-[#212121] text-white text-[10px] lg:text-[13px] py-5 px-25 lg:px-30 rounded-2xl"
                type="submit"
                whileHover={{ scale: 1.05, backgroundColor: "red" }}
                whileTap={{ scale: 0.95 }}
              >
                GET STARTED
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
          <FormSocial socialType="Sign up" />
        </div>
        <div className="flex justify-center mt-4 text-[13px]">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggle}
              className="font-bold border-b-2 pb hover:text-blue-600"
            >
              LOGIN HERE
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
