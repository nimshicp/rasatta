"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const services = [
  {
    id: "01",
    title: "SOCIAL MEDIA MARKETING",
    subtitle: "Your brand deserves more than just posts — it deserves strategy.",
    description: "We craft tailored social media ecosystems that build awareness, trust, and conversions.",
    deliverables: ["Platform strategy & management", "Content creation", "Paid advertising", "Analytics & performance optimization"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "BRANDING",
    subtitle: "Where identity meets intention.",
    description: "We create visual languages that reflect who you are and where you’re going.",
    deliverables: ["Logo design", "Brand identity systems", "Color palettes, typography & style guides", "Brand strategy & positioning"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "VIDEO PRODUCTION",
    subtitle: "Stories people want to watch.",
    description: "Our production team turns ideas into cinematic visuals that drive emotion and engagement.",
    deliverables: ["Brand films", "Social media videos", "Product videos", "Event coverage"],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "PERSONAL BRANDING",
    subtitle: "Your story deserves to be seen.",
    description: "We help founders, creators, and professionals shape a digital presence that aligns with their expertise, values, and long-term goals.",
    deliverables: ["Profile optimization", "Content strategy", "Thought-leadership content", "Long-form & short-form video identity"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop"
  }
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Text Reveal Animation ---
    gsap.to(wordsRef.current, {
      scrollTrigger: {
        trigger: introRef.current,
        start: "top 75%",
        end: "bottom 50%",
        scrub: true,
      },
      color: "#FFFFFF",
      stagger: 0.1,
    });

    // --- Pin Section for Curtain Slide Effect ---
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom bottom", // Pin when the bottom of the section hits the bottom of the viewport
      end: "+=100%", // Keep it pinned while scrolling for 1 viewport height
      pin: true,
      pinSpacing: false, // Don't add padding below it so the next section slides directly over
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black w-full text-black relative z-0" id="expertise">

      {/* --- Intro Area (Black Background, White Text) --- */}
      <div ref={introRef} className="pt-16 pb-8 md:pt-32 md:pb-16 flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <h2 className="text-white text-6xl md:text-[8rem] font-bold tracking-tighter mb-4 leading-[0.9]">
          Solutions.
        </h2>
        <p className="text-xl md:text-3xl lg:text-4xl font-medium tracking-tight max-w-4xl leading-snug text-[#333333]">
          {"AI-native. Systems-driven. Expert-led. The capabilities that turn ideas into impact.".split(" ").map((word, i) => (
            <span key={i} ref={(el) => { if (el) wordsRef.current[i] = el; }} className="mr-[0.3em] inline-block transition-colors duration-200">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* --- Responsive Grid Area --- */}
      <div className="w-full px-6 md:px-12 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group relative bg-[#111111] hover:bg-[#1a1a1a] border border-white/10 rounded-[24px] flex flex-col justify-start transition-all duration-500 hover:scale-105 hover:z-10 hover:shadow-2xl cursor-pointer overflow-hidden min-h-[420px] outline-none"
              onClick={() => {}}
              tabIndex={0}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 pointer-events-none"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              {/* Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-black/20 pointer-events-none" />

              {/* Card Content */}
              <div className="relative p-8 md:p-10 flex flex-col h-full z-10">
                <span className="block text-white/40 group-hover:text-white font-mono text-xl md:text-2xl font-bold mb-6 tracking-tighter transition-colors duration-500">
                  {service.id}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase leading-[1.1] text-white mb-4">
                  {service.title}
                </h3>
                <h4 className="text-sm md:text-base text-gray-300 font-medium tracking-tight leading-relaxed mb-6 group-hover:text-white transition-colors duration-500">
                  {service.subtitle}
                </h4>

                <div className="mt-auto pt-6 border-t border-white/20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <ul className="flex flex-col gap-3">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-gray-300 flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
