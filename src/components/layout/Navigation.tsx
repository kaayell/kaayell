import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { socialLinks } from "@/lib/links";

type NavigationProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function Navigation({
  isMenuOpen,
  setIsMenuOpen,
}: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "home", path: "/" },
    { name: "creations", path: "/creations" },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-neutral-900 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex flex-col justify-center items-center h-full px-8">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <ul className="space-y-8 md:space-y-12">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path;

                  return (
                    <motion.li
                      key={item.name}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.1,
                        duration: 0.6,
                        ease: [0.25, 0.4, 0.25, 1],
                      }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-4xl md:text-6xl lg:text-7xl font-light tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-neutral-500"
                            : "text-neutral-400 hover:bg-neutral-500"
                        }`}
                      >
                        <motion.span
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>

            <motion.div
              className="w-24 h-px my-4 bg-neutral-600"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            />

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex space-x-8">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target={
                        link.url.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-neutral-500 hover:text-neutral-100 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.icon}
                      <span className="sr-only">{link.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
