import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { Wordmark } from "@/components/mark/wordmark";

/**
 * Section 13 — Footer. docs/landing.md §15.
 *
 * This is where the links that §3 keeps OUT of the navigation belong: the
 * individual products, careers, press, legal. "Avoid a huge enterprise-style
 * sitemap" — four columns, nothing more.
 */

const COMPANY = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

const RESOURCES = [
  { href: "/brand", label: "Press / Brand" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

function Column({
  heading,
  links,
}: {
  heading: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div className="grid content-start gap-4">
      <h3 className="text-sm font-semibold text-base-content/55">{heading}</h3>
      <ul className="grid gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-base-content/75 underline-offset-4 transition-colors duration-150 hover:text-base-content hover:underline"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-base-300/60 bg-base-200">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="grid content-start gap-4">
            <Wordmark />
            <p className="max-w-[28ch] text-base-content/70">
              We make things that work.
            </p>
          </div>

          <Column
            heading="Products"
            links={PRODUCTS.map((p) => ({ href: p.href, label: p.name }))}
          />
          <Column heading="Company" links={COMPANY} />
          <Column heading="Resources" links={RESOURCES} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-base-300 pt-6">
          <p className="text-sm text-base-content/55">
            © {new Date().getFullYear()} WizeWorks LLC
          </p>
          <p className="text-sm text-base-content/55">
            Built, not animated.
          </p>
        </div>
      </div>
    </footer>
  );
}
