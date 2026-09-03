"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  hideCta?: boolean;
}

export function Footer({ hideCta = false }: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      animation: gsap.fromTo(ctaContentRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    });

  }, { scope: containerRef });

  return (
    <>
      {/* Final CTA Section */}
      {!hideCta && (
      <section ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-white text-black text-center relative overflow-hidden">
        <div ref={ctaContentRef} className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">
            Ready to Elevate <br/> Your Brand?
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
            Whether you need a full brand identity, high-impact social media presence, or content that converts — we’re here to help you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="#contact" className="group flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-transform hover:scale-105 active:scale-95">
              Schedule a Consultation
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Link>
            <Link href="mailto:rasatta.in@gmail.com" className="group flex items-center justify-center gap-2 bg-transparent text-black border border-black/20 px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase transition-colors hover:bg-black/5 active:scale-95">
              Send Us a Message
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Ambient abstract shape */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-gradient-to-tr from-gray-200 to-gray-50 rounded-full blur-[100px]" />
        </div>
      </section>
      )}

      {/* Main Footer */}
      <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
            
            {/* Branding Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <h3 className="text-2xl font-bold tracking-tighter">RASATTA</h3>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Premium Creative & <br/> Digital Agency</p>
              <p className="text-gray-500 max-w-xs">
                Crafting brands that stand out in design, strategy, and storytelling.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">Services</h4>
              <ul className="flex flex-col gap-4 text-gray-300">
                <li><Link href="#services" className="hover:text-white transition-colors">Social Media Marketing</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Branding</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Video Production</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Personal Branding</Link></li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">Explore</h4>
              <ul className="flex flex-col gap-4 text-gray-300">
                <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="#portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">Email</span>
                  <a href="mailto:rasatta.in@gmail.com" className="hover:text-white transition-colors">rasatta.in@gmail.com</a>
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">Phone</span>
                  <a href="tel:+918301812871" className="hover:text-white transition-colors">+91 83018 12871</a>
                </li>
                <li className="flex gap-4">
                  <span className="text-gray-500 w-16">Location</span>
                  <span>Thrissur, Kerala, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-500 text-sm gap-4">
            <p>© {new Date().getFullYear()} Rasatta — All Rights Reserved</p>
          </div>

        </div>
      </footer>
    </>
  );
}
