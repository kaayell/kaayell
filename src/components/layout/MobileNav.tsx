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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
          className="fixed inset-x-0 top-0 bottom-0 bg-neutral-900 z-40 md:hidden mt-24"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "easeInOut",
            duration: 0.4,
          }}
        >
          <motion.nav
            className="flex flex-col px-6 pt-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/" && pathname?.startsWith(item.path));

              return (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="border-b border-neutral-500 last:border-b-0"
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                        block py-4 text-3xl font-medium transition-colors duration-200
                        ${
                          isActive
                            ? "font-semibold"
                            : "text-neutral-600 hover:text-neutral-400"
                        }
                      `}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
