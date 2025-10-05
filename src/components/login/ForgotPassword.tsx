"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import ToasterProvider from "../ui/Toaster";
import { userForgotPassword } from "@/utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userForgotPassword(email);
      toast.success("Reset link has been sent", { duration: 2000 });
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
      <p className="text-center text-gray-600 text-sm">
        {`Enter the email associated with your account and we'll send a password
        reset link to your email.`}
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute left-3 -top-2.5 bg-white px-1 text-gray-500 text-sm"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
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
      <p className="text-center text-gray-500 text-sm">
        Remembered your password?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
}
