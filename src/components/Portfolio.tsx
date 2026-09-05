"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Desktop Animation (min-width: 768px)
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Initial State: Perfectly centered card within the viewport bounds
      gsap.set(heroWrapperRef.current, {
        width: "95vw",
        height: "90vh",
        borderRadius: "32px",
      });

      // Side cards start slightly scaled down and hidden
      gsap.set([leftColRef.current, rightColRef.current], {
        opacity: 0,
        scale: 0.9,
      });

      // Bottom card starts hidden below
      gsap.set(bottomImageRef.current, {
        opacity: 0,
        y: 15,
      });

      // 2. Scroll Timeline Sequence
      tl.to(heroWrapperRef.current, {
        width: "100%",
        height: "calc(65% - 1rem)",
        borderRadius: "16px",
        ease: "power2.inOut",
        duration: 2,
      }, 0);

      tl.to([leftColRef.current, rightColRef.current], {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 1.5,
      }, 0.2);

      tl.to(bottomImageRef.current, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 1.2,
      }, 0.4);
    });

    // Mobile Animation (max-width: 767px)
    mm.add("(max-width: 767px)", () => {
      // No GSAP animation needed on mobile since we just show a static video
    });

    return () => mm.revert(); // Cleanup matchMedia
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-screen w-screen bg-black overflow-hidden flex flex-col justify-center items-center p-0 md:p-6">

      {/* Desktop Viewport-locked 3-Column Grid Container */}
      <div className="hidden md:grid w-full max-w-[82rem] h-[85vh] grid-cols-3 gap-4 items-stretch justify-center">

        {/* Left Column Card */}
        <div
          ref={leftColRef}
          className="flex flex-col h-full rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' }}
        />

        {/* Center Column (Hero Card + Bottom Card Stack) */}
        <div className="relative w-full h-full z-20">

          {/* Main Hero Card - Absolutely positioned so it can break out of the grid bounds during its large initial state! */}
          <div
            ref={heroWrapperRef}
            className="absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden group shadow-2xl shadow-black flex items-center justify-center bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop)' }} />
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/30 transition-colors duration-500" />
          </div>

          {/* Bottom Grid Card */}
          <div
            ref={bottomImageRef}
            className="absolute bottom-0 left-0 w-full h-[35%] rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop)' }}
          />
        </div>

        {/* Right Column Card */}
        <div
          ref={rightColRef}
          className="flex flex-col h-full rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop)' }}
        />

      </div>

      {/* Mobile-only Infinite Marquee Container */}
      <div className="flex md:hidden w-full h-full relative overflow-hidden gap-4 p-4">

        {/* Left Column (Scrolling UP) */}
        <div className="w-1/2 flex flex-col gap-4 animate-marquee-up relative h-max">
          {/* First set of images */}
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-square rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop)' }} />

          {/* Duplicate set for seamless infinite loop */}
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-square rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop)' }} />
        </div>

        {/* Right Column (Scrolling DOWN) */}
        <div className="w-1/2 flex flex-col gap-4 animate-marquee-down relative h-max">
          {/* First set of images */}
          <div className="w-full aspect-square rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop)' }} />

          {/* Duplicate set for seamless infinite loop */}
          <div className="w-full aspect-square rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop)' }} />
          <div className="w-full aspect-[4/5] rounded-xl bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2000&auto=format&fit=crop)' }} />
        </div>

        {/* Subtle gradient so it blends nicely into the black sections around it */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />
      </div>
    </div>
  );
}