"use client";

import { useState } from "react";
import { Menu, X, PawPrint } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);

  };
 
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/50 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">

        {/* Logo */}
        <div className="flex items-center gap-2 font-black text-xl text-[#1A1A1A]">
          <PawPrint className="text-[#F97316]" />
          FluffyCare
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">

          <button
            onClick={() => scrollToSection("home")}
            className="transition hover:text-[#F97316] font-medium"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("animals")}
            className="transition hover:text-[#F97316] font-medium"
          >
            Animals
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="transition hover:text-[#F97316] font-medium"
          >
            About
          </button>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-4 border-t bg-white px-6 py-4 md:hidden">

          <button
            onClick={() => scrollToSection("home")}
            className="text-left text-gray-700 transition hover:text-[#F97316] font-medium"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection("animals")}
            className="text-left text-gray-700 transition hover:text-[#F97316] font-medium"
          >
            Animals
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="text-left text-gray-700 transition hover:text-[#F97316] font-medium"
          >
            About
          </button>

        </div>
      )}
    </header>
  );
}