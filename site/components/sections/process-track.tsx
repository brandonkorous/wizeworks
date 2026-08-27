"use client";

import {
  useScrollProgress,
  stagesActive,
} from "@/components/motion/scroll-progress";

/**
 * The construction line — docs/animation.md §15.
 *
 * Desktop: a horizontal line that draws as the section is traversed,
 * activating each stage as it arrives. (It is a scaled element, not
 * `stroke-dashoffset` — see the note on the line itself.)
 * Mobile: the same idea rotated to a vertical rail. §15 forbids forcing
 * horizontal scrolling for this on small screens.
 *
 * Inactive stages stay visible but muted — they are never hidden, so the
 * content reads completely with motion disabled. Under reduced motion the hook
 * reports full progress immediately and every stage is active.
 *
 * Activation is signalled by opacity, weight and a filled marker together, so
 * it is never communicated by colour alone (design.md §24).
 */

type Stage = { n: string; title: string; body: string };

export function ProcessTrack({ stages }: { stages: readonly Stage[] }) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const active = stagesActive(progress, stages.length);
  const drawn = Math.min(1, Math.max(0, (progress - 0.15) / 0.7));

  return (
    <div ref={ref} className="relative">
      {/* ---- desktop: horizontal line ----
           docs/animation.md §15 suggests SVG `stroke-dashoffset`, and the first
           attempt used it. It does not survive this context: with
           `vectorEffect="non-scaling-stroke"`, the browser stops normalising the
           dash array against `pathLength`, so `strokeDasharray={1}` computes to
           a literal `1px` and the line renders as a full-width 1px dotted rule
           that never shows progress. Verified in the DOM — computed
           `stroke-dasharray: 1px`.

           A scaled element is simpler, has no such failure mode, and animates on
           `transform`, which is what §35 asks for anyway. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[7px] hidden h-px md:block"
      >
        <div className="absolute inset-0 bg-base-300" />
        <div
          className="absolute inset-0 origin-left bg-primary"
          style={{ transform: `scaleX(${drawn})` }}
        />
      </div>

      {/* ---- mobile: vertical rail ---- */}
      <div className="pointer-events-none absolute bottom-0 left-[7px] top-2 w-px md:hidden">
        <div className="h-full w-full bg-base-300" />
        <div
          className="absolute inset-x-0 top-0 bg-primary"
          style={{ height: `${drawn * 100}%` }}
        />
      </div>

      <ol className="grid gap-12 pl-8 md:grid-cols-4 md:gap-10 md:pl-0">
        {stages.map((s, i) => {
          const on = i < active;
          return (
            <li key={s.n} className="relative grid content-start gap-3.5">
              {/* Marker. An inactive node takes the section's own ground rather
                  than `transparent`, so it punches a clean hole in the line
                  instead of letting the rule run straight through its middle. */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1 size-[15px] rounded-full border transition-colors duration-300 md:static md:mb-1"
                style={{
                  borderColor: on
                    ? "var(--color-primary)"
                    : "var(--color-base-300)",
                  background: on
                    ? "var(--color-primary)"
                    : "var(--color-base-100)",
                }}
              />

              {/* The stage numbers stay: these really are an ordered sequence,
                  so the numbering encodes something true. At text-sm, the
                  smallest step the scale allows. */}
              <span
                className="text-sm tabular-nums transition-opacity duration-300"
                style={{ opacity: on ? 0.7 : 0.35 }}
              >
                {s.n}
              </span>

              <h3
                className="text-xl font-semibold tracking-tight transition-all duration-300"
                style={{
                  opacity: on ? 1 : 0.45,
                  transform: on ? "none" : "translateY(6px)",
                }}
              >
                {s.title}
              </h3>

              <p
                className="max-w-[42ch] transition-opacity duration-300"
                style={{ opacity: on ? 0.8 : 0.4 }}
              >
                {s.body}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
