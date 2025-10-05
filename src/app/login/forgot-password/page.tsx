import type { Metadata } from "next";
import ForgotPassword from "@/components/login/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <main className="w-full items-center flex justify-center min-h-screen grow h-full bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <ForgotPassword />
      </main>
    </>
  );
}
