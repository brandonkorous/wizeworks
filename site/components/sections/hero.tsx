import { TrackLink } from "@/components/analytics/track-link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { MakersMark } from "@/components/mark/makers-mark";

/**
 * Section 02 — Hero. docs/landing.md §4.
 *
 * The most important animation moment on the site, and it happens once
 * (animation.md §6–7). The headline reveals line by line; the mark's three
 * pieces settle into their canonical positions. Both are pure CSS with a
 * reduced-motion guard, so the hero ships no JavaScript.
 *
 * Lines animate as whole lines — §6.1 forbids per-letter animation and typing
 * effects.
 *
 * NO EYEBROW. docs/landing.md §4 specifies one ("A product studio & parent
 * company"), but eyebrows are banned. The information it carried was real and
 * the hero still has to answer "who are you?", so it is now the opening
 * sentence of the supporting copy — a statement a person reads, rather than a
 * label stacked above the headline.
 *
 * Type comes from the named scale: `display-1` for the headline, `lead` for the
 * supporting copy. No clamp, no arbitrary sizes.
 */

/**
 * How the final word of the headline is emphasised.
 *
 * docs/landing.md §4 suggests warm taupe. Measured, `#A69D90` on the paper
 * ground is **2.42:1** — it fails WCAG AA for normal text (4.5:1) AND for large
 * text (3:1), which docs/design.md §24 requires. The specs contradict each
 * other here; see docs/plan.md §10.1.
 *
 * Resolution: the emphasis is carried by the mark's own two-tone, and the word
 * stays in charcoal at 14.88:1. Taupe remains correct as a *material* — the
 * third mark unit, dividers, borders, and text inside a dark island (6.82:1 on
 * the near-black ground).
 *
 * To reverse this decision, change one word: "primary" → "accent". Nothing else
 * needs to move.
 */
const EMPHASIS: "primary" | "accent" = "primary";

const HEADLINE = ["We make", "things that", "work."] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-base-300/60">
      {/* Drafting lines — atmosphere, not an animation feature (animation.md §8).
          Static, decorative, and hidden from assistive technology. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-base-300) 1px, transparent 1px)," +
            "linear-gradient(to bottom, var(--color-base-300) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:py-36">
        <div className="grid gap-10">
          <h1 className="display-1">
            {HEADLINE.map((line, i) => (
              <span key={line} className={`block hero-line hero-line-${i + 1}`}>
                {i === HEADLINE.length - 1 && EMPHASIS !== "primary" ? (
                  <span className="text-accent">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="hero-line hero-line-4 lead max-w-[46ch] text-base-content/80">
            WizeWorks is a product studio and parent company. We build
            thoughtful products, systems, and brands that solve real problems
            and create lasting impact.
          </p>

          <div className="hero-line hero-line-5 flex flex-wrap items-center gap-4">
            <TrackLink
              event="hero_explore_products"
              href="#portfolio"
              className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
            >
              Explore our products
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </TrackLink>
            {/* Secondary stays text-weight — §9 warns against turning it into a
                second primary button. */}
            <TrackLink
              event="hero_view_work"
              href="/work"
              className="group inline-flex items-center gap-2 py-2 font-medium underline-offset-4 hover:underline"
            >
              View our work
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </TrackLink>
          </div>
        </div>

        {/* The mark as a physical object, given room to breathe (§4). */}
        <div className="flex justify-center md:justify-end">
          <MakersMark
            size="min(78vw, 420px)"
            assembling
            title="The WizeWorks maker's mark"
          />
        </div>
      </div>
    </section>
  );
}
