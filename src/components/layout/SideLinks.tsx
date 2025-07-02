"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/lib/links";
import {
  createStaggerItem,
  fadeInUp,
  staggerContainer,
  verticalLine,
} from "@/lib/animations";

export default function SideLinks() {
  return (
    <div className="h-screen sticky top-0 flex flex-col items-center justify-center space-y-6 px-8">
      <motion.div
        className="flex flex-col space-y-4"
        variants={staggerContainer}
        initial={"initial"}
        animate={"animate"}
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.target}
            rel={link.rel}
            className="text-neutral-500 hover:text-neutral-100 transition-colors duration-300"
            variants={createStaggerItem(fadeInUp)}
          >
            {link.icon}
            <span className="sr-only">{link.name}</span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div className="w-0.5 h-16 bg-neutral-500" {...verticalLine} />
    </div>
  );
}
