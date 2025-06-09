import { motion } from "motion/react";
import { rotate45, scaleOnHover } from "@/lib/animations";

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative flex items-center justify-center w-12 h-12 focus:outline-none group"
      {...scaleOnHover}
      aria-label="Toggle menu"
    >
      {/* circle on hover */}
      <motion.div className="absolute inset-0 bg-neutral-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300" />

      <motion.div
        className="relative text-neutral-400 group-hover:text-neutral-900 font-mono text-3xl transition-colors duration-300"
        {...rotate45(isMenuOpen)}
      >
        {isMenuOpen ? "×" : "+"}
      </motion.div>
    </motion.button>
  );
}
