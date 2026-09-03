"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "SOCIAL MEDIA MARKETING.",
    subtitle: "Your brand deserves more than just posts — it deserves strategy.",
    description: "We craft tailored social media ecosystems that build awareness, trust, and conversions. Our approach ensures every piece of content drives measurable impact.",
    deliverables: ["Platform strategy & management", "Content creation", "Paid advertising", "Analytics & performance"]
  },
  {
    id: "02",
    title: "BRANDING.",
    subtitle: "Where identity meets intention.",
    description: "We create visual languages that reflect who you are and where you’re going. A strong brand is the foundation of all successful marketing efforts.",
    deliverables: ["Logo design", "Brand identity systems", "Typography & style guides", "Brand positioning"]
  },
  {
    id: "03",
    title: "VIDEO PRODUCTION.",
    subtitle: "Stories people want to watch.",
    description: "Our production team turns ideas into cinematic visuals that drive emotion and engagement. We handle everything from concept to final cut.",
    deliverables: ["Brand films", "Social media videos", "Product commercials", "Event coverage"]
  },
  {
    id: "04",
    title: "PERSONAL BRANDING.",
    subtitle: "Your story deserves to be seen.",
    description: "We help founders, creators, and professionals shape a digital presence that aligns with their expertise, values, and long-term goals.",
    deliverables: ["Profile optimization", "Content strategy", "Thought-leadership", "Video identity"]
  }
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackContainerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const cardsRef = useRef<HTMLElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current;
    const texts = textRefs.current;

    if (!cards.length) return;

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

    // --- Initial States ---
    // All cards except the first one start pushed down below the viewport
    gsap.set(cards, {
      y: "100%",
      backgroundColor: "#F5F5F5",
      scale: 1
    });
    // First card starts in the center
    gsap.set(cards[0], { y: "0%" });

    // Text inside cards (except the first) starts blurred and offset
    gsap.set(texts, { y: 30, opacity: 0, filter: "blur(6px)" });
    gsap.set(texts[0], { y: 0, opacity: 1, filter: "blur(0px)" });

    // --- Master Timeline for the Scroll Sequence ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stackContainerRef.current,
        start: "center center",
        end: `+=${cards.length * 100}%`, // Very long scroll duration for smoothness
        scrub: true,
        pin: true,
      }
    });

    cards.forEach((card, index) => {
      // Skip the first card as it's already on screen
      if (index === 0) return;

      const tlChunk = gsap.timeline();

      // 1. Move all PREVIOUS cards back and darken them to create depth
      for (let i = 0; i < index; i++) {
        const depth = index - i; // How many steps back this card is from the active one

        // Calculate stacking physical position
        const nextY = -(depth * 3); // -3%, -6%, -9% ...
        const nextScale = 1 - (depth * 0.03); // 0.97, 0.94, 0.91 ...

        // Darken the background based on depth (Monochrome Hierarchy)
        let nextColor = "#d0d0d0"; // 1 step back
        if (depth === 2) nextColor = "#999999"; // 2 steps back
        if (depth === 3) nextColor = "#666666"; // 3 steps back

        tlChunk.to(cards[i], {
          y: `${nextY}%`,
          scale: nextScale,
          backgroundColor: nextColor,
          duration: 1,
          ease: "none"
        }, 0); // start at the exact same time
      }

      // 2. Bring the NEW card up from the bottom
      tlChunk.to(card, {
        y: "0%",
        duration: 1,
        ease: "none"
      }, 0);

      // 3. Subtle internal text motion as the new card slides in
      tlChunk.to(texts[index], {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "none"
      }, 0.6); // Start revealing text towards the end of the slide up

      // Append this chunk to the main scroll timeline
      tl.add(tlChunk);
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black w-full text-black relative" id="expertise">

      {/* --- Intro Area (Black Background, White Text) --- */}
      <div ref={introRef} className="pt-32 pb-4 md:pb-8 flex flex-col justify-center px-6 md:px-12 lg:px-24">
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

      {/* --- Pinned Stacked Cards Section --- */}
      <div
        ref={stackContainerRef}
        className="relative w-full overflow-hidden flex items-start justify-center bg-black pb-32 pt-4"
      >


        {/* The Card Stack */}
        <div className="relative w-[92vw] md:w-[85vw] max-w-7xl h-[50vh] md:h-[55vh]">
          {services.map((service, index) => (
            <article
              key={service.id}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="absolute inset-0 w-full h-full rounded-[24px] md:rounded-[32px] p-8 md:p-16 flex flex-col justify-center shadow-[0_-15px_40px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ zIndex: index }}
            >
              {/* Content */}
              <div ref={(el) => { if (el) textRefs.current[index] = el; }} className="will-change-transform">
                <span className="block text-[#777777] font-mono text-3xl md:text-5xl font-bold mb-4 md:mb-8 tracking-tighter">
                  {service.id}
                </span>
                <h3 className="text-4xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter uppercase leading-[0.9] max-w-4xl text-black">
                  {service.title}
                </h3>
                <h4 className="mt-6 md:mt-12 text-xl md:text-3xl text-[#555555] font-medium tracking-tight max-w-2xl leading-tight">
                  {service.subtitle}
                </h4>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
