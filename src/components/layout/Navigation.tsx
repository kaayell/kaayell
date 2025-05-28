"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type NavigationProps = {
  navItems: { name: string; path: string }[];
};

export default function Navigation({ navItems }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className="hidden md:block">
      <motion.nav className="flex space-x-8">
        {navItems.map((item) => {
          const isActive =
            pathname === item.path ||
            (item.path !== "/" && pathname?.startsWith(item.path));

          return (
            <motion.div
              key={item.name}
              initial="initial"
              whileHover="hover"
              className="relative flex flex-col items-center"
            >
              {/* Top rainbow line */}
              <motion.div
                className="absolute top-0 h-px w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                variants={{
                  initial: { scaleX: 0, opacity: 0, originX: 0 },
                  hover: {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      type: "easeInOut",
                      delay: 0.1,
                    },
                  },
                }}
              />

              <Link
                href={item.path}
                className={`
                text-base font-medium py-1
                ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-400 hover:text-neutral-300"
                }
              `}
              >
                {item.name}
              </Link>

              {/* Bottom rainbow line */}
              <motion.div
                className="absolute bottom-0 h-px w-full bg-gradient-to-r to-blue-500  via-pink-500  from-purple-500"
                variants={{
                  initial: { scaleX: 0, opacity: 0, originX: 1 },
                  hover: {
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      type: "easeInOut",
                      delay: 0.1,
                    },
                  },
                }}
              />
            </motion.div>
          );
        })}
      </motion.nav>
    </div>
  );
}
