"use client";

import { useEffect, useRef, useState } from "react";
import {
  DURATION,
  EASE,
  REVEAL_THRESHOLD,
  TRAVEL,
  prefersReducedMotion,
  staggerDelay,
} from "@/lib/motion";

/**
 * Section entrance reveal — docs/animation.md §4.
 *
 * opacity 0→1 plus a short upward translate, fired once when ~20% of the
 * element has entered the viewport. One reveal concept per section: wrap the
 * section, or wrap a small number of children with `index` set. Do not wrap
 * every element on the page — §4 is explicit that not everything should fade
 * in independently.
 *
 * Under `prefers-reduced-motion: reduce` the final state renders immediately
 * and no observer is created.
 */

export type RevealProps = {
  children: React.ReactNode;
  /** Stagger position. Delay caps at STAGGER_MAX_INDEX so long lists stay tight. */
  index?: number;
  /** Travel distance in px. Defaults to the desktop value, halved on small screens. */
  travel?: number;
  /** Element to render. Defaults to a div. */
  as?: "div" | "section" | "li" | "article" | "span";
  className?: string;
};

export function Reveal({
  children,
  index = 0,
  travel,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    // Reduced motion: show the final state and never observe.
    if (prefersReducedMotion()) {
      setInstant(true);
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers, some test runners): show it.
    if (typeof IntersectionObserver === "undefined") {
      setInstant(true);
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect(); // runs once — §4
          }
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const distance =
    travel ??
    (typeof window !== "undefined" && window.innerWidth < 640
      ? TRAVEL.mobile
      : TRAVEL.desktop);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${distance}px)`,
        transition: instant
          ? undefined
          : `opacity ${DURATION.reveal}ms ${EASE.enter} ${staggerDelay(index)}ms, ` +
            `transform ${DURATION.reveal}ms ${EASE.enter} ${staggerDelay(index)}ms`,
        willChange: shown ? undefined : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
