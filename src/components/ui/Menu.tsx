import { motion } from "motion/react";

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="relative flex items-center justify-center w-12 h-12 focus:outline-none group"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle menu"
    >
      {/* circle on hover */}
      <motion.div className="absolute inset-0 bg-neutral-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div
        className="relative text-neutral-400 group-hover:text-neutral-900 font-mono text-3xl transition-colors duration-300"
        animate={{
          rotate: isMenuOpen ? 45 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
      >
        {isMenuOpen ? "×" : "+"}
      </motion.div>
    </motion.button>
  );
}
