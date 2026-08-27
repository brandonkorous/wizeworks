import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 03 — Immediate proof strip. docs/landing.md §5.
 *
 * The hero makes a promise; this provides evidence straight away, before any
 * company philosophy. §5 is explicit about that ordering.
 *
 * "Made by WizeWorks" was an uppercase tracked label — an eyebrow. It is now a
 * real heading at a real size, which is what it always was semantically.
 *
 * The WizeWorks mark stays neutral here and each product keeps its own colour —
 * the first demonstration of the brand-architecture rule. Until the real brand
 * hexes land the strip reads monochrome, which is the honest neutral state.
 */
export function ProofStrip() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="border-b border-base-300/60 bg-base-200"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 id="proof-heading" className="text-2xl font-semibold tracking-tight">
              Made by WizeWorks
            </h2>
            <p className="text-base-content/70">
              {/* Derived, so adding a product cannot leave this saying "five". */}
              {PRODUCTS.length} distinct products. One shared standard: they
              work.
            </p>
          </div>
        </Reveal>

        {/* Horizontal rail on desktop; scrollable on small screens rather than
            wrapping into a cramped grid (§5). */}
        <ul className="-mx-6 flex snap-x gap-3 overflow-x-auto px-6 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 md:grid-cols-5">
          {PRODUCTS.map((p, i) => (
            <li key={p.slug} className="min-w-[11rem] shrink-0 snap-start sm:min-w-0">
              <Reveal index={i} className="h-full">
                <Link
                  href={p.href}
                  className="group flex h-full flex-col justify-between gap-4 rounded border border-base-300 bg-base-100 px-5 py-5 transition-colors duration-200 hover:border-base-content/25"
                >
                  <span className="text-lg font-semibold tracking-tight">
                    {p.name}
                  </span>
                  <span className="text-sm text-base-content/60">
                    {p.category}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
