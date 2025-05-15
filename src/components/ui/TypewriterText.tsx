"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, Variants } from "motion/react";
import { animate } from "motion";

interface TypewriterTextProps {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  loop?: boolean;
  cursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = "",
  onComplete,
  loop = false,
  cursor = true,
}: TypewriterTextProps) {
  const textArray = Array.isArray(text) ? text : [text];
  const count = useMotionValue(0);
  const [currentLine, setCurrentLine] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  const currentText = textArray[currentLine] || "";

  const displayText = useTransform(count, (latest) => {
    return currentText.slice(0, Math.floor(latest));
  });

  // Reset animation when current line changes
  useEffect(() => {
    count.set(0);
  }, [currentLine, count]);

  // Animation effect for typing
  useEffect(() => {
    if (completed && !loop) return;

    const controls = animate(count, currentText.length, {
      duration: (currentText.length * speed) / 1000,
      delay: delay / 1000,
      ease: "linear",
      onComplete: () => {
        if (currentLine < textArray.length - 1) {
          setTimeout(() => {
            setCurrentLine((prevLine) => prevLine + 1);
          }, 1000); // Wait 1s before moving to next line
        } else {
          setCompleted(true);
          if (onComplete) onComplete();

          if (loop) {
            setTimeout(() => {
              setCurrentLine(0);
              setCompleted(false);
            }, 2000); // 2s delay before restarting
          }
        }
      },
    });

    return () => {
      controls.stop();
    };
  }, [
    count,
    currentText,
    speed,
    delay,
    currentLine,
    textArray.length,
    completed,
    loop,
    onComplete,
  ]);

  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    },
  };

  return (
    <div className={className}>
      <motion.span>{displayText}</motion.span>
      {cursor && (
        <motion.span
          variants={cursorVariants}
          animate="blinking"
          className="inline-block w-[2px] h-[1em] ml-1 bg-current"
        />
      )}
    </div>
  );
}
