import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { PageShell } from "@/components/sections/page-shell";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "What we're learning while we build — product thinking, launch stories, and engineering lessons.",
};

/**
 * Insights. docs/landing.md §13 wants a lower-friction path for visitors who
 * are not ready to make contact: three real posts about building.
 *
 * Nothing is published yet. An empty blog with three placeholder posts is worse
 * than an honest one, so this says so and offers the routes that do exist.
 */
export default function InsightsPage() {
  return (
    <PageShell
      title="What we're learning while we build."
      intro="Product thinking, launch stories, and the engineering lessons that only show up once something is in front of real people."
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20">
        <div className="grid max-w-[58ch] gap-5 text-base-content/80">
          <p>
            Nothing is published here yet. We are writing rather than
            back-filling, so this page will fill up slowly and with things
            actually worth reading.
          </p>
          <p>
            If you want the unedited version in the meantime, the products
            themselves are where the thinking ends up first.
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
          <Link href="/about" className="font-medium underline-offset-4 hover:underline">
            How we think about building →
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
