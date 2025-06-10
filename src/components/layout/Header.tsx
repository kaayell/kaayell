"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Logo from "@/components/layout/Logo";
import Menu from "@/components/ui/Menu";
import Navigation from "@/components/layout/Navigation";
import { createDelayedAnimation, slideInFromTop } from "@/lib/animations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed h-24 top-0 left-0 right-0 z-50 bg-neutral-900/90">
        <div className="flex items-center justify-between px-8">
          <motion.div {...createDelayedAnimation(0.3, slideInFromTop)}>
            <Logo />
          </motion.div>

          <motion.div {...createDelayedAnimation(0.3, slideInFromTop)}>
            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </motion.div>
        </div>
      </header>

      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
