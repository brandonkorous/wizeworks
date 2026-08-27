"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Scroll-linked progress for the process section — docs/animation.md §15.
 *
 * Returns 0→1 as the element travels through the viewport, for the construction
 * line that draws via `stroke-dashoffset` and activates each stage as it
 * arrives. This is the ONLY scroll-linked motion on the site: §32 forbids
 * hijacking scroll, snapping the page, or slowing it artificially. Nothing here
 * calls preventDefault or touches scroll position — it only reads.
 *
 * Under `prefers-reduced-motion: reduce` it returns 1 immediately, so the line
 * is fully drawn and every stage reads as active. §33 requires disabling
 * scroll-linked interpolation, not hiding the content.
 *
 * The listener is passive and rAF-throttled, and it is only attached while the
 * section is actually on screen.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let listening = false;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;

      // 0 when the top edge reaches the bottom of the viewport,
      // 1 when the bottom edge reaches the top. Clamped both ends.
      const total = rect.height + vh;
      const travelled = vh - rect.top;
      const raw = total <= 0 ? 0 : travelled / total;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return; // already queued this frame
      frame = requestAnimationFrame(measure);
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      measure();
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    // Only listen while the section is near the viewport.
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) e.isIntersecting ? attach() : detach();
            },
            { rootMargin: "100px" },
          )
        : null;

    if (io) io.observe(el);
    else attach();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io?.disconnect();
      detach();
    };
  }, []);

  return { ref, progress };
}

/**
 * Maps progress onto a fixed number of stages.
 *
 * Returns how many stages are active — a stage lights up as the line reaches
 * it. `activeCount - 1` is the index of the newest active stage.
 */
export function stagesActive(progress: number, count: number): number {
  if (count <= 0) return 0;
  // The line spends the first and last ~15% entering and leaving the viewport,
  // so the stages are mapped onto the middle band rather than the full travel.
  const band = (progress - 0.15) / 0.7;
  const clamped = Math.min(1, Math.max(0, band));
  return Math.min(count, Math.floor(clamped * count) + (clamped > 0 ? 1 : 0));
}
