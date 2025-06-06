"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Logo from "@/components/layout/Logo";
import Menu from "@/components/ui/Menu";
import Navigation from "@/components/layout/Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed h-24 top-0 left-0 right-0 z-50 bg-neutral-900/90"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="flex items-center justify-between px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Logo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </motion.div>
        </div>
      </motion.header>

      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
