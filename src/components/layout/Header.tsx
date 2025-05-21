"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href={"/"}>kl</Link>
          </motion.div>

          {/* Desktop */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Mobile */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-6 relative"
            >
              <motion.span
                className="absolute h-0.5 bg-current rounded-full w-6 transform"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                transition={{ duration: 0.3 }}
                style={{ top: "4px" }}
              />
              <motion.span
                className="absolute h-0.5 bg-current rounded-full w-6"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
                style={{ top: "12px" }}
              />
              <motion.span
                className="absolute h-0.5 bg-current rounded-full w-6 transform"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                transition={{ duration: 0.3 }}
                style={{ top: "20px" }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation - with AnimatePresence for enter/exit animations */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 pb-2 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.3,
                  },
                  opacity: {
                    duration: 0.2,
                    delay: 0.1,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.3,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                },
              }}
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Navigation isMobile setIsMenuOpen={setIsMenuOpen} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
