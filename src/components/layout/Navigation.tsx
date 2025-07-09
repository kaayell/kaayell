import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { socialLinks } from "@/lib/links";
import {
  createStaggerItem,
  fadeInUp,
  horizontalLine,
  scaleOnHover,
  slideInFromBottom,
  springInFromBottom,
  staggerContainer,
} from "@/lib/animations";

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
          className="fixed inset-0 bg-neutral-1 z-40"
          {...springInFromBottom}
        >
          <div className="flex flex-col justify-center items-center h-full px-8">
            <nav className="text-center">
              <motion.ul
                className="space-y-8 md:space-y-12"
                variants={staggerContainer}
                initial={"initial"}
                animate={"animate"}
              >
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.li
                      key={item.name}
                      variants={createStaggerItem(fadeInUp)}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-4xl md:text-6xl lg:text-7xl font-light tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-neutral-3"
                            : "text-neutral-2 hover:bg-neutral-4"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            <motion.div
              className="w-24 h-px my-6 bg-neutral-4"
              {...horizontalLine}
            />

            <motion.div className="text-center" {...slideInFromBottom}>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex space-x-8">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target={link.target}
                      rel={link.rel}
                      className="text-neutral-3 hover:text-neutral-2 transition-colors duration-300"
                      {...scaleOnHover}
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
