import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { PageShell } from "@/components/sections/page-shell";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work and the results behind it — written from real projects rather than assembled from stock case studies.",
};

/**
 * Work. docs/landing.md §9 wants specific proof: a real problem, what was
 * built, and a measurable result where one truthfully exists.
 *
 * That material does not exist yet, and §9's rule is unambiguous — "Never
 * invent numbers." So this page says where things stand instead of filling the
 * space with plausible-looking case studies. The products themselves are the
 * strongest evidence available today (§17), so it points at them.
 */
export default function WorkPage() {
  return (
    <PageShell
      title="Real problems. Real results."
      intro="Case studies are being written from actual projects, with the people involved, rather than assembled from stock outcomes. That takes longer and it is the only version worth publishing."
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20">
        <div className="grid max-w-[58ch] gap-5 text-base-content/80">
          <p>
            We would rather show you nothing than show you invented numbers. A
            metric on a page like this should be one somebody can check, and
            attached to work somebody agreed to have published.
          </p>
          <p>
            In the meantime the products are the honest version of this page.
            They are live, they have real users, and you can go and use them.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 pt-2">
          <Link
            href="/products"
            className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
          >
            See the products
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link href="/contact" className="font-medium underline-offset-4 hover:underline">
            Ask about a specific project →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
