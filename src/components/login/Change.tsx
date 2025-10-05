"use client";

import { useEffect, useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginRegisterChange() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin((prev) => !prev);
  useEffect(() => {
    document.title = "Login & Register";
  }, []);
  return (
    <div className="flex items-end lg:w-[50%] justify-center ">
      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm onToggle={toggleForm} />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RegisterForm onToggle={toggleForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
