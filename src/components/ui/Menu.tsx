import { motion } from "motion/react";
import { scaleOnHover, slideInFromTop } from "@/lib/animations";
import Logo from "@/components/layout/Logo";

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative flex items-center justify-center p-4 w-20 h-20 cursor-pointer"
      {...scaleOnHover}
      {...slideInFromTop}
      aria-label="Toggle menu"
    >
      <Logo />
    </motion.button>
  );
}
