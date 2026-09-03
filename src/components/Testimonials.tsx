"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
  const containerRef = useRef<HTMLDivElement>(null);
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
    <section id="testimonials" className="py-32 px-6 md:px-12 lg:px-24 bg-[#050505] overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-24 text-center">
          <h2 className="reveal-header text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            Testimonials
          </h2>
          <h3 className="reveal-header text-4xl md:text-5xl font-medium tracking-tight">
            What Our Clients Say
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          {/* Decorative Quote Mark */}
          <div className="absolute -top-12 lg:-top-24 left-0 text-[10rem] lg:text-[20rem] leading-none font-serif text-white/5 select-none pointer-events-none">
            &quot;
          </div>

          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => {if(el) itemsRef.current[index] = el;}}
              className="lg:w-1/2 flex flex-col justify-between"
            >
              <p className="text-2xl md:text-4xl font-light leading-snug tracking-tight mb-12 text-gray-300">
                “{testimonial.quote}”
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10" />
                <div>
                  <h5 className="font-medium text-lg">{testimonial.author}</h5>
                  <p className="text-gray-500 text-sm uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
