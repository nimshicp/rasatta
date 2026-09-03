"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const reasons = [
  {
    title: "Design-Led Thinking",
    description: "Every detail matters.",
  },
  {
    title: "Strategic Approach",
    description: "Deep audience and category understanding.",
  },
  {
    title: "Consistency That Builds Trust",
    description: "Cohesive messaging and visuals.",
  },
  {
    title: "Long-Term Growth Mindset",
    description: "Tangible, measurable business impact.",
  }
];

export function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reasonsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const headers = containerRef.current?.querySelectorAll(".reveal-header");
    
    if (headers) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        animation: gsap.fromTo(headers,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
        )
      });
    }

    reasonsRef.current.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        animation: gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
      });
    });

  }, { scope: containerRef });

  return (
    <section id="why-us" className="py-32 px-6 md:px-12 lg:px-24 bg-black relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Sticky Header Column */}
        <div className="lg:w-1/3">
          <div className="sticky top-32">
            <h2 className="reveal-header text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
              Why Rasatta
            </h2>
            <h3 className="reveal-header text-4xl md:text-5xl font-medium tracking-tight">
              Why Brands <br/>
              <span className="text-gray-500">Choose Us</span>
            </h3>
          </div>
        </div>

        {/* Reasons List */}
        <div className="lg:w-2/3 flex flex-col gap-12 lg:gap-24">
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={el => {if(el) reasonsRef.current[index] = el;}}
              className="group"
            >
              <div className="flex flex-col gap-4">
                <div className="h-[1px] w-full bg-white/20 mb-4 group-hover:bg-white transition-colors duration-500" />
                <h4 className="text-3xl md:text-4xl font-medium text-white">{reason.title}</h4>
                <p className="text-xl md:text-2xl text-gray-400 font-light">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
