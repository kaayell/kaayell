import { motion } from "motion/react";

type MobileNavProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};
export default function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavProps) {
  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="p-2 md:hidden"
      aria-label="Toggle menu"
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        animate={isMenuOpen ? "open" : "closed"}
        className="w-6 h-6 relative"
      >
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6 transform"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: 45, y: 8 },
          }}
          transition={{ duration: 0.3 }}
          style={{ top: "4px" }}
        />
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
          style={{ top: "12px" }}
        />
        <motion.span
          className="absolute h-0.5 bg-current rounded-full w-6 transform"
          variants={{
            closed: { rotate: 0, y: 0 },
            open: { rotate: -45, y: -8 },
          }}
          transition={{ duration: 0.3 }}
          style={{ top: "20px" }}
        />
      </motion.div>
    </motion.button>
  );
}
