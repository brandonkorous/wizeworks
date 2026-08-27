import { MakersMark } from "@/components/mark/makers-mark";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 05 — What WizeWorks believes. docs/landing.md §7.
 *
 * A dark band that creates a controlled pause in the page (animation.md §14).
 * Dark is a THEME ISLAND — one attribute, no `dark:` variants, no duplicated
 * styles. Inside it, taupe reaches 6.82:1 against the near-black ground, so the
 * emphasis the hero could not safely use lives here instead.
 *
 * The four principles were numbered 01–04 in small mono. That numbering has
 * been removed: these are four parallel statements, not a sequence, so the
 * numbers encoded nothing true about the content and existed only as decoration.
 * The process section keeps its numbers because those stages really are ordered.
 */

const PRINCIPLES = [
  {
    title: "Real problems first",
    body: "We start with something worth solving.",
  },
  {
    title: "Designed around people",
    body: "Technology should adapt to the people using it.",
  },
  {
    title: "Built to last",
    body: "We build systems that can grow rather than disposable experiments.",
  },
  {
    title: "Details matter",
    body: "Good products usually feel obvious because somebody cared about everything underneath them.",
  },
] as const;

export function Philosophy() {
  return (
    <section
      data-theme="wizeworks-dark"
      aria-labelledby="philosophy-heading"
      className="border-b border-base-300/40"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-32">
        <Reveal>
          <div className="grid gap-7">
            <MakersMark size={40} />
            <h2 id="philosophy-heading" className="display-2 max-w-[18ch]">
              Different products.{" "}
              <span className="text-accent">Same obsession.</span>
            </h2>
          </div>
        </Reveal>

        <dl className="grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} index={i}>
              <div className="grid gap-3 border-t border-base-300/60 pt-6">
                <dt className="text-xl font-semibold tracking-tight">
                  {p.title}
                </dt>
                <dd className="max-w-[46ch] text-base-content/75">{p.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
