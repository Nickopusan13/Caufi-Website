"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import ToasterProvider from "../ui/Toaster";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegSmileWink } from "react-icons/fa";
import { userResetPassword } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (password !== confirmPassword) {
      toast.error("Password do not match");
      setLoading(false);
      return;
    }
    try {
      await userResetPassword({ token: token, newPassword: password });
      toast.success("Password change complete");
      window.location.href = "/login";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something Wrong";
      toast.error(message, { duration: 2000 });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <ToasterProvider />
      <h1 className="text-2xl font-bold text-center text-gray-900">
        Reset Your Password
      </h1>
      <p className="text-center text-gray-600 text-sm flex items-center justify-center gap-1">
        {`Enter new password and don't forget again okay`}
        <FaRegSmileWink size={20} />
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            htmlFor="password"
            className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-3"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
        <div className="relative">
          <label
            htmlFor="confirm-password"
            className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
            autoComplete="new-password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-3"
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
        >
          {loading ? (
            <AiOutlineLoading3Quarters
              className="animate-spin mx-auto"
              size={30}
            />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
