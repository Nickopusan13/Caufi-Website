import Link from "next/link";
import { menus } from "./item";
import { motion } from "framer-motion";

export default function AdminSideBar({ showMenu }: { showMenu: boolean }) {
  return (
    <aside className="fixed top-14 left-0 z-50 h-screen flex">
      <motion.div
        animate={{ width: showMenu ? 192 : 64 }}
        className="bg-white border-r flex flex-col gap-2"
      >
        {menus.map((item) => (
          <div
            key={item.path}
            className="hover:border-r-4 hover:border-blue-500"
          >
            <Link
              href={item.path}
              className="flex items-center gap-3 py-4 px-2 hover:bg-blue-500 hover:text-white rounded-xl mx-2"
            >
              <span className="text-[25px]">{item.icon}</span>
              <span
                className={`transition-opacity duration-200 ${
                  showMenu ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
      </motion.div>
    </aside>
  );
}
