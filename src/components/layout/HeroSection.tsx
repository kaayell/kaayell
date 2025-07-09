"use client";

import { motion } from "motion/react";
import { courierPrime, fredericka, lavishlyYours } from "@/lib/fonts";
import Link from "next/link";
import {
  fadeInUp,
  createDelayedAnimation,
  slideOnHover,
} from "@/lib/animations";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-center pl-5">
      <motion.h1
        className={`mb-8 text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight ${courierPrime.className}`}
        {...createDelayedAnimation(0.2, fadeInUp)}
      >
        <span className="text-neutral-3">kaay</span>
        <span className="text-neutral-2">•</span>
        <span className="text-neutral-3">ell</span>
      </motion.h1>

      <motion.div
        className="mb-12 flex flex-col md:flex-row md:items-baseline md:space-x-8"
        {...createDelayedAnimation(0.4, fadeInUp)}
      >
        <h2
          className={`text-3xl md:text-4xl text-neutral-4 ${fredericka.className}`}
        >
          KL
        </h2>
        <h3
          className={`text-2xl md:text-3xl text-neutral-4 ${lavishlyYours.className}`}
        >
          kristie-lynne
        </h3>
      </motion.div>

      <motion.div {...createDelayedAnimation(0.8, fadeInUp)}>
        <Link href="/creations">
          <motion.div
            className="inline-flex items-center group cursor-pointer"
            {...slideOnHover}
          >
            <span className="text-lg font-medium text-neutral-4 mr-4 group-hover:text-neutral-3 transition-colors">
              View Creations
            </span>
            <motion.div
              className="w-12 h-0.5 bg-neutral-4 group-hover:bg-neutral-3 transition-colors"
              initial={{ width: 48 }}
              whileHover={{ width: 64 }}
              transition={{ duration: 0.3 }}
            />
            <motion.svg
              className="w-4 h-4 ml-2 text-neutral-4 group-hover:text-neutral-3 transition-colors"
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
  );
}
