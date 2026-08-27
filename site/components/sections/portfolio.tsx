import Image from "next/image";
import { TrackLink } from "@/components/analytics/track-link";
import { PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 04 — Product portfolio. docs/landing.md §6.
 *
 * "Do not present the products as five identical SaaS cards." The layout is
 * deliberately asymmetric: the first two products get feature cards with room
 * for a real interface visual, the remaining three sit in a quieter row.
 *
 * Category labels were uppercase tracked 10px — an eyebrow at an illegible
 * size. They are now sentence-case text at 14px, which is the smallest step the
 * scale allows.
 *
 * Every card carries a REAL interface capture, taken from the product in
 * production — §6 wants real product interfaces, and a fake browser chrome with
 * invented UI inside it would be the "meaningless stock" §19 rules out. A
 * product with no capture yet renders a labelled "Interface pending" well
 * rather than a stand-in.
 */


/**
 * Product colour introduction — docs/animation.md §12, docs/design.md §7.
 *
 * "WizeWorks is the canvas. The product brings the colour." The colour enters
 * with the card and stays strictly inside it; nothing outside a product card
 * ever references a product colour, and the maker's mark never does.
 *
 * COLOUR IS NEVER USED FOR TEXT HERE. Measured against the paper ground:
 * Piggles 2.22:1, jotacular 2.04:1, sparx 3.73:1, kanNINJA 3.78:1 — all fail AA
 * for normal text and two fail it for large text as well. So the colour lives
 * in a rule and a border tint, where no contrast floor applies, and every label
 * stays charcoal.
 *
 * Class names are written out in full: Tailwind generates utilities by scanning
 * source text, so `border-${p.color}` would compile to nothing.
 */
const ACCENT: Record<
  string,
  { rule: string; hover: string }
> = {
  piggles:   { rule: "bg-piggles",   hover: "group-hover:border-piggles/50" },
  sparx:     { rule: "bg-sparx",     hover: "group-hover:border-sparx/50" },
  kanninja:  { rule: "bg-kanninja",  hover: "group-hover:border-kanninja/50" },
  jotacular: { rule: "bg-jotacular", hover: "group-hover:border-jotacular/50" },
  agconn:    { rule: "bg-agconn",    hover: "group-hover:border-agconn/50" },
  silicaui:  { rule: "bg-silicaui",  hover: "group-hover:border-silicaui/50" },
};

function ScreenshotWell({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="overflow-hidden rounded border border-base-300 bg-base-200">
        <Image
          src={src}
          alt={`The ${name} interface`}
          width={790}
          height={494}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
    );
  }
  // No stand-in UI. docs/landing.md §6 wants a real interface; inventing one is
  // the "meaningless stock" §19 rules out.
  return (
    <div
      className="grid aspect-[16/10] place-items-center rounded border border-dashed border-base-300 bg-base-200/60"
      role="img"
      aria-label={`${name} interface — image pending`}
    >
      <span className="text-sm text-base-content/45">Interface pending</span>
    </div>
  );
}

export function Portfolio() {
  /**
   * The two feature cards go to products we can actually SHOW. A feature card
   * is mostly a screenshot well, so giving one to a product with no capture
   * yet produces a large dashed placeholder as the most prominent thing in the
   * section — the opposite of what §6 wants.
   *
   * This re-sorts itself as captures land, so no one has to remember to
   * reorder the array.
   */
  const withShot = PRODUCTS.filter((p) => p.screenshot);
  const withoutShot = PRODUCTS.filter((p) => !p.screenshot);
  const ordered = [...withShot, ...withoutShot];
  const [lead, second, ...rest] = ordered;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 border-b border-base-300/60"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28">
        <Reveal>
          <div className="grid max-w-3xl gap-4">
            <h2 id="portfolio-heading" className="display-3">
              Things we&rsquo;ve made.
            </h2>
            <p className="lead text-base-content/75">
              Different problems. Different people. Built with the same level of
              care.
            </p>
          </div>
        </Reveal>

        {/* Two feature cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {[lead, second].map((p, i) => (
            <Reveal key={p.slug} index={i} className="h-full">
              <TrackLink
                event="product_card_click"
                props={{ product: p.slug, placement: "feature" }}
                href={p.href}
                className={`group flex h-full flex-col gap-7 rounded-lg border border-base-300 bg-base-100 p-8 transition-colors duration-[400ms] ${ACCENT[p.color].hover}`}
              >
                {/* The product's colour, contained. §12: it arrives as the
                    product comes into focus, over 350–500ms. */}
                <span
                  aria-hidden="true"
                  className={`h-[3px] w-12 rounded-full ${ACCENT[p.color].rule}`}
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-2xl font-semibold tracking-tight">
                    {p.name}
                  </span>
                  <span className="text-sm text-base-content/55">
                    {p.category}
                  </span>
                </div>

                <p className="text-base-content/85">{p.positioning}</p>

                {/* translateY only — §13 caps screenshot movement so the page
                    never feels like the images are floating. */}
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <ScreenshotWell name={p.name} src={p.screenshot} />
                </div>

                <p className="text-sm text-base-content/65">{p.outcome}</p>

                <span className="mt-auto inline-flex items-center gap-2 font-medium">
                  Explore {p.name}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </TrackLink>
            </Reveal>
          ))}
        </div>

        {/* Three supporting cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} index={i} className="h-full">
              <TrackLink
                event="product_card_click"
                props={{ product: p.slug, placement: "supporting" }}
                href={p.href}
                className={`group flex h-full flex-col gap-5 rounded-lg border border-base-300 bg-base-100 p-7 transition-colors duration-[400ms] ${ACCENT[p.color].hover}`}
              >
                <span
                  aria-hidden="true"
                  className={`h-[3px] w-10 rounded-full ${ACCENT[p.color].rule}`}
                />

                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-xl font-semibold tracking-tight">
                    {p.name}
                  </span>
                  <span className="text-sm text-base-content/55">
                    {p.category}
                  </span>
                </div>

                {/* §6 asks for a real visual on every card, not only the
                    feature ones. Supporting cards get a shallower crop so the
                    interface reads as a glimpse rather than a full view. */}
                {p.screenshot && (
                  <div className="overflow-hidden rounded border border-base-300 bg-base-200 transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={p.screenshot}
                      alt={`The ${p.name} interface`}
                      width={790}
                      height={340}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="aspect-[21/9] w-full object-cover object-top"
                    />
                  </div>
                )}

                <p className="text-base-content/80">{p.positioning}</p>
                <span className="mt-auto inline-flex items-center gap-2 font-medium">
                  Explore
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </TrackLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
