"use client";

import { motion } from "motion/react";
import { courierPrime, fredericka, lavishlyYours } from "@/lib/fonts";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-8"
        >
          <motion.h1
            className={`text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight ${courierPrime.className}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-neutral-100">kaay</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-100">ell</span>
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row md:items-baseline md:space-x-8"
        >
          <h2
            className={`text-3xl md:text-4xl text-neutral-300 ${fredericka.className}`}
          >
            KL
          </h2>
          <h3
            className={`text-2xl md:text-3xl text-neutral-400 ${lavishlyYours.className}`}
          >
            kristie-lynne
          </h3>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/creations">
            <motion.div
              className="inline-flex items-center group cursor-pointer"
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <span className="text-lg font-medium text-neutral-100 mr-4 group-hover:text-white transition-colors">
                View Creations
              </span>
              <motion.div
                className="w-12 h-0.5 bg-neutral-100 group-hover:bg-white transition-colors"
                initial={{ width: 48 }}
                whileHover={{ width: 64 }}
                transition={{ duration: 0.3 }}
              />
              <motion.svg
                className="w-4 h-4 ml-2 text-neutral-100 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
