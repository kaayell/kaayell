import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

type MobileNavProps = {
  navItems: { name: string; path: string }[];
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function MobileNav({
  navItems,
  isMenuOpen,
  setIsMenuOpen,
}: MobileNavProps) {
  const pathname = usePathname();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="md:hidden mt-4 pb-2 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: {
                duration: 0.3,
              },
              opacity: {
                duration: 0.2,
                delay: 0.1,
              },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: 0.3,
              },
              opacity: {
                duration: 0.2,
              },
            },
          }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.nav
              className="absolute top-full right-0 flex flex-col space-y-4 items-end pt-4 z-50"
              variants={containerVariants}
              initial={"hidden"}
              animate={"visible"}
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/" && pathname?.startsWith(item.path));

                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="w-full text-right"
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`
                inline-block py-2 text-lg font-medium transition-colors duration-200
                ${isActive ? "font-semibold" : "text-neutral-600"}
              `}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
