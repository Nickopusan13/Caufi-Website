"use client";

import Link from "next/link";

export const Breadcrumb = () => {
  return (
    <div className="text-black dark:text-white text-[13px] gap-1 flex flex-wrap justify-center lg:justify-normal py-4 font-bold w-full">
      <Link href="/">Home</Link>
      <span>/</span>
      <Link href="/women">Women</Link>
      <span>/</span>
      <Link href="/women/dresses">Dresses</Link>
      <span>/</span>
      <Link href="/women/dresses/masterpiece-cloth">Masterpiece Cloth</Link>
      <span>/</span>
      <Link href="/">Home</Link>
    </div>
  );
};
