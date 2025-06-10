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
    <div className="fixed left-4 md:left-6 lg:left-8 xl:left-10 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
      <div className="flex flex-col items-center space-y-6">
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

        {/* Vertical line */}
        <motion.div className="w-0.5 h-16 bg-neutral-500" {...verticalLine} />
      </div>
    </div>
  );
}
