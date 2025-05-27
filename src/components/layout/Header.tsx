"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import Link from "next/link";
import MobileNav from "@/components/layout/MobileNav";
import MobileMenu from "@/components/ui/MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "creations", path: "/creations" },
    { name: "experience", path: "/experience" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="duration-500 hover:scale-110">
            kl
          </Link>
          <Navigation navItems={navItems} />
          <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>

        <MobileNav
          navItems={navItems}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
}
