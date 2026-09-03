"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote: "Rasatta transformed our brand presence with clarity and style. Their strategic thinking changed our entire digital direction.",
    author: "Client Name",
    role: "CEO, Tech Innovators",
  },
  {
    quote: "Professional, creative, and reliable. The team understands exactly what the brand needs to succeed in today's market.",
    author: "Client Name",
    role: "Founder, Heritage Co.",
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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

    itemsRef.current.forEach((item, i) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        animation: gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        )
      });
    });

  }, { scope: containerRef });

  return (
    <section id="testimonials" className="pt-16 pb-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] text-white relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-12">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <h2 className="reveal-header text-3xl md:text-4xl font-normal tracking-wide uppercase leading-snug text-white/90">
            Clients About <br className="hidden md:block" /> Our Work
          </h2>

          {/* Navigation Arrows */}
          <div className="reveal-header hidden md:flex items-center gap-6 text-white/40">
            <button className="hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6 font-light" strokeWidth={1} />
            </button>
            <button className="hover:text-white transition-colors">
              <ArrowRight className="w-6 h-6 font-light" strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => { if (el) itemsRef.current[index] = el; }}
              className="bg-[#0a0a0a] p-10 md:p-14 flex gap-6 md:gap-10 group hover:bg-[#0f0f0f] transition-colors"
            >
              {/* Quote Icon */}
              <div className="flex-shrink-0 text-6xl md:text-7xl font-serif text-[#E4C5AE] leading-none -mt-4 opacity-90 group-hover:opacity-100 transition-opacity">
                “
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between h-full">
                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-16 md:mb-24">
                  {testimonial.quote}
                </p>
                <div>
                  <h5 className="font-medium text-white text-base mb-1">{testimonial.author}</h5>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
