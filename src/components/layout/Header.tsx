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
    <header className="sticky top-0 z-50 bg-neutral-900">
      <div className="flex items-center justify-between py-8 px-16">
        <Link href="/" className="duration-500 hover:tracking-widest">
          kl
        </Link>
        <Navigation navItems={navItems} />
        <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <MobileNav
          navItems={navItems}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
}
