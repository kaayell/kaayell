// src/lib/animations.ts

import { Variants } from "motion/react";

// Common easing function
export const ease = [0.25, 0.4, 0.25, 1] as const;

// Page transitions
export const pageTransition = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { ease, duration: 0.5 },
};

export const fadeInUp = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 30, opacity: 0 },
  transition: { duration: 0.6, ease },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease },
};

export const slideInFromLeft = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: { duration: 0.8, ease },
};

export const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: { duration: 0.8, ease },
};

export const slideInFromTop = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -100, opacity: 0 },
  transition: { duration: 0.8, ease },
};

export const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
  transition: { duration: 0.8, ease },
};

// Hover animations
export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2, ease },
};

export const slideOnHover = {
  whileHover: { x: 8 },
  transition: { duration: 0.3, ease },
};

// Stagger animations for lists
export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createStaggerItem = (baseAnimation: any) => ({
  ...baseAnimation,
  animate: {
    ...baseAnimation.animate,
    transition: baseAnimation.transition,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createDelayedAnimation = (delay: number, baseAnimation: any) => ({
  ...baseAnimation,
  transition: {
    ...baseAnimation.transition,
    delay,
  },
});

// UI elements
export const arrowAnimation = {
  animate: { x: [0, 8, 0] },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
export const verticalLine = {
  initial: { height: 0 },
  animate: { height: 64 },
  transition: { duration: 0.8, delay: 1.5, ease },
};
export const horizontalLine = {
  initial: { width: 0 },
  animate: { width: 96 },
  transition: { duration: 0.8, delay: 0.5, ease },
};

// Drag animations
export const dragAnimation = {
  drag: "x" as const,
  dragConstraints: { left: 0, right: 0 },
  dragElastic: 0.1,
  whileDrag: { scale: 0.98 },
};

export const rotate45 = (isOpen: boolean) => ({
  animate: { rotate: isOpen ? 45 : 0 },
  transition: { duration: 0.3, ease },
});
