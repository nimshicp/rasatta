"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";

import gsap from "gsap";

import "./DepthCarousel.css";

export interface DepthCarouselItem {
  image?: string;
  alt?: string;
  content?: ReactNode;
}

export interface DepthCarouselProps {
  items?: (DepthCarouselItem | string)[];

  cardWidth?: number;
  cardHeight?: number;
  radius?: number;

  tint?: string;

  depth?: number;
  spread?: number;

  tilt?: number;
  tiltDirection?: "left" | "right";

  perspective?: number;

  visibleCards?: number;
  falloff?: number;
  blur?: number;

  duration?: number;
  ease?: string;

  autoplay?: boolean;
  autoplayDelay?: number;

  loop?: boolean;

  showControls?: boolean;
  showIndicators?: boolean;

  disableInteraction?: boolean;

  onChange?: (
    index: number,
    item: DepthCarouselItem | string
  ) => void;

  className?: string;
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  {
    image: "https://picsum.photos/seed/depth1/800/1000",
    alt: "Slide 1",
  },
  {
    image: "https://picsum.photos/seed/depth2/800/1000",
    alt: "Slide 2",
  },
  {
    image: "https://picsum.photos/seed/depth3/800/1000",
    alt: "Slide 3",
  },
  {
    image: "https://picsum.photos/seed/depth4/800/1000",
    alt: "Slide 4",
  },
  {
    image: "https://picsum.photos/seed/depth5/800/1000",
    alt: "Slide 5",
  },
  {
    image: "https://picsum.photos/seed/depth6/800/1000",
    alt: "Slide 6",
  },
];

const clamp = (
  v: number,
  min: number,
  max: number
) => Math.min(Math.max(v, min), max);

const normalizeItem = (
  item: DepthCarouselItem | string
): DepthCarouselItem => {
  if (typeof item === "string") {
    return {
      image: item,
      alt: "",
    };
  }

  return item;
};

const DepthCarousel = forwardRef<
  any,
  DepthCarouselProps
>(
  (
    {
      items = DEFAULT_ITEMS,

      cardWidth = 300,
      cardHeight = 380,

      radius = 18,

      tint = "#05060a",

      depth = 220,
      spread = 90,

      tilt = 22,
      tiltDirection = "right",

      perspective = 1400,

      visibleCards = 4,

      falloff = 0.2,
      blur = 6,

      duration = 700,
      ease = "power3.out",

      autoplay = false,
      autoplayDelay = 3200,

      loop = false,

      showControls = true,
      showIndicators = true,

      disableInteraction = false,

      onChange,

      className = "",
    },
    ref
  ) => {
    const data = useMemo(
      () =>
        (Array.isArray(items) ? items : []).map(
          normalizeItem
        ),
      [items]
    );

    const count = data.length;

    const rootRef =
      useRef<HTMLDivElement>(null);

    const stageRef =
      useRef<HTMLDivElement>(null);

    const cardRefs =
      useRef<(HTMLDivElement | null)[]>([]);

    const overlayRefs =
      useRef<(HTMLSpanElement | null)[]>([]);

    /*
     * Current fractional carousel position.
     *
     * Examples:
     *
     * 0   = CARD 01
     * 1   = CARD 02
     * 2   = CARD 03
     * 3   = CARD 04
     */
    const posRef = useRef(0);

    const focusRef = useRef(0);

    const tweenRef =
      useRef<gsap.core.Tween | null>(null);

    const scaleRef = useRef(1);

    const cfgRef = useRef<any>({});

    const onChangeRef =
      useRef(onChange);

    const dragRef =
      useRef<any>(null);

    const wheelTimerRef =
      useRef<ReturnType<typeof setTimeout> | null>(
        null
      );

    const autoTimerRef =
      useRef<ReturnType<typeof setInterval> | null>(
        null
      );

    const reducedRef =
      useRef(false);

    const [active, setActive] =
      useState(0);

    /*
     * ============================================================
     * CONFIG
     * ============================================================
     */

    onChangeRef.current = onChange;

    cfgRef.current = {
      count,

      depth,
      spread,

      tilt,
      tiltDirection,

      visibleCards,

      falloff,
      blur,

      duration,
      ease,

      loop,

      cardWidth,

      autoplayDelay,
    };

    /*
     * ============================================================
     * NOTIFY
     * ============================================================
     */

    const notify = useCallback(
      (idx: number) => {
        const safeIndex = clamp(
          idx,
          0,
          Math.max(0, count - 1)
        );

        setActive(safeIndex);

        if (data[safeIndex]) {
          onChangeRef.current?.(
            safeIndex,
            data[safeIndex]
          );
        }
      },
      [data, count]
    );

    /*
     * ============================================================
     * LAYOUT
     * ============================================================
     */

    const layout = useCallback(
      (pos: number) => {
        const cfg = cfgRef.current;

        const n = cfg.count;

        if (!n) return;

        const dir =
          cfg.tiltDirection === "left"
            ? -1
            : 1;

        const sc = scaleRef.current;

        /*
         * IMPORTANT:
         *
         * When loop=false:
         *
         * CARD 01 cannot become CARD 04
         * CARD 04 cannot become CARD 01
         *
         * The deck has a real beginning and end.
         */
        const safePos = cfg.loop
          ? pos
          : clamp(pos, 0, n - 1);

        for (let i = 0; i < n; i++) {
          const el = cardRefs.current[i];

          if (!el) continue;

          let d = i - safePos;

          /*
           * Only use circular positioning when
           * looping is explicitly enabled.
           */
          if (
            cfg.loop &&
            n > 1
          ) {
            d =
              ((d % n) + n) % n;

            if (d > n / 2) {
              d -= n;
            }
          }

          /*
           * ======================================================
           * VERTICAL STACK LOGIC
           * ======================================================
           */

          const stackOffset = 40; // Increased to show more of the bottom edges
          const exitDistance = window.innerHeight * 0.9;

          let ty = 0;
          let scaleMultiplier = 1;
          let opacity = 1;
          let brightness = 1;

          if (d > 0) {
            // Cards behind
            ty = d * stackOffset;
            scaleMultiplier = 1 - 0.02 * d; // e.g. 0.98, 0.96...
            opacity = Math.max(0, 1 - 0.1 * d); // e.g. 0.9, 0.8...
            brightness = Math.max(0.18, 1 - d * cfg.falloff); 
          } else if (d < 0) {
            if (d <= -1) {
              // Cards that already left
              ty = -exitDistance;
              opacity = 0;
            } else {
              // Card currently leaving (-1 < d < 0)
              ty = d * exitDistance;
              opacity = 1 + d * 0.5; // Fades out slightly as it moves up
            }
          } else {
            // Current card (d === 0)
            ty = 0;
          }

          const shown = Math.abs(d) <= cfg.visibleCards + 0.5;
          if (!shown) opacity = 0;

          // Z-index: lower d = higher z-index (outgoing card stays above incoming)
          const zi = Math.round(2000 - d * 100);

          /*
           * ======================================================
           * TRANSFORM
           * ======================================================
           */

          el.style.transform = `
            translate(-50%, -50%)
            scale(${sc * scaleMultiplier})
            translateY(${ty.toFixed(2)}px)
          `;

          el.style.opacity = opacity.toFixed(3);

          el.style.filter = `
            brightness(${brightness.toFixed(3)})
          `;

          el.style.zIndex = String(zi);

          el.style.pointerEvents =
            shown && opacity > 0.05 ? "auto" : "none";

          /*
           * ======================================================
           * BACK CARD TINT
           * ======================================================
           */

          const overlay = overlayRefs.current[i];

          if (overlay) {
            overlay.style.opacity = clamp(
              (d > 0 ? d : 0) * cfg.falloff * 1.25,
              0,
              0.86
            ).toFixed(3);
          }
        }
      },
      []
    );

    /*
     * ============================================================
     * EXTERNAL SCROLL CONTROL
     *
     * This is what Services.tsx calls.
     *
     * progress:
     *
     * 0      → CARD 01
     * 0.333  → CARD 02
     * 0.666  → CARD 03
     * 1      → CARD 04
     * ============================================================
     */

    useImperativeHandle(
      ref,
      () => ({
        setProgress: (p: number) => {
          if (count < 2) return;

          /*
           * Clamp page scroll.
           *
           * This prevents the carousel from
           * wrapping or overshooting.
           */
          const progress = clamp(
            p,
            0,
            1
          );

          /*
           * Map 0 → 1 onto
           * 0 → count - 1.
           */
          const target =
            progress *
            (count - 1);

          /*
           * Never exceed the final card.
           */
          posRef.current =
            clamp(
              target,
              0,
              count - 1
            );

          layout(
            posRef.current
          );

          /*
           * Update active indicator.
           */
          const idx = clamp(
            Math.round(
              posRef.current
            ),
            0,
            count - 1
          );

          if (
            idx !==
            focusRef.current
          ) {
            focusRef.current =
              idx;

            notify(idx);
          }
        },
      }),
      [count, layout, notify]
    );

    /*
     * ============================================================
     * TWEEN
     * ============================================================
     */

    const tweenTo =
      useCallback(
        (
          target: number,
          animate: boolean
        ) => {
          tweenRef.current?.kill();

          const cfg =
            cfgRef.current;

          const proxy = {
            p: posRef.current,
          };

          const safeTarget =
            cfg.loop
              ? target
              : clamp(
                  target,
                  0,
                  cfg.count - 1
                );

          const dur =
            animate &&
            !reducedRef.current
              ? cfg.duration / 1000
              : 0;

          tweenRef.current =
            gsap.to(proxy, {
              p: safeTarget,

              duration: dur,

              ease: cfg.ease,

              onUpdate: () => {
                posRef.current =
                  proxy.p;

                layout(
                  proxy.p
                );
              },

              onComplete: () => {
                const n =
                  cfg.count;

                if (n > 0) {
                  posRef.current =
                    cfg.loop
                      ? ((posRef.current %
                          n) +
                          n) %
                        n
                      : clamp(
                          posRef.current,
                          0,
                          n - 1
                        );
                }

                layout(
                  posRef.current
                );
              },
            });
        },
        [layout]
      );

    /*
     * ============================================================
     * SET FOCUS
     * ============================================================
     */

    const setFocus =
      useCallback(
        (
          rawIndex: number,
          animate = true
        ) => {
          const cfg =
            cfgRef.current;

          const n =
            cfg.count;

          if (!n) return;

          const idx =
            cfg.loop
              ? ((rawIndex % n) +
                  n) %
                n
              : clamp(
                  rawIndex,
                  0,
                  n - 1
                );

          let delta =
            idx -
            posRef.current;

          if (
            cfg.loop &&
            n > 1
          ) {
            delta =
              ((delta % n) +
                n) %
              n;

            if (
              delta >
              n / 2
            ) {
              delta -= n;
            }
          }

          tweenTo(
            posRef.current +
              delta,
            animate
          );

          if (
            idx !==
            focusRef.current
          ) {
            focusRef.current =
              idx;

            notify(idx);
          }
        },
        [tweenTo, notify]
      );

    /*
     * ============================================================
     * NAVIGATION
     * ============================================================
     */

    const navigateBy =
      useCallback(
        (step: number) => {
          setFocus(
            focusRef.current +
              step,
            true
          );
        },
        [setFocus]
      );

    /*
     * ============================================================
     * RESIZE
     * ============================================================
     */

    useEffect(() => {
      const root =
        rootRef.current;

      if (!root) return;

      const resizeObserver =
        new ResizeObserver(
          (entries) => {
            const width =
              entries[0]
                .contentRect
                .width;

            const cfg =
              cfgRef.current;

            const needed =
              cfg.cardWidth +
              Math.abs(
                cfg.spread
              ) +
              40;

            scaleRef.current =
              clamp(
                width / needed,
                0.85,
                1.2
              );

            layout(
              posRef.current
            );
          }
        );

      resizeObserver.observe(
        root
      );

      return () => {
        resizeObserver.disconnect();
      };
    }, [layout]);

    /*
     * ============================================================
     * WHEEL
     *
     * Only used when interaction is enabled.
     *
     * In Services.tsx we use:
     *
     * disableInteraction={true}
     *
     * because the PAGE scroll should control the cards.
     * ============================================================
     */

    useEffect(() => {
      if (
        disableInteraction
      ) {
        return;
      }

      const element =
        rootRef.current;

      if (!element) return;

      const onWheel = (
        event: WheelEvent
      ) => {
        const cfg =
          cfgRef.current;

        if (
          cfg.count < 2
        ) {
          return;
        }

        event.preventDefault();

        tweenRef.current?.kill();

        const raw =
          Math.abs(
            event.deltaX
          ) >
          Math.abs(
            event.deltaY
          )
            ? event.deltaX
            : event.deltaY;

        const delta =
          event.deltaMode ===
          1
            ? raw * 24
            : raw;

        const step = clamp(
          delta /
            (cfg.cardWidth *
              0.9),
          -0.6,
          0.6
        );

        posRef.current +=
          step;

        if (!cfg.loop) {
          posRef.current =
            clamp(
              posRef.current,
              0,
              cfg.count - 1
            );
        }

        layout(
          posRef.current
        );

        if (
          wheelTimerRef.current
        ) {
          clearTimeout(
            wheelTimerRef.current
          );
        }

        wheelTimerRef.current =
          setTimeout(() => {
            setFocus(
              Math.round(
                posRef.current
              ),
              true
            );
          }, 130);
      };

      element.addEventListener(
        "wheel",
        onWheel,
        {
          passive: false,
        }
      );

      return () => {
        element.removeEventListener(
          "wheel",
          onWheel
        );

        if (
          wheelTimerRef.current
        ) {
          clearTimeout(
            wheelTimerRef.current
          );
        }
      };
    }, [
      layout,
      setFocus,
      disableInteraction,
    ]);

    /*
     * ============================================================
     * DRAG
     * ============================================================
     */

    const onPointerDown =
      useCallback(
        (
          event: React.PointerEvent
        ) => {
          const cfg =
            cfgRef.current;

          if (
            cfg.count < 2
          ) {
            return;
          }

          tweenRef.current?.kill();

          dragRef.current = {
            x: event.clientX,

            startPos:
              posRef.current,

            lastX:
              event.clientX,

            lastT:
              performance.now(),

            v: 0,

            moved: false,

            id:
              event.pointerId,
          };
        },
        []
      );

    const onPointerMove =
      useCallback(
        (
          event: React.PointerEvent
        ) => {
          const drag =
            dragRef.current;

          if (!drag) return;

          const cfg =
            cfgRef.current;

          const stepPx =
            Math.max(
              cfg.cardWidth *
                0.55 *
                scaleRef.current,
              40
            );

          const dx =
            event.clientX -
            drag.x;

          if (
            !drag.moved &&
            Math.abs(dx) > 4
          ) {
            drag.moved = true;

            rootRef.current?.setPointerCapture(
              drag.id
            );
          }

          if (!drag.moved) {
            return;
          }

          const now =
            performance.now();

          const dt =
            Math.max(
              now -
                drag.lastT,
              1
            );

          drag.v =
            (event.clientX -
              drag.lastX) /
            dt;

          drag.lastX =
            event.clientX;

          drag.lastT = now;

          posRef.current =
            drag.startPos -
            dx / stepPx;

          if (!cfg.loop) {
            posRef.current =
              clamp(
                posRef.current,
                0,
                cfg.count - 1
              );
          }

          layout(
            posRef.current
          );
        },
        [layout]
      );

    const onPointerEnd =
      useCallback(() => {
        const drag =
          dragRef.current;

        if (!drag) return;

        dragRef.current =
          null;

        if (!drag.moved) {
          return;
        }

        const cfg =
          cfgRef.current;

        const stepPx =
          Math.max(
            cfg.cardWidth *
              0.55 *
              scaleRef.current,
            40
          );

        const projected =
          posRef.current -
          (drag.v * 180) /
            stepPx;

        setFocus(
          Math.round(
            projected
          ),
          true
        );
      }, [setFocus]);

    /*
     * ============================================================
     * KEYBOARD
     * ============================================================
     */

    const onKeyDown =
      useCallback(
        (
          event: React.KeyboardEvent
        ) => {
          if (
            event.key ===
            "ArrowLeft"
          ) {
            event.preventDefault();

            navigateBy(-1);
          } else if (
            event.key ===
            "ArrowRight"
          ) {
            event.preventDefault();

            navigateBy(1);
          }
        },
        [navigateBy]
      );

    /*
     * ============================================================
     * CARD CLICK
     * ============================================================
     */

    const onCardClick =
      useCallback(
        (index: number) => {
          if (
            dragRef.current
              ?.moved
          ) {
            return;
          }

          setFocus(
            index,
            true
          );
        },
        [setFocus]
      );

    /*
     * ============================================================
     * AUTOPLAY
     * ============================================================
     */

    useEffect(() => {
      reducedRef.current =
        typeof window !==
          "undefined" &&
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      if (
        !autoplay ||
        reducedRef.current ||
        count < 2
      ) {
        return;
      }

      const root =
        rootRef.current;

      let hovered = false;
      let focused = false;

      const stop = () => {
        if (
          autoTimerRef.current
        ) {
          clearInterval(
            autoTimerRef.current
          );
        }

        autoTimerRef.current =
          null;
      };

      const start = () => {
        stop();

        autoTimerRef.current =
          setInterval(() => {
            if (
              !hovered &&
              !focused
            ) {
              navigateBy(1);
            }
          }, Math.max(
            cfgRef.current
              .autoplayDelay,
            600
          ));
      };

      const onEnter = () => {
        hovered = true;
      };

      const onLeave = () => {
        hovered = false;
      };

      const onFocusIn = () => {
        focused = true;
      };

      const onFocusOut = () => {
        focused = false;
      };

      root?.addEventListener(
        "mouseenter",
        onEnter
      );

      root?.addEventListener(
        "mouseleave",
        onLeave
      );

      root?.addEventListener(
        "focusin",
        onFocusIn
      );

      root?.addEventListener(
        "focusout",
        onFocusOut
      );

      start();

      return () => {
        stop();

        root?.removeEventListener(
          "mouseenter",
          onEnter
        );

        root?.removeEventListener(
          "mouseleave",
          onLeave
        );

        root?.removeEventListener(
          "focusin",
          onFocusIn
        );

        root?.removeEventListener(
          "focusout",
          onFocusOut
        );
      };
    }, [
      autoplay,
      autoplayDelay,
      count,
      navigateBy,
    ]);

    /*
     * ============================================================
     * INITIAL LAYOUT
     * ============================================================
     */

    useEffect(() => {
      layout(
        posRef.current
      );
    }, [
      layout,
      depth,
      spread,
      tilt,
      tiltDirection,
      visibleCards,
      falloff,
      blur,
      cardWidth,
      cardHeight,
      radius,
      count,
    ]);

    /*
     * ============================================================
     * CLEANUP
     * ============================================================
     */

    useEffect(() => {
      return () => {
        tweenRef.current?.kill();

        if (
          wheelTimerRef.current
        ) {
          clearTimeout(
            wheelTimerRef.current
          );
        }

        if (
          autoTimerRef.current
        ) {
          clearInterval(
            autoTimerRef.current
          );
        }
      };
    }, []);

    /*
     * ============================================================
     * RENDER
     * ============================================================
     */

    return (
      <div
        ref={rootRef}
        className={`
          depth-carousel
          ${className}
        `.trim()}
        style={
          {
            "--dc-perspective": `${perspective}px`,
          } as React.CSSProperties
        }
        role="group"
        aria-roledescription="carousel"
        aria-label="Service carousel"
        tabIndex={0}
        onPointerDown={
          disableInteraction
            ? undefined
            : onPointerDown
        }
        onPointerMove={
          disableInteraction
            ? undefined
            : onPointerMove
        }
        onPointerUp={
          disableInteraction
            ? undefined
            : onPointerEnd
        }
        onPointerCancel={
          disableInteraction
            ? undefined
            : onPointerEnd
        }
        onKeyDown={
          disableInteraction
            ? undefined
            : onKeyDown
        }
      >
        <div
          className="depth-carousel__stage"
          ref={stageRef}
        >
          {data.map(
            (item, i) => (
              <div
                key={i}
                className="depth-carousel__card"
                ref={(element) => {
                  cardRefs.current[i] =
                    element;
                }}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: radius,
                }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={
                  active !== i
                }
                onClick={() =>
                  onCardClick(i)
                }
              >
                {item.content ? (
                  item.content
                ) : (
                  <img
                    className="depth-carousel__img"
                    src={item.image}
                    alt={
                      item.alt ||
                      ""
                    }
                    draggable={false}
                  />
                )}

                <span
                  className="depth-carousel__tint"
                  ref={(element) => {
                    overlayRefs.current[i] =
                      element;
                  }}
                  style={{
                    background:
                      tint,
                  }}
                />
              </div>
            )
          )}
        </div>

        {/* ========================================================
            CONTROLS
            ======================================================== */}

        {showControls &&
          count > 1 && (
            <>
              <button
                type="button"
                className="
                  depth-carousel__arrow
                  depth-carousel__arrow--prev
                "
                aria-label="Previous slide"
                onClick={() =>
                  navigateBy(-1)
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M15 5l-7 7 7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="
                  depth-carousel__arrow
                  depth-carousel__arrow--next
                "
                aria-label="Next slide"
                onClick={() =>
                  navigateBy(1)
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}

        {/* ========================================================
            INDICATORS
            ======================================================== */}

        {showIndicators &&
          count > 1 && (
            <div
              className="depth-carousel__dots"
              role="tablist"
              aria-label="Slides"
            >
              {data.map(
                (_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={
                      active === i
                    }
                    aria-label={`Go to slide ${
                      i + 1
                    }`}
                    className={`
                      depth-carousel__dot
                      ${
                        active === i
                          ? "is-active"
                          : ""
                      }
                    `}
                    onClick={() =>
                      setFocus(
                        i,
                        true
                      )
                    }
                  />
                )
              )}
            </div>
          )}
      </div>
    );
  }
);

DepthCarousel.displayName =
  "DepthCarousel";

export default DepthCarousel;