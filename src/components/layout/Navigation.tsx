"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

type NavigationProps = {
  isMobile?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
};

export default function Navigation({
  isMobile,
  setIsMenuOpen,
}: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "creations", path: "/creations" },
    { name: "experience", path: "/experience" },
  ];

  const handleClick = () => {
    if (isMobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.nav
      className={
        isMobile ? "flex flex-col space-y-4 items-end" : "flex space-x-8"
      }
      variants={isMobile ? containerVariants : undefined}
      initial={isMobile ? "hidden" : undefined}
      animate={isMobile ? "visible" : undefined}
    >
      {navItems.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== "/" && pathname?.startsWith(item.path));

        return isMobile ? (
          // Mobile
          <motion.div
            key={item.name}
            variants={itemVariants}
            className="w-full text-right"
          >
            <Link
              href={item.path}
              onClick={handleClick}
              className={`
                inline-block py-2 text-lg font-medium transition-colors duration-200
                ${isActive ? "font-semibold" : "text-neutral-600"}
              `}
            >
              {item.name}
            </Link>
          </motion.div>
        ) : (
          // Desktop
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
                    : "text-neutral-600 hover:text-neutral-400"
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
  );
}
