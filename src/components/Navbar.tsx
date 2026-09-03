"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  theme?: "light" | "dark";
}

export function Navbar({ theme = "dark" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <div className={`relative z-50 flex justify-between items-center w-full ${textColor}`}>
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter cursor-pointer z-50">RASATTA</Link>

        {/* Center Links (Hidden on Mobile) */}
        <div className={`hidden lg:flex items-center gap-8 text-[15px] font-medium ${textMuted}`}>
          <Link href="/work" className={`cursor-pointer transition-colors ${hoverColor}`}>Work</Link>
          <span className={`cursor-pointer transition-colors ${hoverColor}`}>Solutions</span>
          <span className={`cursor-pointer transition-colors ${hoverColor}`}>Approach</span>
          <span className={`cursor-pointer transition-colors ${hoverColor}`}>Company</span>
          <span className={`cursor-pointer transition-colors ${hoverColor}`}>Careers</span>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4 z-50">
          <button className={`${buttonBg} px-6 py-2.5 rounded-full text-[15px] font-semibold tracking-tight transition-colors hidden sm:block`}>
            Let&apos;s talk
          </button>
          
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
        className={`fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-3xl font-medium text-white/80">
          <Link href="/work" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">Work</Link>
          <span onClick={() => setIsOpen(false)} className="hover:text-white transition-colors cursor-pointer">Solutions</span>
          <span onClick={() => setIsOpen(false)} className="hover:text-white transition-colors cursor-pointer">Approach</span>
          <span onClick={() => setIsOpen(false)} className="hover:text-white transition-colors cursor-pointer">Company</span>
          <span onClick={() => setIsOpen(false)} className="hover:text-white transition-colors cursor-pointer">Careers</span>
        </div>
        
        <button className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold tracking-tight mt-8">
          Let&apos;s talk
        </button>
      </div>
    </>
  );
}
