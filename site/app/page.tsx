import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { InProduction } from "@/components/sections/in-production";
import { Portfolio } from "@/components/sections/portfolio";
import { Philosophy } from "@/components/sections/philosophy";
import { Process } from "@/components/sections/process";
import { Story } from "@/components/sections/story";
import { Audience } from "@/components/sections/audience";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";
import { ScrollDepth } from "@/components/analytics/scroll-depth";

/**
 * The WizeWorks homepage.
 *
 * Narrative order from docs/landing.md §24.
 *
 * Three sections from that order are deliberately ABSENT, not forgotten:
 *
 *   Selected work / results  — needs real case studies and truthful metrics
 *   Social proof             — needs real, attributable testimonials
 *   Insights                 — needs three real posts
 *
 * docs/landing.md §9 and §25 forbid inventing any of it, so each stays out
 * until the material exists. A section with nothing true to say is worse than
 * no section: it is the exact "fake stats / fake testimonials" the spec rules
 * out, and it would undermine the credibility the rest of the page is building.
 *
 * The page progressively proves the hero's claim: the statement band says what
 * kind of company this is, the portfolio shows WizeWorks makes things, the
 * philosophy says what connects them, the process shows the work is
 * intentional, and the CTA becomes a natural conclusion.
 *
 * The old "Made by WizeWorks" proof strip is gone. It listed the same six
 * products, as plain text names, immediately above the portfolio that renders
 * them properly — see in-production.tsx for the full reasoning.
 */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content"
      >
        Skip to content
      </a>

      <ScrollDepth />
      <SiteNav />

      <main id="main">
        <Hero />
        <InProduction />
        <Portfolio />
        <Philosophy />
        <Process />
        <Story />
        <Audience />
        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
