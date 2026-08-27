import Link from "next/link";
import { TrackLink } from "@/components/analytics/track-link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { Wordmark } from "@/components/mark/wordmark";
import { MobileNav } from "./mobile-nav";

/**
 * Section 01 — Navigation. docs/landing.md §3.
 *
 * Navigation stays quiet (design.md §15). Four links and one CTA. §3 is
 * explicit that individual product links, careers, press, docs, legal and
 * social do NOT belong here — they go in the footer.
 *
 * Server component: no JavaScript ships for the desktop nav at all. Only the
 * mobile disclosure is a client island.
 *
 * The CTA is `size="lg"`, not `sm`. Silica's button ramp carries its own font
 * sizes — xs 11px, sm 12px, md 14px, lg 16px — so `btn-sm` lands under the
 * 14px floor no matter what the markup says. `lg` is the first step that hits
 * the 16px standard, which is where the page's primary action belongs.
 */

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4"
      >
        <Link href="/" className="rounded-sm" aria-label="WizeWorks — home">
          <Wordmark />
        </Link>

        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              {/* Underline grows from the left on hover — animation.md §5.
                  Colour shift plus underline, so hover is not colour-only. */}
              <Link
                href={l.href}
                className="group relative inline-block py-1 text-base-content/75 transition-colors duration-150 hover:text-base-content"
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-150 group-hover:scale-x-100"
                />
              </Link>
            </li>
          ))}
          <li>
            <TrackLink
              event="nav_lets_build"
              href="/contact"
              className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
            >
              Let&rsquo;s build
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </TrackLink>
          </li>
        </ul>

        <div className="ml-auto md:hidden">
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
