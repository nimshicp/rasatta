"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  theme?: "light" | "dark";
}

export function Navbar({ theme = "dark" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const textMuted = isDark ? "text-white/80" : "text-black/70";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-black";

  const buttonBg = isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800";

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 lg:px-24 py-4 md:py-6 transition-all duration-300 ${isScrolled ? "bg-black/10 backdrop-blur-md" : "bg-transparent"} ${textColor}`}>
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter cursor-pointer z-50">RASATTA</Link>

        {/* Center Links (Hidden on Mobile) */}
        <div className={`hidden lg:flex items-center gap-8 text-[15px] font-medium ${textMuted}`}>
          <Link href="/#work" className={`cursor-pointer transition-colors ${hoverColor}`}>Work</Link>
          <Link href="/#expertise" className={`cursor-pointer transition-colors ${hoverColor}`}>Solutions</Link>
          <Link href="/#about" className={`cursor-pointer transition-colors ${hoverColor}`}>About</Link>
          <Link href="/#team" className={`cursor-pointer transition-colors ${hoverColor}`}>Team</Link>
          <Link href="/#contact" className={`cursor-pointer transition-colors ${hoverColor}`}>Contact</Link>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <a
            href="https://wa.me/9745647655"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBg} px-6 py-2.5 rounded-full text-[15px] font-semibold tracking-tight transition-colors hidden sm:block`}
          >
            Let&apos;s talk
          </a>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#050505] z-[90] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="flex flex-col items-center gap-8 text-3xl font-medium text-white/80">
          <Link href="/#work" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Work</Link>
          <Link href="/#expertise" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Solutions</Link>
          <Link href="/#why-us" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Approach</Link>
          <Link href="/#about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">About</Link>
          <Link href="/#team" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Team</Link>
          <Link href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Contact</Link>
        </div>

        <a
          href="https://wa.me/9745647655"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold tracking-tight mt-8"
        >
          Let&apos;s talk
        </a>
      </div>
    </>
  );
}
