import LoginRegisterChange from "@/components/login/Change";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login & Register",
  description: "Welcome to CAUFI.",
};

export default function LoginPage() {
  return (
    <>
      <main className="bg-cover bg-center w-full px-2 pt-2 lg:pt-0 lg:px-0 flex flex-col lg:flex-row min-h-screen dark:lg:brightness-80 transition-all duration-300 overflow-y-auto bg-[#673232] dark:bg-[#411F1F] md:bg-[url('/assets/login-bg.webp')] lg:bg-[url('/assets/login-bg.webp')]">
        <div className="flex items-center lg:w-[50%] justify-center mb-5 lg:mb-0">
          <div className="flex flex-col text-center">
            <div>
              <h1 className="font-amiko text-[#DDC6C6] text-[80px] lg:text-[120px] font-bold">
                CAUFI.
              </h1>
            </div>
            <div className="text-white text-center">
              <h2 className=" text-[20px] lg:text-[28px] font-bold">
                Timeless Style, Modern Comfort
              </h2>
              <p className="text-[18px] lg:text-[22px]">
                Discover fashion that feels as good as it looks.{" "}
                <span className="block">Join CAUFI today.</span>
              </p>
            </div>
          </div>
        </div>
        <LoginRegisterChange />
      </main>
    </>
  );
}
