"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export function GeometricTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // This section is placed immediately after the Hero in the DOM,
    // but visually it acts as an overlay during the scroll.
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        // We start this animation exactly when the Hero starts fading out
        start: "top bottom", 
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // 1. Shape appears from center, scales up and rotates
    tl.fromTo(shapeRef.current, 
      { scale: 0, rotation: -90, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    // 2. Shape scales aggressively out of view (creating a "hole" to see the next section)
    tl.to(shapeRef.current, {
      scale: 50,
      opacity: 0,
      rotation: 90,
      duration: 1.5,
      ease: "power4.in"
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="absolute top-[100vh] left-0 w-full h-[150vh] pointer-events-none z-30 flex items-center justify-center"
      style={{ marginTop: '-150vh' }} // Pull it up so it overlaps the pinned Hero
    >
      <div 
        ref={shapeRef}
        className="w-32 h-32 md:w-64 md:h-64 border-4 border-white flex items-center justify-center rounded-3xl"
        style={{ opacity: 0 }}
      >
        <div className="w-16 h-16 md:w-32 md:h-32 bg-white rounded-xl rotate-45" />
      </div>
    </div>
  );
}
