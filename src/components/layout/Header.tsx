"use client";

import { useState } from "react";
import Menu from "@/components/ui/Menu";
import Navigation from "@/components/layout/Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed h-14 md:h-24 flex items-center justify-between z-50">
        <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
