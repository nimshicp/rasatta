import Link from "next/link";

interface NavbarProps {
  theme?: "light" | "dark";
}

export function Navbar({ theme = "dark" }: NavbarProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const textMuted = isDark ? "text-white/80" : "text-black/70";
  const hoverColor = isDark ? "hover:text-white" : "hover:text-black";
  
  const buttonBg = isDark ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800";

  return (
    <div className={`relative z-30 flex justify-between items-center w-full ${textColor}`}>
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-tighter cursor-pointer">RASATTA</Link>

      {/* Center Links (Hidden on Mobile) */}
      <div className={`hidden lg:flex items-center gap-8 text-[15px] font-medium ${textMuted}`}>
        <Link href="/work" className={`cursor-pointer transition-colors ${hoverColor}`}>Work</Link>
        <span className={`cursor-pointer transition-colors ${hoverColor}`}>Solutions</span>
        <span className={`cursor-pointer transition-colors ${hoverColor}`}>Approach</span>
        <span className={`cursor-pointer transition-colors ${hoverColor}`}>Company</span>
        <span className={`cursor-pointer transition-colors ${hoverColor}`}>Careers</span>
      </div>

      {/* CTA Button */}
      <div>
        <button className={`${buttonBg} px-6 py-2.5 rounded-full text-[15px] font-semibold tracking-tight transition-colors`}>
          Let&apos;s talk
        </button>
      </div>
    </div>
  );
}
