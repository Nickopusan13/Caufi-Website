"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons/lib";

export const InformationItem = ({
  icon: Icon,
  title,
  description,
  username,
  iconWrapperClassName,
  href,
}: {
  icon: IconType;
  title?: string;
  description?: string | number;
  username?: string;
  iconWrapperClassName?: string;
  href?: string;
}) => {
  const Wrapper = href ? Link : "div";
  return (
    <Wrapper href={href ?? "no"}>
      <motion.div
        className="flex items-center gap-4 shadow dark:shadow-white/7 rounded py-2 px-2"
        whileHover={{ scale: 1.01 }}
      >
        <div className={`rounded-lg text-[30px] p-2 ${iconWrapperClassName}`}>
          <Icon />
        </div>
        <div>
          <p className="text-xs text-zinc-500">{title}</p>
          {username ? (
            <p className="md:text-lg lg:text-lg text-zinc-800 text-sm dark:text-zinc-100">
              {description}{" "}
              <span className="opacity-80 text-xs text-zinc-500">{`(@${username})`}</span>
            </p>
          ) : (
            <p className="text-sm md:text-lg lg:text-lg text-zinc-800 dark:text-zinc-100">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </Wrapper>
  );
};
