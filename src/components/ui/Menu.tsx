import { motion } from "motion/react";

type MenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function Menu({ isMenuOpen, setIsMenuOpen }: MenuProps) {
  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="p-2 rounded-lg"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={isMenuOpen ? "open" : "closed"}
        className="w-6 h-6 relative"
        whileHover={!isMenuOpen ? "hover" : undefined}
      >
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6 transform"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
            hover: { rotate: 0, y: -2, scaleX: 1.1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ top: "4px" }}
        />
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6"
          variants={{
            closed: { opacity: 1, scaleX: 1 },
            open: { opacity: 0 },
            hover: { opacity: 1, scaleX: 0.8 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ top: "12px" }}
        />
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6 transform"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
            hover: { rotate: 0, y: 2, scaleX: 1.1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ top: "20px" }}
        />
      </motion.div>
    </motion.button>
  );
}
