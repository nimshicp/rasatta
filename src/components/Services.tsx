"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DepthCarousel from "./DepthCarousel";

const services = [
  {
    id: "01",
    title: "SOCIAL MEDIA MARKETING",
    subtitle:
      "Your brand deserves more than just posts — it deserves strategy.",
    description:
      "We craft tailored social media ecosystems that build awareness, trust, and conversions.",
    deliverables: [
      "Platform strategy & management",
      "Content creation",
      "Paid advertising",
      "Analytics & performance optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "BRANDING",
    subtitle: "Where identity meets intention.",
    description:
      "We create visual languages that reflect who you are and where you’re going.",
    deliverables: [
      "Logo design",
      "Brand identity systems",
      "Color palettes, typography & style guides",
      "Brand strategy & positioning",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "VIDEO PRODUCTION",
    subtitle: "Stories people want to watch.",
    description:
      "Our production team turns ideas into cinematic visuals that drive emotion and engagement.",
    deliverables: [
      "Brand films",
      "Social media videos",
      "Product videos",
      "Event coverage",
    ],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "PERSONAL BRANDING",
    subtitle: "Your story deserves to be seen.",
    description:
      "We help founders, creators, and professionals shape a digital presence that aligns with their expertise, values, and long-term goals.",
    deliverables: [
      "Profile optimization",
      "Content strategy",
      "Thought-leadership content",
      "Long-form & short-form video identity",
    ],
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const carouselRef = useRef<any>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      /*
       * ============================================================
       * TEXT REVEAL
       * ============================================================
       */

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

      /*
       * ============================================================
       * MOBILE ONLY
       *
       * Sequence:
       *
       * CARD 01
       *    ↓
       * CARD 02
       *    ↓
       * CARD 03
       *    ↓
       * CARD 04
       *    ↓
       * NEXT SECTION
       *
       * The carousel is pinned while the page scroll controls
       * its progress.
       * ============================================================
       */

      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const carouselContainer = mobileContainerRef.current;

        if (!carouselContainer) return;

        const totalTransitions = services.length - 1;

        const mobileScrollTrigger = ScrollTrigger.create({
          trigger: carouselContainer,

          /*
           * The carousel becomes pinned when it reaches
           * the top of the viewport.
           */
          start: "top top",

          /*
           * 4 cards = 3 transitions.
           *
           * Each viewport of scrolling advances roughly
           * one card.
           */
          end: () =>
            `+=${window.innerHeight * totalTransitions}`,

          pin: true,

          /*
           * Keep space in the document for the pinned
           * carousel so the next section cannot jump upward.
           */
          pinSpacing: true,

          /*
           * Smoothly connect scroll position to carousel
           * position.
           */
          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,

          onUpdate: (self) => {
            /*
             * self.progress:
             *
             * 0     = CARD 01
             * 0.333 = CARD 02
             * 0.666 = CARD 03
             * 1     = CARD 04
             */
            if (
              carouselRef.current &&
              typeof carouselRef.current.setProgress === "function"
            ) {
              carouselRef.current.setProgress(self.progress);
            }
          },

          onRefresh: (self) => {
            if (
              carouselRef.current &&
              typeof carouselRef.current.setProgress === "function"
            ) {
              carouselRef.current.setProgress(self.progress);
            }
          },
        });

        return () => {
          mobileScrollTrigger.kill();
        };
      });

      /*
       * ============================================================
       * DESKTOP ONLY
       *
       * Desktop remains the original pinned/curtain behavior.
       * ============================================================
       */

      mm.add("(min-width: 768px)", () => {
        const desktopTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "+=100%",
          pin: true,
          pinSpacing: false,
        });

        return () => {
          desktopTrigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  /*
   * ============================================================
   * DESKTOP CARD CLICK
   * ============================================================
   */

  const handleCardClick = (index: number) => {
    setActiveCard((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black w-full text-black relative z-0"
      id="expertise"
    >
      {/* ==========================================================
          INTRO
          ========================================================== */}

      <div
        ref={introRef}
        className="
          pt-16
          pb-2
          md:pt-32
          md:pb-16
          flex
          flex-col
          justify-center
          px-6
          md:px-12
          lg:px-24
        "
      >
        <h2
          className="
            text-white
            text-6xl
            md:text-[8rem]
            font-bold
            tracking-tighter
            mb-4
            leading-[0.9]
          "
        >
          Solutions.
        </h2>

        <p
          className="
            text-xl
            md:text-3xl
            lg:text-4xl
            font-medium
            tracking-tight
            max-w-4xl
            leading-snug
            text-[#333333]
          "
        >
          {`AI-native. Systems-driven. Expert-led. The capabilities that turn ideas into impact.`
            .split(" ")
            .map((word, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) {
                    wordsRef.current[i] = el;
                  }
                }}
                className="
                  mr-[0.3em]
                  inline-block
                  transition-colors
                  duration-200
                "
              >
                {word}
              </span>
            ))}
        </p>
      </div>

      {/* ==========================================================
          MOBILE DEPTH CAROUSEL
          ========================================================== */}

      <div
        ref={mobileContainerRef}
        className="
          block
          md:hidden
          relative
          w-full
          h-screen
          overflow-hidden
          bg-black
        "
      >
        <div
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            overflow-hidden
          "
        >
          <DepthCarousel
            ref={carouselRef}
            items={services.map((service) => ({
              content: (
                <div
                  className="
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/10
                    bg-[#111111]
                    text-left
                  "
                >
                  {/* ==================================================
                      IMAGE
                      ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-cover
                      bg-center
                      pointer-events-none
                    "
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  />

                  {/* ==================================================
                      DARK OVERLAY
                      ================================================== */}

                  <div
                    className="
                      absolute
                      inset-0
                      pointer-events-none
                      bg-gradient-to-t
                      from-[#050505]
                      via-[#111111]/75
                      to-black/20
                    "
                  />

                  {/* ==================================================
                      CARD CONTENT
                      ================================================== */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      flex-col
                      h-full
                      p-8
                    "
                  >
                    {/* NUMBER */}

                    <span
                      className="
                        block
                        font-mono
                        text-2xl
                        font-bold
                        mb-6
                        tracking-tighter
                        text-white
                      "
                    >
                      {service.id}
                    </span>

                    {/* TITLE */}

                    <h3
                      className="
                        text-3xl
                        font-bold
                        tracking-tighter
                        uppercase
                        leading-[1.05]
                        text-white
                        mb-4
                      "
                    >
                      {service.title}
                    </h3>

                    {/* SUBTITLE */}

                    <h4
                      className="
                        text-base
                        font-medium
                        tracking-tight
                        leading-relaxed
                        text-gray-300
                        mb-6
                      "
                    >
                      {service.subtitle}
                    </h4>

                    {/* ==================================================
                        DELIVERABLES
                        ================================================== */}

                    <div
                      className="
                        mt-auto
                        pt-6
                        border-t
                        border-white/20
                      "
                    >
                      <ul className="flex flex-col gap-3">
                        {service.deliverables.map((item, i) => (
                          <li
                            key={i}
                            className="
                              text-[10px]
                              font-semibold
                              tracking-widest
                              uppercase
                              text-gray-300
                              flex
                              items-start
                              gap-3
                            "
                          >
                            <span
                              className="
                                mt-1
                                w-1.5
                                h-1.5
                                bg-white
                                rounded-full
                                flex-shrink-0
                              "
                            />

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            }))}
            cardWidth={350}
            cardHeight={580}
            radius={24}
            depth={160}
            spread={48}
            tilt={18}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.22}
            blur={0}
            duration={500}
            ease="power3.out"
            autoplay={false}

            /*
             * VERY IMPORTANT:
             *
             * The cards must stop at CARD 04.
             * They must NOT loop back to CARD 01.
             */
            loop={false}

            showControls={false}
            showIndicators={false}

            /*
             * Page scroll controls the carousel.
             *
             * If this is false, the carousel's own wheel
             * handler will compete with ScrollTrigger.
             */
            disableInteraction={true}
          />
        </div>
      </div>

      {/* ==========================================================
          DESKTOP GRID
          ========================================================== */}

      <div
        className="
          w-full
          px-6
          md:px-12
          lg:px-24
          pb-32
        "
      >
        <div
          className="
            hidden
            md:grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {services.map((service, index) => {
            const isActive = activeCard === index;

            return (
              <article
                key={service.id}
                className={`
                  group
                  relative
                  bg-[#111111]
                  border
                  border-white/10
                  rounded-[24px]
                  flex
                  flex-col
                  justify-start
                  transition-all
                  duration-500
                  cursor-pointer
                  overflow-hidden
                  min-h-[420px]
                  outline-none

                  ${
                    isActive
                      ? "bg-[#1a1a1a] scale-105 z-10 shadow-2xl"
                      : "bg-[#111111] scale-100"
                  }

                  md:hover:bg-[#1a1a1a]
                  md:hover:scale-105
                  md:hover:z-10
                  md:hover:shadow-2xl
                `}
                onClick={() => handleCardClick(index)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                {/* IMAGE */}

                <div
                  className={`
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    transition-all
                    duration-1000
                    pointer-events-none

                    ${
                      isActive
                        ? "opacity-100 scale-105"
                        : "opacity-50 scale-100"
                    }

                    md:group-hover:opacity-100
                    md:group-hover:scale-105
                  `}
                  style={{
                    backgroundImage: `url(${service.image})`,
                  }}
                />

                {/* OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#111111]
                    via-[#111111]/80
                    to-black/20
                    pointer-events-none
                  "
                />

                {/* CONTENT */}

                <div
                  className="
                    relative
                    p-8
                    md:p-10
                    flex
                    flex-col
                    h-full
                    z-10
                  "
                >
                  {/* NUMBER */}

                  <span
                    className={`
                      block
                      font-mono
                      text-xl
                      md:text-2xl
                      font-bold
                      mb-6
                      tracking-tighter
                      transition-colors
                      duration-500

                      ${
                        isActive
                          ? "text-white"
                          : "text-white/40"
                      }

                      md:group-hover:text-white
                    `}
                  >
                    {service.id}
                  </span>

                  {/* TITLE */}

                  <h3
                    className="
                      text-3xl
                      md:text-4xl
                      font-bold
                      tracking-tighter
                      uppercase
                      leading-[1.1]
                      text-white
                      mb-4
                    "
                  >
                    {service.title}
                  </h3>

                  {/* SUBTITLE */}

                  <h4
                    className={`
                      text-sm
                      md:text-base
                      font-medium
                      tracking-tight
                      leading-relaxed
                      mb-6
                      transition-colors
                      duration-500

                      ${
                        isActive
                          ? "text-white"
                          : "text-gray-300"
                      }

                      md:group-hover:text-white
                    `}
                  >
                    {service.subtitle}
                  </h4>

                  {/* DELIVERABLES */}

                  <div
                    className={`
                      mt-auto
                      pt-6
                      border-t
                      border-white/20
                      transform
                      transition-all
                      duration-500

                      ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }

                      md:group-hover:opacity-100
                      md:group-hover:translate-y-0
                    `}
                  >
                    <ul className="flex flex-col gap-3">
                      {service.deliverables.map(
                        (item, i) => (
                          <li
                            key={i}
                            className="
                              text-[10px]
                              md:text-xs
                              font-semibold
                              tracking-widest
                              uppercase
                              text-gray-300
                              flex
                              items-center
                              gap-3
                            "
                          >
                            <span
                              className="
                                w-1.5
                                h-1.5
                                bg-white
                                rounded-full
                                flex-shrink-0
                              "
                            />

                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}