"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [error, setError] = useState("");

  const handleWhatsAppSubmit = () => {
    setError("");
    const { name, email, phone, message } = formData;
    
    if (!name.trim()) {
      setError("Full Name is required.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("A valid Email is required.");
      return;
    }
    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message is required.");
      return;
    }

    const whatsappMessage = `*New Website Enquiry*\n\n*Full Name:* ${name.trim()}\n*Email:* ${email.trim()}\n*Phone:* ${phone.trim()}\n\n*Message:*\n${message.trim()}`;
    const whatsappUrl = `https://wa.me/9745647655?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      }
    });

    // Animate heading lines
    tl.fromTo(".contact-heading",
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out" }
    )
      // Animate form inputs
      .fromTo(".contact-input",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
        "-=0.8"
      )
      // Animate buttons
      .fromTo(".contact-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="contact" className="relative bg-[#fafafa] pt-32 pb-20 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center text-[#111111] overflow-hidden">

      {/* Ambient Premium Glows for Depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-black/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-black/5 rounded-full blur-[150px] pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 mt-12">

        {/* Left Side: Typography */}
        <div className="flex flex-col relative h-full justify-center">
          <h1 className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-black leading-[0.85] tracking-tighter text-[#111] uppercase">
            <div className="overflow-hidden py-2"><div className="contact-heading">LET'S</div></div>
            <div className="overflow-hidden py-2"><div className="contact-heading ml-12 md:ml-32">GET IN</div></div>
            <div className="overflow-hidden py-2"><div className="contact-heading">TOUCH</div></div>
          </h1>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col justify-center h-full pt-4 md:pt-12 pb-4">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-12 w-full max-w-lg ml-auto">

            <div className="flex flex-col md:flex-row gap-12 md:gap-8">
              {/* Full Name */}
              <div className="relative flex-1 group contact-input">
                <label htmlFor="name" className="text-[10px] md:text-xs font-semibold tracking-widest text-[#111]/50 uppercase absolute -top-6 left-0 transition-colors group-focus-within:text-[#111]">Full Name</label>
                <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-[#111]/20 pb-3 text-[#111] outline-none focus:border-[#111] transition-all" />
                <div className="absolute right-0 bottom-3 text-[#111]/30 text-[10px]">+</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-8">
              {/* Email */}
              <div className="relative flex-1 group contact-input">
                <label htmlFor="email" className="text-[10px] md:text-xs font-semibold tracking-widest text-[#111]/50 uppercase absolute -top-6 left-0 transition-colors group-focus-within:text-[#111]">Email</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-[#111]/20 pb-3 text-[#111] outline-none focus:border-[#111] transition-all" />
                <div className="absolute right-0 bottom-3 text-[#111]/30 text-[10px]">+</div>
              </div>

              {/* Phone */}
              <div className="relative flex-1 group contact-input">
                <label htmlFor="phone" className="text-[10px] md:text-xs font-semibold tracking-widest text-[#111]/50 uppercase absolute -top-6 left-0 transition-colors group-focus-within:text-[#111]">Phone</label>
                <input type="tel" id="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-[#111]/20 pb-3 text-[#111] outline-none focus:border-[#111] transition-all" />
                <div className="absolute right-0 bottom-3 text-[#111]/30 text-[10px]">+</div>
              </div>
            </div>

            {/* Message */}
            <div className="relative w-full group mt-4 contact-input">
              <label htmlFor="message" className="text-[10px] md:text-xs font-semibold tracking-widest text-[#111]/50 uppercase absolute -top-6 left-0 transition-colors group-focus-within:text-[#111]">Message</label>
              <input type="text" id="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-[#111]/20 pb-3 text-[#111] outline-none focus:border-[#111] transition-all" />
              <div className="absolute right-0 bottom-3 text-[#111]/30 text-[10px]">+</div>
            </div>

            {error && (
              <div className="text-red-500 text-xs font-medium tracking-wide mt-2">
                {error}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-4">
              <a href="tel:9745647655" className="contact-btn group flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#222] hover:shadow-xl hover:-translate-y-1 active:scale-95 flex-1">
                Schedule a Consultation
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <button type="button" onClick={handleWhatsAppSubmit} className="contact-btn group flex items-center justify-center gap-3 bg-transparent text-black border border-black/20 px-8 py-5 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-black/5 hover:border-black/40 hover:shadow-sm hover:-translate-y-1 active:scale-95 flex-1 w-full sm:w-auto">
                Send Us a Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </section>
  );
}
