"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Text fades in and slightly scales down (or tracking increases)
    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.95, filter: "blur(4px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }
    );

    // 2. Hold for a moment
    tl.to({}, { duration: 0.4 });

    // 3. Text fades out
    tl.to(textRef.current, {
      opacity: 0,
      scale: 1.05,
      filter: "blur(4px)",
      duration: 0.6,
      ease: "power2.inOut"
    });

    // 4. Background slides up/fades out to reveal the site
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
    >
      <div
        ref={textRef}
        className="text-4xl md:text-6xl font-light tracking-[0.4em] md:tracking-[0.6em] text-white/80 uppercase ml-[0.6em]"
      >
        Rasatta
      </div>
    </div>
  );
}
