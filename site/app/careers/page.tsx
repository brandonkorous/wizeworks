import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { PRODUCTS } from "@/lib/products";
import { PageShell } from "@/components/sections/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "No open positions at WizeWorks right now. What the work looks like, and how to reach us anyway.",
};

/**
 * Careers, with nothing open.
 *
 * Deliberately NOT invented: headcount, funding, office locations, remote
 * policy, benefits, salary bands, or a "culture" section. None of that is in
 * the specs, and a careers page is exactly where a fabricated detail does real
 * damage — someone might apply because of it.
 *
 * What IS here is derivable from the specs and the portfolio: how the work is
 * structured (design.md §13's four stages), what the company demonstrably
 * builds, and an honest way to make contact. docs/design.md §25 asks for a
 * voice that is clear, practical and human without corporate filler; saying
 * "there is nothing open" plainly is the most human thing this page can do.
 */

/** Derived from how the company actually works, not from a values workshop. */
const WHAT_THE_WORK_LOOKS_LIKE = [
  {
    heading: "You will work across industries that have nothing in common",
    body: "In one year the portfolio has spanned farm labour, small-business operations, commerce infrastructure, note-taking and a component library. The through-line is the standard applied, not the subject matter. People who need to specialise in one vertical tend not to enjoy this.",
  },
  {
    heading: "Nothing is finished at launch",
    body: "The process is four stages — Strategy, Design, Systems, Launch — and improvement lives inside Launch rather than after it. Work here means staying with a product once real people are using it, which is the least glamorous and most useful part.",
  },
  {
    heading: "Small decisions get argued properly",
    body: "Whether a label is legible at 14px, whether a metric is honest enough to publish, whether a feature earns the complexity it adds. If that sounds tedious rather than satisfying, this will be a frustrating place to work.",
  },
  {
    heading: "Useful beats impressive",
    body: "The result matters more than the vocabulary around it. Work that quietly does its job is valued above work that demonstrates cleverness.",
  },
] as const;

export default function CareersPage() {
  return (
    <PageShell
      title="Nothing open right now."
      intro="We are not hiring at the moment, and we would rather say so than keep a page of evergreen listings that quietly go nowhere. If that changes, roles will appear here first."
    >
      <div className="mx-auto grid max-w-6xl gap-24 px-6 py-20">
        <Reveal>
          <section aria-labelledby="work-heading" className="grid gap-10">
            <div className="grid max-w-[58ch] gap-4">
              <h2 id="work-heading" className="display-3">
                What the work looks like, for when it does change.
              </h2>
              <p className="text-base-content/80">
                Rather than a list of values, here is what is actually true about
                building here. It is a fair filter in both directions.
              </p>
            </div>

            <dl className="grid gap-x-14 gap-y-10 md:grid-cols-2">
              {WHAT_THE_WORK_LOOKS_LIKE.map((w) => (
                <div
                  key={w.heading}
                  className="grid gap-3 border-t border-base-300 pt-6"
                >
                  <dt className="text-xl font-semibold tracking-tight">
                    {w.heading}
                  </dt>
                  <dd className="max-w-[52ch] text-base-content/75">{w.body}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>

        {/* ---- speculative contact ---- */}
        <Reveal>
          <section
            aria-labelledby="reach-heading"
            className="grid gap-6 rounded-lg border border-base-300 bg-base-200 p-10 md:p-14"
          >
            <h2
              id="reach-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Write anyway, if you mean it
            </h2>
            <div className="grid max-w-[58ch] gap-4 text-base-content/80">
              <p>
                Speculative messages are read. The ones worth sending say what
                you have built and what you would want to work on — not a
                résumé, and not a cover letter written for a job that
                doesn&rsquo;t exist.
              </p>
              <p>
                If there is nothing to offer you, we will say that rather than
                going quiet. That is the whole promise, and it is the only one
                worth making while nothing is open.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                href="/contact"
                className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
              >
                Get in touch
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </section>
        </Reveal>

        {/* ---- what you'd be working on ---- */}
        <Reveal>
          <section aria-labelledby="products-heading" className="grid gap-6">
            <div className="grid max-w-[58ch] gap-3">
              <h2
                id="products-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                What you would be working on
              </h2>
              <p className="text-base-content/75">
                All {PRODUCTS.length} are live. The fastest way to know whether
                this is interesting is to go and use them.
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
      </div>
    </PageShell>
  );
}
