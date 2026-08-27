import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { PageShell } from "@/components/sections/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { TrackLink } from "@/components/analytics/track-link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Six products for six different kinds of work. Built by WizeWorks on one shared foundation.",
};

/**
 * The products index. docs/landing.md §29 lists Products as a top-level page.
 *
 * Where the homepage gives each product a card, this gives each one a row with
 * room to say what it actually does — the interface, the points its own site
 * makes, and a way through to either the product or its detail page.
 *
 * Alternating image side gives the eye something to follow down a long page
 * without turning it into a grid of identical tiles (design.md §12).
 */
const ACCENT: Record<string, string> = {
  piggles: "bg-piggles",
  sparx: "bg-sparx",
  kanninja: "bg-kanninja",
  jotacular: "bg-jotacular",
  agconn: "bg-agconn",
  silicaui: "bg-silicaui",
};

export default function ProductsPage() {
  return (
    <PageShell
      title="Six products. One standard."
      intro="Different industries, different people, different problems. What they share is the care underneath them — and a company that keeps showing up after launch."
    >
      <div className="mx-auto grid max-w-6xl gap-24 px-6 py-24">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug}>
            <article className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
              {/* Alternate which side the interface sits on. */}
              <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                {p.screenshot ? (
                  <Image
                    src={p.screenshot}
                    alt={`The ${p.name} interface`}
                    width={790}
                    height={494}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="w-full rounded-lg border border-base-300 object-cover"
                  />
                ) : (
                  <div
                    className="grid aspect-[16/10] place-items-center rounded-lg border border-dashed border-base-300 bg-base-200/60"
                    role="img"
                    aria-label={`${p.name} interface — image pending`}
                  >
                    <span className="text-sm text-base-content/45">
                      Interface pending
                    </span>
                  </div>
                )}
              </div>

              <div className="grid gap-6">
                <span
                  aria-hidden="true"
                  className={`h-[3px] w-12 rounded-full ${ACCENT[p.color]}`}
                />

                <div className="grid gap-3">
                  <h2 className="display-3">{p.name}</h2>
                  <p className="lead text-base-content/80">{p.positioning}</p>
                </div>

                <p className="max-w-[52ch] text-base-content/75">{p.outcome}</p>

                {p.highlights.length > 0 && (
                  <ul className="grid gap-2.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-base-content/75">
                        <span aria-hidden="true" className="text-base-content/35">
                          —
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap items-center gap-6 pt-1">
                  <TrackLink
                    event="product_card_click"
                    props={{ product: p.slug, placement: "products_index" }}
                    href={p.href}
                    className="group inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
                  >
                    More about {p.name}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </TrackLink>

                  {p.url && (
                    <Link
                      href={p.url}
                      className="text-base-content/65 underline-offset-4 hover:text-base-content hover:underline"
                    >
                      Visit {p.name} ↗
                    </Link>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
