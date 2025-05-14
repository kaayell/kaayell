import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationProps = {
  isMobile?: boolean;
  setIsMenuOpen?: (isOpen: boolean) => void;
};

export default function Navigation({
  isMobile,
  setIsMenuOpen,
}: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "home", path: "/" },
    { name: "creations", path: "/creations" },
    { name: "experience", path: "/experience" },
  ];

  const handleClick = () => {
    if (isMobile && setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={isMobile ? "flex flex-col space-y-4" : "flex space-x-8"}>
      {navItems.map((item) => {
        const isActive =
          pathname === item.path ||
          (item.path !== "/" && pathname?.startsWith(item.path));

        return (
          <Link
            key={item.name}
            href={item.path}
            onClick={handleClick}
            className={`
              text-base font-medium transition-colors duration-200
              ${
                isActive
                  ? "font-semibold"
                  : "text-neutral-600 hover:text-neutral-400"
              }
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
