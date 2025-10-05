"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark";
    setDark(savedTheme);
  }, []);

  useEffect(() => {
    if (dark === null) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  if (dark === null) return null;

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={`bg-gradient-to-r px-[30px] py-[15px] lg:px-[50px] lg:py-[20px] flex items-center justify-center rounded-[30px] relative transition-all duration-300 ${
          !dark
            ? "bg-gradient-to-r from-blue-200 to to-blue-500"
            : "bg-gradient-to-l from-blue-900 to-blue-950"
        }`}
        onClick={() => setDark(!dark)}
      >
        <div
          className={`lg:w-9 lg:h-9 w-5 h-5 rounded-full bg-gradient-to-r absolute transition-all duration-300 left-1 dark:bg-gradient-to-l ${
            !dark
              ? "bg-gradient-to-r from-yellow-500 to-orange-600"
              : "bg-gradient-to-l from-blue-50 to-blue-100"
          } ${
            !dark
              ? "translate-x-0"
              : "lg:translate-x-[55px] translate-x-[32px] bg-gradient-to-l from-black to-blue-950"
          }`}
        ></div>
      </button>
    </div>
  );
}
