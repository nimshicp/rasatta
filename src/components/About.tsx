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
    <section id="about" className="py-40 px-6 md:px-12 lg:px-24 bg-black border-t border-white/5" ref={containerRef}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24" ref={textRef}>

        {/* Left Column - Sticky Heading */}
        <div className="md:w-1/3">
          <div className="sticky top-32">
            <h2 className="reveal-text text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
              About Rasatta
            </h2>
            <h3 className="reveal-text text-3xl md:text-5xl font-medium tracking-tight leading-tight">
              We Build Brands with <br />
              <span className="text-gray-500">Purpose & Precision</span>
            </h3>
          </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="md:w-2/3 flex flex-col gap-8 text-lg md:text-2xl text-gray-300 leading-relaxed font-light">
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
