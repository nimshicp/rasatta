"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Farine",
    role: "Founder of LogoFolio",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Konrad Cheung",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Carla Lopez",
    role: "Head of Marketing",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  },
];

export function Team() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // Mobile active card
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const headers =
        containerRef.current?.querySelectorAll(".reveal-header");

      if (headers) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 75%",
          animation: gsap.fromTo(
            headers,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "power3.out",
            }
          ),
        });
      }

      cardsRef.current.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          animation: gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: i * 0.1,
              ease: "power3.out",
            }
          ),
        });
      });
    },
    { scope: containerRef }
  );

  const handleCardClick = (index: number) => {
    setActiveCard((current) => (current === index ? null : index));
  };

  return (
    <section
      id="team"
      className="pt-4 md:pt-8 pb-16 px-6 md:px-12 lg:px-24 relative z-20 bg-[#050505] text-white"
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
          {teamMembers.map((member, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg outline-none ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => handleCardClick(index)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                {/* Image */}
                <div className="absolute inset-0 w-full h-full bg-neutral-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-1000 grayscale ${
                      isActive
                        ? "scale-105 grayscale-0"
                        : "scale-100 grayscale"
                    } md:group-hover:scale-105 md:group-hover:grayscale-0`}
                  />
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-80"
                  } md:group-hover:opacity-100`}
                />

                {/* Hover Glow Effect */}
                <div
                  className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#ea580c] rounded-full blur-[70px] transition-opacity duration-700 pointer-events-none ${
                    isActive ? "opacity-40" : "opacity-0"
                  } md:group-hover:opacity-40`}
                />

                {/* Content Box */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center text-white">
                  {/* View Profile Button */}
                  <div
                    className={`mb-6 transition-all duration-500 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    } md:group-hover:opacity-100 md:group-hover:translate-y-0`}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2 bg-white/10 hover:bg-[#ea580c] backdrop-blur-md border border-white/25 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      View profile
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <h3
                    className={`text-2xl font-medium tracking-tight mb-2 transform transition-transform duration-500 ${
                      isActive ? "-translate-y-2" : "translate-y-0"
                    } md:group-hover:-translate-y-2`}
                  >
                    {member.name}
                  </h3>

                  <p
                    className={`text-gray-300 text-sm transform transition-transform duration-500 ${
                      isActive ? "-translate-y-2" : "translate-y-0"
                    } md:group-hover:-translate-y-2`}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}