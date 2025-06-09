"use client";

import { motion } from "motion/react";
import { socialLinks } from "@/lib/links";

export default function SideLinks() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed left-4 md:left-6 lg:left-8 xl:left-10 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="flex flex-col space-y-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={
                link.url.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-neutral-500 hover:text-neutral-100 transition-colors duration-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 1.2 + index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Vertical line */}
        <motion.div
          className="w-0.5 h-16 bg-neutral-600"
          initial={{ height: 0 }}
          animate={{ height: 64 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </motion.div>
  );
}
