"use client";

import { useEffect, useRef, useState } from "react";
import { REVEAL_THRESHOLD, prefersReducedMotion } from "@/lib/motion";

/**
 * Metric count-up — docs/animation.md §18.
 *
 * Rules that are not negotiable, straight from the spec:
 *   - runs once
 *   - the final value is in the accessible tree IMMEDIATELY; only the visual
 *     text animates, so a screen reader never reads a partial number
 *   - no rolling-odometer effect
 *   - 700–1100ms, secondary to the story
 *
 * And from §17 / docs/landing.md §9: only ever use this on a real, truthful
 * number. Do not animate a fabricated or vanity metric.
 */

export type CountUpProps = {
  /** The real final value. */
  value: number;
  /** e.g. "%", "×", " businesses". Rendered inside the accessible label too. */
  suffix?: string;
  prefix?: string;
  /** Decimal places. Defaults to 0. */
  decimals?: number;
  /** 700–1100ms per §18. */
  durationMs?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  durationMs = 900,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);

  const format = (n: number) =>
    `${prefix}${n.toFixed(decimals)}${suffix}`;
  const finalText = format(value);

  useEffect(() => {
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let start = 0;

    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / durationMs);
      // Decelerating ease — settles rather than snapping. No overshoot: §3
      // forbids anything that visibly bounces.
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setAnimating(false);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.disconnect();
          setAnimating(true);
          setDisplay(0);
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: REVEAL_THRESHOLD },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, durationMs, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {/* The real value, always correct, always available to assistive tech. */}
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        {animating ? format(display) : finalText}
      </span>
    </span>
  );
}
