"use client";

import { useState, useRef, useEffect } from "react";
import { X, Play, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data based on the screenshot aesthetic
const showcaseWorks = [
  {
    id: 1,
    client: "SURESH DRIVES",
    title: "Founder of Suresh Drives",
    description:
      "Also, our driving test methods are on manual cars too",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop",
    category: "Video Production",
  },
  {
    id: 2,
    client: "EMPOWER ENGAGE ELEVATE",
    title: "Keynote Speaking Event",
    description:
      "It was only after doing personal branding that I started getting invited to lead sessions at events.",
    image:
      "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=800&auto=format&fit=crop",
    category: "Personal Branding",
  },
  {
    id: 3,
    client: "DESGRO MEDIA",
    title: "Social Media Impact",
    description:
      "If we want to run a business, it won't work without social media.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    category: "Social Media",
  },
  {
    id: 4,
    client: "DESGRO MEDIA",
    title: "Client Collaboration",
    description:
      "The experience of collaborating with the team has been phenomenal.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    category: "Branding",
  },
  {
    id: 5,
    client: "DESGRO MEDIA",
    title: "Brand Story",
    description:
      "Telling stories that resonate with the audience.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    category: "Video Production",
  },
];

export function Showcase() {
  const [selectedWork, setSelectedWork] = useState<
    (typeof showcaseWorks)[0] | null
  >(null);

  // Mobile active card
  const [activeWorkId, setActiveWorkId] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isInteracting = useRef(false);

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    let speed = 0.05; // pixels per ms

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (scrollRef.current) {
        const isPaused = activeWorkId !== null || selectedWork !== null || isInteracting.current;
        if (!isPaused) {
          scrollRef.current.scrollLeft += speed * delta;
          
          const third = scrollRef.current.scrollWidth / 3;
          if (scrollRef.current.scrollLeft >= third * 2) {
            scrollRef.current.scrollLeft -= third;
          } else if (scrollRef.current.scrollLeft <= 0) {
            scrollRef.current.scrollLeft += third;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [activeWorkId, selectedWork]);

  const handleManualScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      isInteracting.current = true;
      const scrollAmount = window.innerWidth < 768 ? 300 : 380;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
      setTimeout(() => {
        isInteracting.current = false;
      }, 600);
    }
  };

  // We duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [
    ...showcaseWorks,
    ...showcaseWorks,
    ...showcaseWorks,
  ];

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement>,
    workId: number
  ) => {
    // On desktop, preserve the existing behavior:
    // clicking a card opens the modal.
    if (window.matchMedia("(min-width: 768px)").matches) {
      const work = showcaseWorks.find((item) => item.id === workId);

      if (work) {
        setSelectedWork(work);
      }

      return;
    }

    // On mobile:
    // first tap activates the card,
    // second tap deactivates it.
    event.stopPropagation();

    setActiveWorkId((current) =>
      current === workId ? null : workId
    );
  };

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden relative">
      {/* Inline styles for hidden scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `,
        }}
      />

      <div className="px-6 md:px-12 lg:px-24 mb-20 flex flex-col items-start">
        <div className="border border-white/20 text-white/70 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase mb-6">
          Our work
        </div>

        <h2 className="text-5xl md:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
          Featured Work
        </h2>

        <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl">
          A glimpse into the brands we've built, the stories we've told,
          and the digital experiences we've crafted.
        </p>
      </div>

      {/* Infinite Scrolling Marquee Container */}
      <div className="relative w-full group/carousel">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => handleManualScroll("left")}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-white/20 backdrop-blur-md border border-white/10 md:border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 cursor-pointer outline-none"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={() => handleManualScroll("right")}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-white/20 backdrop-blur-md border border-white/10 md:border-white/20 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100 cursor-pointer outline-none"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div
          ref={scrollRef}
          onMouseEnter={() => (isInteracting.current = true)}
          onMouseLeave={() => (isInteracting.current = false)}
          onTouchStart={() => (isInteracting.current = true)}
          onTouchEnd={() => setTimeout(() => (isInteracting.current = false), 1000)}
          className="flex gap-6 px-6 overflow-x-auto hide-scrollbar w-full"
        >
          {marqueeItems.map((work, index) => {
            const isActive = activeWorkId === work.id;

            return (
              <div
                key={`${work.id}-${index}`}
                onClick={(event) => handleCardClick(event, work.id)}
                className={`group relative w-[280px] md:w-[350px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-500 ${
                  isActive
                    ? "scale-[1.03] z-10"
                    : "scale-100"
                } md:hover:scale-[1.03]`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                    isActive
                      ? "scale-110"
                      : "scale-100"
                  } group-hover:scale-110`}
                  style={{
                    backgroundImage: `url(${work.image})`,
                  }}
                />

                {/* Dark Overlay */}
                <div
                  className={`absolute inset-0 bg-black/20 transition-colors duration-500 ${
                    isActive
                      ? "bg-black/40"
                      : "bg-black/20"
                  } group-hover:bg-black/40`}
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div
                    className={`transform transition-transform duration-500 ${
                      isActive
                        ? "translate-y-0"
                        : "translate-y-4"
                    } group-hover:translate-y-0`}
                  >
                    <span className="text-[#ea580c] text-xs font-bold tracking-widest uppercase mb-2 block">
                      {work.category}
                    </span>

                    <h3 className="text-white text-xl font-bold leading-tight mb-2">
                      {work.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-gray-300 text-sm line-clamp-2 transition-opacity duration-500 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      {work.description}
                    </p>

                    {/* Case Study Button */}
                    <div
                      className={`mt-4 transition-opacity duration-500 delay-150 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0"
                      } group-hover:opacity-100`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const foundWork = showcaseWorks.find((w) => w.id === work.id);
                          if (foundWork) setSelectedWork(foundWork);
                        }}
                        className="inline-flex items-center gap-2 border border-white/50 hover:border-white hover:bg-white hover:text-black text-white text-[11px] font-bold tracking-wider uppercase px-6 py-2.5 rounded-full transition-all duration-300"
                      >
                        VIEW CASE STUDY
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const foundWork = showcaseWorks.find((w) => w.id === work.id);
                    if (foundWork) setSelectedWork(foundWork);
                  }}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "opacity-100 scale-110"
                      : "opacity-0 scale-100"
                  } group-hover:opacity-100 group-hover:scale-110`}
                >
                  <Play className="w-6 h-6 text-white ml-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Gradient Edges */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none" />

        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none" />
      </div>

      {/* Interactive Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedWork(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-[#111] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Media/Image */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-full relative bg-black">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${selectedWork.image})`,
                }}
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 h-full p-8 md:p-16 flex flex-col justify-center bg-[#111] overflow-y-auto">
              <span className="text-[#ea580c] font-mono text-sm font-semibold tracking-widest uppercase mb-4">
                {selectedWork.category}
              </span>

              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                {selectedWork.title}
              </h2>

              <h3 className="text-xl text-gray-400 mb-8 font-light">
                Client:{" "}
                <span className="text-white font-medium">
                  {selectedWork.client}
                </span>
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {selectedWork.description}
              </p>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500 italic">
                  *This is a detailed view of the work. You can add video
                  players, case study links, or full galleries here.*
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}