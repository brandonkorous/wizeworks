import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { PRODUCTS } from "@/lib/products";
import { PageShell } from "@/components/sections/page-shell";
import { MakersMark } from "@/components/mark/makers-mark";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "WizeWorks is the maker behind a family of products built on one shared foundation. We make things that work.",
};

/**
 * About. docs/landing.md §29 lists it top-level; §11 says this is where the
 * company explains itself properly rather than in a homepage paragraph.
 *
 * Everything on this page comes from the brand's own stated principles
 * (design.md §26, §31) and the portfolio as it actually is. Nothing about team
 * size, founding dates, headcount or history is invented — none of that is in
 * the specs, and a fabricated origin story is the fastest way to lose the
 * credibility the rest of the site is building.
 */

/** docs/design.md §26 — the brand principles, in the brand's own words. */
const PRINCIPLES = [
  {
    title: "One shape. Repeated.",
    body: "A single foundation can create many things.",
  },
  {
    title: "Three visible. One implied.",
    body: "What is present matters. So does the space left for what comes next.",
  },
  {
    title: "Built to scale.",
    body: "We create systems, not throwaway experiments.",
  },
  {
    title: "Products get the colour.",
    body: "WizeWorks provides the canvas.",
  },
  {
    title: "Useful over impressive.",
    body: "The result matters more than the buzzwords.",
  },
  {
    title: "Made by WizeWorks.",
    body: "The mark is a signature of intentional work.",
  },
] as const;

export default function AboutPage() {
  return (
    <PageShell
      title="We make things that work."
      intro="WizeWorks is the maker behind a family of products. Each one belongs to its own industry and its own people; what they share is the foundation underneath and the standard applied to it."
    >
      <div className="mx-auto grid max-w-6xl gap-28 px-6 py-24">
        {/* Why the company exists — landing.md §11 */}
        <Reveal>
          <section
            aria-labelledby="why-heading"
            className="grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-center md:gap-20"
          >
            <div className="grid gap-6">
              <h2 id="why-heading" className="display-3 max-w-[18ch]">
                We build because we keep finding things that should work better.
              </h2>
              <div className="grid max-w-[54ch] gap-5 text-base-content/80">
                <p>
                  The same gap kept showing up in completely unrelated places —
                  a business running on software that fought it, a farm with no
                  tool built for how the season actually works, a team drowning
                  in the parts of the job nobody designed for.
                </p>
                <p>
                  The industries have nothing in common. The problem underneath
                  them does. So we build across all of them, on one shared
                  foundation, and let each product become whatever its own
                  people need it to be.
                </p>
              </div>
            </div>

            <Image
              src="/photos/workshop-tools.jpg"
              alt="A wall of hand tools in a woodworking shop, each in its place"
              width={960}
              height={640}
              sizes="(min-width: 768px) 42vw, 100vw"
              className="w-full rounded-lg border border-base-300 object-cover"
            />
          </section>
        </Reveal>

        {/* The mark — design.md §3, §26 */}
        <Reveal>
          <section
            aria-labelledby="mark-heading"
            className="grid gap-12 rounded-lg border border-base-300 bg-base-200 p-10 md:grid-cols-[0.8fr_1fr] md:items-center md:gap-16 md:p-14"
          >
            <div className="grid justify-items-center gap-6">
              <MakersMark size={160} title="The WizeWorks maker's mark" />
            </div>
            <div className="grid gap-5">
              <h2 id="mark-heading" className="display-3">
                A maker&rsquo;s mark, not a monogram.
              </h2>
              <div className="grid max-w-[52ch] gap-4 text-base-content/80">
                <p>
                  The symbol is built from one geometric unit, repeated three
                  times around an open centre. It contains no letters. It is not
                  a W, and it is not initials.
                </p>
                <p>
                  The repeated form is the foundation every product is built on.
                  The opening in the middle is the part that matters most: room
                  for what comes next.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Principles — design.md §26 */}
        <Reveal>
          <section aria-labelledby="principles-heading" className="grid gap-12">
            <h2 id="principles-heading" className="display-3 max-w-[16ch]">
              What we hold to.
            </h2>
            <dl className="grid gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="grid gap-2 border-t border-base-300 pt-5"
                >
                  <dt className="text-xl font-semibold tracking-tight">
                    {p.title}
                  </dt>
                  <dd className="text-base-content/75">{p.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* Brand architecture — design.md §31 */}
        <Reveal>
          <section
            aria-labelledby="family-heading"
            className="grid gap-10 border-t border-base-300 pt-14"
          >
            <div className="grid max-w-[56ch] gap-4">
              <h2 id="family-heading" className="display-3">
                WizeWorks is the maker. Each product is its own brand.
              </h2>
              <p className="text-base-content/75">
                The products share no fonts, colours, mascots or interface
                styles, and they are not meant to. What they share is a
                philosophy: thoughtful products made to solve real problems.
              </p>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col gap-2 rounded-lg border border-base-300 bg-base-100 p-5 transition-colors duration-300 hover:border-base-content/25"
                  >
                    <span className="text-lg font-semibold tracking-tight">
                      {p.name}
                    </span>
                    <span className="text-sm text-base-content/65">
                      {p.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center gap-5 border-t border-base-300 pt-12">
            <Link
              href="/contact"
              className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
            >
              Start a conversation
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/products"
              className="font-medium underline-offset-4 hover:underline"
            >
              See the products →
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
