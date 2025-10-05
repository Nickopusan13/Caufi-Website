import ResetPassword from "@/components/login/ResetPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset your password CAUFI",
  description: "Reset your password CAUFI",
};

export default function ResetPasswordPage() {
  return (
    <>
      <main className="w-full items-center flex justify-center min-h-screen grow h-full bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <ResetPassword />
      </main>
    </>
  );
}
