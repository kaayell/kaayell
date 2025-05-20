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

  const desktopLinkVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
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
          // Mobile navigation item with animation
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
          // Desktop navigation item with hover animation
          <motion.div
            key={item.name}
            whileHover="hover"
            variants={desktopLinkVariants}
          >
            <Link
              href={item.path}
              className={`
                text-base font-medium transition-colors duration-200
                ${
                  isActive
                    ? "font-semibold"
                    : "text-neutral-600 hover:text-neutral-400"
                }
              `}
            >
              {item.name}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
