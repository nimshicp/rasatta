"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Farine",
    role: "Founder of LogoFolio",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Konrad Cheung",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Carla Lopez",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  }
];

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headers = containerRef.current?.querySelectorAll(".reveal-header");

    if (headers) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        animation: gsap.fromTo(headers,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
        )
      });
    }

    cardsRef.current.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        animation: gsap.fromTo(card,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: "power3.out" }
        )
      });
    });

    // --- Smooth background & text color fade transition from Light to Dark ---
    gsap.fromTo(containerRef.current,
      { backgroundColor: "#f8f8f8", color: "#000000" },
      {
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Starts when top of Team hits bottom of viewport
          end: "top 30%",      // Completes transition as it scrolls up
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      id="team"
      // Starts light (#f8f8f8) to match the end of WhyUs, GSAP scrubs it to dark (#0a0a0a)
      className="pt-32 pb-16 px-6 md:px-12 lg:px-24 relative z-20 bg-[#f8f8f8] text-black"
      ref={containerRef}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="reveal-header border border-current opacity-70 rounded-full px-6 py-2 text-sm font-medium tracking-wide mb-6">
            Our Team
          </div>
          <h2 className="reveal-header text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            The Minds Behind Rasatta
          </h2>
          <p className="reveal-header opacity-60 text-xl max-w-xl font-light">
            A hands-on team focused on results, not volume.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full bg-neutral-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover Glow Effect */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#ea580c] rounded-full blur-[70px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

              {/* Content Box */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center text-white">

                {/* Hover Button */}
                <div className="mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-[#ea580c] backdrop-blur-md border border-white/25 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300">
                    View profile
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-medium tracking-tight mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">
                  {member.name}
                </h3>
                <p className="text-gray-300 text-sm transform group-hover:-translate-y-2 transition-transform duration-500">
                  {member.role}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}