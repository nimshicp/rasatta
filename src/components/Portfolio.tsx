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
      borderRadius: "32px", // Slightly larger border radius for the huge card
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
    // Shrink the hero container smoothly into its exact grid slot proportions
    tl.to(heroWrapperRef.current, {
      width: "100%",
      height: "calc(65% - 1rem)",
      borderRadius: "16px",
      ease: "power2.inOut",
      duration: 2,
    }, 0);

    // Fade and scale in side columns to reveal the outer grid bounds
    tl.to([leftColRef.current, rightColRef.current], {
      opacity: 1,
      scale: 1,
      ease: "power2.out",
      duration: 1.5,
    }, 0.2);

    // Fade and slide in the bottom slot image
    tl.to(bottomImageRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 1.2,
    }, 0.4);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-screen w-screen bg-black overflow-hidden flex flex-col justify-center items-center p-4 md:p-6">

      {/* Viewport-locked 3-Column Grid Container */}
      <div className="w-full max-w-[82rem] h-[85vh] grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch justify-center">

        {/* Left Column Card */}
        <div
          ref={leftColRef}
          className="hidden md:flex flex-col h-full rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center shadow-2xl"
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
            className="absolute bottom-0 left-0 w-full h-[35%] rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center hidden md:block shadow-2xl"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop)' }}
          />
        </div>

        {/* Right Column Card */}
        <div
          ref={rightColRef}
          className="hidden md:flex flex-col h-full rounded-2xl overflow-hidden brightness-[0.35] hover:brightness-100 transition-all duration-500 bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop)' }}
        />

      </div>
    </div>
  );
}