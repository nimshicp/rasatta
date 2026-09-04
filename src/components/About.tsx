"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = textRef.current?.querySelectorAll(".reveal-text");

    if (elements) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        animation: gsap.fromTo(elements,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
        )
      });
    }

  }, { scope: containerRef });

  return (
    <section id="about" className="pt-24 pb-12 md:pt-40 md:pb-12 px-6 md:px-12 lg:px-24 bg-[#050505] border-t border-white/5 relative z-20 overflow-hidden" ref={containerRef}>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* The Grid */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{ 
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
            `, 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* Subtle Noise Texture for premium film feel - HIDDEN ON MOBILE FOR PERFORMANCE */}
        <svg className="absolute inset-0 w-full h-full opacity-20 mix-blend-overlay hidden md:block">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>

        {/* Subtle radial mask so the grid fades out at the edges smoothly */}
        <div className="absolute inset-0 bg-black/60 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 relative z-10" ref={textRef}>

        {/* Left Column - Sticky Heading */}
        <div className="md:w-2/5">
          <div className="sticky top-32">
            <h2 className="reveal-text text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-8">
              About Rasatta
            </h2>
            <h3 className="reveal-text text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
              We Build Brands<br />
              with<br />
              <span className="text-gray-500">Purpose &<br />Precision</span>
            </h3>
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="md:w-3/5 flex flex-col gap-6 text-base md:text-lg text-gray-300 leading-relaxed font-light">
          <p className="reveal-text">
            At Rasatta, creativity meets strategy. We partner with ambitious brands and individuals to elevate their identity, amplify their voice, and create experiences that people remember.
          </p>
          <p className="reveal-text">
            With a design-first mindset and data-driven approach, we don’t just make content — we shape perception.
          </p>
          <p className="reveal-text">
            Whether you’re building a brand from the ground up or scaling your influence, Rasatta ensures your presence stands out in a crowded digital world.
          </p>
        </div>

      </div>
    </section>
  );
}
