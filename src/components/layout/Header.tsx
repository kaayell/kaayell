"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import Link from "next/link";
import Menu from "@/components/ui/Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex items-center justify-between py-8 px-16">
        <Link href="/" className="duration-500 hover:tracking-widest">
          kl
        </Link>
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  );
}
