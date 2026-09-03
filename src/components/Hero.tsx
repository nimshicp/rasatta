"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { Navbar } from "./Navbar";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const mediaInnerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial load animation - animates inner contents
    gsap.fromTo(mediaInnerRef.current,
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
    );

    // Scroll animation for the sticky video
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top", // Ends when the entire hero section is out of view
        scrub: true,
      }
    });

    // Darken and scale down the video as you scroll down
    scrollTl.to(mediaContainerRef.current, {
      scale: 0.9,
      opacity: 0.1,
      ease: "none",
    });

    // Text reveal animation when the text scrolls into view
    // We animate each line individually as it enters the viewport
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current, ctaRef.current];

    lines.forEach((line) => {
      gsap.fromTo(line, {
        y: 50,
        opacity: 0,
        filter: "blur(10px)",
      }, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: line,
          start: "top 85%", // Triggers exactly when this specific line comes into view
          toggleActions: "play reverse play reverse",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-black min-h-screen">

      {/* Sticky Full-Viewport Video */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* We use a wrapper to scale the inner video without affecting the sticky positioning */}
        <div
          ref={mediaContainerRef}
          className="absolute inset-0 z-0 bg-black overflow-hidden origin-center"
        >
          <div ref={mediaInnerRef} className="absolute inset-0 flex flex-col justify-between p-6 pt-4 md:px-12 md:py-8 lg:px-24 lg:py-8">

            {/* The actual video */}
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              autoPlay
              muted
              loop
              playsInline
              src="/WhatsApp Video 2026-09-03 at 1.01.18 PM.mp4 (1).mp4"
            />

            {/* Dark overlay specifically for the video so text is readable */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Top Navigation inside Media (Minimal & Transparent) */}
            <Navbar />

            {/* Bottom indicator inside Media */}
            <div className="relative z-30 flex justify-between items-end w-full pb-8">
              <div className="text-xl font-medium text-white flex items-center gap-4">
                <div className="w-1 h-8 bg-white" />
                Lead by Design
              </div>
              <ArrowDown className="w-6 h-6 text-white animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling Text overlay */}
      {/* Gradient transition to blend the video into the solid black section smoothly */}
      <div className="relative z-10 w-full h-[40vh] mt-[60vh] bg-gradient-to-b from-transparent to-black pointer-events-none" />

      {/* Solid black text container so no video shows behind the text itself */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-black pb-32 pt-4"
      >
        <div className="max-w-5xl flex flex-col">
          <div ref={line1Ref} className="text-3xl md:text-5xl lg:text-[4rem] font-medium leading-none tracking-tight text-white pb-1">
            Crafting Brands That Lead,
          </div>
          <div ref={line2Ref} className="text-3xl md:text-5xl lg:text-[4rem] font-medium leading-none tracking-tight text-gray-400">
            Influence & Inspire.
          </div>
          <div ref={line3Ref} className="text-xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-snug tracking-tight mt-8 max-w-4xl">
            Social Media Marketing, Personal Branding, Video Production & Branding for the modern era.
          </div>
          <div ref={line4Ref} className="text-base md:text-lg text-gray-500 font-light mt-6 max-w-2xl">
            We help businesses and individuals stand out with strategic storytelling, design clarity, and content that creates measurable impact.
          </div>
          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-transform hover:scale-105">
              Book a Strategy Call
            </button>
            <button className="bg-transparent border border-gray-600 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-all hover:bg-white/10 hover:border-gray-400">
              View Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
