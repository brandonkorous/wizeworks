import { Reveal } from "@/components/motion/reveal";

const HERO_WIDTHS = [1280, 1920, 2400];

function heroSet(ext: string) {
  return HERO_WIDTHS.map((w) => `/images/machine-shop-${w}.${ext} ${w}w`).join(", ");
}

/**
 * Section 02 — Immediate proof. docs/landing.md §5.
 *
 * WHAT THIS REPLACED, AND WHY. This slot used to be a "Made by WizeWorks"
 * strip: the six product names as plain cards. §5 asked for "recognizable
 * brand marks", but there are no per-product logo assets, so it degraded into
 * text names — which is exactly what the portfolio does three inches further
 * down, with real screenshots, categories and product colour. Same six items,
 * weaker rendering, immediately before the better one. A duplicate is worse
 * than an absence, so the slot now does a job the portfolio CANNOT do for
 * itself: it states what kind of company made those things.
 *
 * The hero promises; this establishes the stakes; the portfolio delivers the
 * evidence. §5's ordering constraint — proof before philosophy — still holds.
 *
 * THE CLAIM IS DELIBERATELY MODEST. "Built, shipped, and still run" is true of
 * all six and checkable. It does NOT say anyone depends on it, how many, or
 * how well: AGCONN is early, and landing.md §9/§25 forbid inventing exactly
 * that kind of number. It also explains, without apologising, why this site
 * has no Selected Work or testimonials section.
 *
 * THE PHOTOGRAPH is public domain — Alfred T. Palmer, 1942, for the U.S.
 * Office of War Information, via the Library of Congress. Chosen over the
 * alternatives because its palette already IS the brand's (near-black ground,
 * charcoal machinery, warm cream), and because it shows a person doing real
 * work on a real machine — the opposite of the "generic boardroom stock" that
 * design.md §22 bans as a genre. PD needs no attribution; it is credited below
 * anyway, because a page that argues for honest proof should say where its
 * picture came from. The file was inspected at full resolution before use —
 * metadata lies, and a "CC0" candidate arrived watermarked once already.
 *
 * `priority`, not lazy. The hero above carries no image at all — it is type
 * and the mark — and it is `py-28 md:py-36` rather than full height, so this
 * band's top edge sits near the fold and this photograph is the homepage's
 * likely LCP element. Nothing else on the page claims priority, so there is
 * nothing to compete with. Left lazy, a full-bleed ground under fixed text
 * arrives visibly late, which is the effect animation.md §10 rules out.
 *
 * `alt=""` is correct here. The photograph is atmosphere behind a statement
 * that carries the meaning itself; the visible credit line names it for
 * everyone. A long alt would narrate decoration to screen readers and say
 * nothing the heading has not already said.
 */
export function InProduction() {
  return (
    <section
      data-theme="wizeworks-dark"
      aria-labelledby="production-heading"
      className="relative isolate border-b border-base-300/40"
    >
      <picture>
        <source type="image/avif" srcSet={heroSet("avif")} sizes="100vw" />
        <source type="image/webp" srcSet={heroSet("webp")} sizes="100vw" />
        {/* Pre-sized files (scripts/make-hero.mjs): no runtime image transform. */}
        <img
          src="/images/machine-shop-1920.jpg"
          srcSet={heroSet("jpg")}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
      </picture>

      {/*
        Scrim. Legibility is not negotiated with the photograph: the band is
        washed toward the theme's own base-100 rather than a hand-written
        colour, so it stays a token and follows the theme. The gradient is
        heaviest where the text sits and lightest over the machine.

        THE STOPS WERE SOLVED FOR, NOT PICKED. Measured against the brightest
        pixels each text run actually covers (p99.9 of its own bounding box,
        composited through the gradient at that x):

          heading            8.26:1     needs 4.5
          "We run it." taupe 4.89:1     needs 3.0  <- the binding constraint
          supporting line    6.89:1     needs 4.5
          credit, 14px       4.97:1     needs 4.5

        An earlier 1/0.9/0.6 scrim measured 11.2:1 and buried the photograph
        entirely, which defeats the point of a full-bleed image. Taupe on the
        second line is what stops it going lighter still: it is the dimmest
        thing on the band, so it sets the floor for everything.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-base-100/95 via-base-100/80 to-base-100/45"
      />

      <div className="mx-auto max-w-6xl px-6 py-32 md:py-40">
        <Reveal>
          <div className="grid max-w-2xl gap-7">
            <h2 id="production-heading" className="display-2 text-balance">
              We don&rsquo;t demo software.{" "}
              <span className="text-accent">We run it.</span>
            </h2>
            <p className="max-w-[46ch] text-xl text-base-content/80">
              Every product on this page is something we built, shipped, and
              still run. Not a case study. Not a pitch.
            </p>
          </div>
        </Reveal>
      </div>

      {/*
        14px is the floor, not a licence to go smaller — design.md §11. A credit
        is genuinely secondary, which is what the smallest allowed step is for.

        /75, not /50. At 50% opacity over this scrim the credit measured
        3.09:1 and failed AA outright — dimming text is the same mistake as
        shrinking it, and it is invisible to grep for exactly the same reason.
      */}
      <p className="relative mx-auto max-w-6xl px-6 pb-8 text-sm text-base-content/75">
        Photograph: Alfred T. Palmer, 1942. U.S. Office of War Information,
        Library of Congress. Public domain.
      </p>
    </section>
  );
}
