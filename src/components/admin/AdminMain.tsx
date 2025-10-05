"use client";

import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";
import { ReactNode, useState } from "react";

export default function AdminMain({ children }: { children: ReactNode }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex">
      <AdminSideBar showMenu={showMenu} />
      <div
        className={`flex flex-1 transition-all duration-300 ${
          showMenu ? "ml-48" : "ml-16"
        }`}
      >
        <AdminHeader setShowMenu={setShowMenu} />
        <main className="pt-18 flex-1 bg-neutral-50 p-4 flex flex-col gap-3">
          {children}
        </main>
      </div>
    </div>
  );
}
