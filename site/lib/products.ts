/**
 * The WizeWorks portfolio — one source of truth for the proof strip, the
 * portfolio section, and the footer.
 *
 * ⚠️ COPY STATUS — read before launch.
 *
 * Piggles, kanNINJA and jotacular now carry copy taken from **their own live
 * marketing sites** — verified in production, not written here. Those are
 * `draft: false`.
 *
 * All five are now sourced from their own live sites. AGCONN came last: its
 * domain was returning a Cloudflare 1000 error until 27 Aug 2026.
 *
 * NAMES ARE EXACT. `AGCONN` is all caps, `jotacular` is all lowercase, and
 * `kanNINJA` carries its internal capitals. These are how the brands are
 * written — never title-case them, and never let a CSS `text-transform` decide
 * casing for a product name.
 *
 * `color` is a registered Silica role, not a hex. All five currently resolve to
 * charcoal — see the TODO in styles/theme.css. The portfolio will read
 * monochrome until the real brand hexes land, which is the correct neutral
 * state (docs/design.md §7: WizeWorks stays neutral, the product brings the
 * colour) rather than a placeholder that invents one.
 */

export type Product = {
  slug: string;
  name: string;
  /** One-sentence positioning. docs/landing.md §6. */
  positioning: string;
  category: string;
  /** Short use-case statement shown under the product visual. */
  outcome: string;
  /** Registered Silica colour role — see styles/theme.css. */
  color:
    | "kanninja"
    | "agconn"
    | "sparx"
    | "piggles"
    | "jotacular"
    | "silicaui";
  /**
   * Real product interface capture (docs/landing.md §6). Absent means the well
   * renders "Interface pending" rather than a stand-in — no invented UI.
   */
  screenshot?: string;
  /** The live product. Absent while a site is down. */
  url?: string;
  /**
   * Points taken from the product's own site. Never written here — if a claim
   * is not on the product's marketing, it does not belong in this list.
   */
  highlights: string[];
  href: string;
  /** False once the owner has approved the copy. */
  draft: boolean;
};

export const PRODUCTS: Product[] = [
  {
    slug: "piggles",
    name: "Piggles",
    // The one line quoted directly from docs/landing.md §6.
    positioning: "Go and run the business. Piggles handles the software.",
    category: "Business operations",
    outcome:
      "All fifteen apps for one price — site, customers, stock and invoices in one place. Built for bakeries, barbers, florists, garages and workshops.",
    color: "piggles",
    screenshot: "/products/piggles.png",
    url: "https://mypiggles.com",
    highlights: [
      "All fifteen apps for one price.",
      "Ready in minutes — two questions and you are in.",
      "Site, customers, stock and invoices in one place.",
      "Your data is kept separate, enforced by the database rather than the app.",
      "Never used to train AI — not a model, not anonymised, not ever.",
    ],
    href: "/products/piggles",
    draft: false,
  },
  {
    slug: "sparx",
    name: "sparx",
    positioning: "Start with a spark. Switch on the rest when you're ready.",
    category: "Content and commerce OS",
    outcome:
      "Fourteen modules — site, commerce, CRM, invoicing, email — that join the story you already have. No migration, no second login. Pay for the parts you use.",
    color: "sparx",
    screenshot: "/products/sparx.jpg",
    url: "https://sparx.works",
    highlights: [
      "Fourteen modules — switch on only the parts you need.",
      "Builder, Commerce, CMS, CRM, Invoicing, Email, and more.",
      "No migration and no second login when you add one.",
      "Switch a module off and your data stays exactly where it is.",
    ],
    href: "/products/sparx",
    draft: false,
  },
  {
    slug: "agconn",
    name: "AGCONN",
    positioning: "From the field, to your future.",
    category: "Agricultural workforce",
    outcome:
      "Connects Central Valley farmworkers to verified seasonal jobs and CDFA-funded training — bilingual from day one, with a portable record of skills that travels to the next harvest.",
    color: "agconn",
    screenshot: "/products/agconn.png",
    url: "https://agconn.com/en",
    highlights: [
      "Every employer verified by name — FLC licence or grower registry, re-checked nightly.",
      "Sign up by phone with an SMS code. No app store, no email, no password.",
      "Bilingual end to end: postings, certificates and alerts in English and Spanish.",
      "A skills wallet that follows the worker from harvest to harvest.",
      "Grant-defensible records, exportable in WIOA-aligned formats.",
    ],
    href: "/products/agconn",
    draft: false,
  },
  {
    slug: "kanninja",
    name: "kanNINJA",
    positioning: "Discipline, made visible.",
    category: "Work management",
    outcome:
      "A kanban that respects your attention: the work in front of you, in the order you will finish it. Runs inside Claude, ChatGPT, and anything else that speaks MCP.",
    color: "kanninja",
    screenshot: "/products/kanninja.png",
    url: "https://kanninja.com",
    highlights: [
      "The work in front of you, in the order you will finish it.",
      "Runs inside Claude, ChatGPT, and anything else that speaks MCP.",
      "The same board driven from the chat you already use.",
    ],
    href: "/products/kanninja",
    draft: false,
  },
  {
    slug: "silicaui",
    name: "SilicaUI",
    positioning: "Ship components, not decisions.",
    category: "Design system",
    outcome:
      "116 components across 13 packages, built on Base UI and Tailwind v4. Real CSS classes rather than runtime CSS-in-JS, and every colour an OKLCH token that re-tints everything at once.",
    color: "silicaui",
    screenshot: "/products/silicaui.png",
    url: "https://silicaui.com",
    highlights: [
      "Open source, and free.",
      "Three synchronized layers: React, framework-neutral HTML, and a zero-dependency vanilla runtime.",
      "Register one named colour and every variant re-tints — no rebuild, no safelist.",
      "Accessibility from Base UI, with the same interaction patterns in the non-React output.",
      "This site is built on it.",
    ],
    href: "/products/silicaui",
    draft: false,
  },
  {
    slug: "jotacular",
    name: "jotacular",
    positioning: "Don't organize it. Just jot it.",
    category: "Notes and writing",
    outcome:
      "Write it, type it, say it, or snap it on the phone already in your hand — then ask Claude what you said.",
    color: "jotacular",
    screenshot: "/products/jotacular.png",
    url: "https://jotacular.com",
    highlights: [
      "Write it, type it, say it, or snap it.",
      "A note in a second, on the phone already in your hand.",
      "Then ask Claude what you said.",
      "Nothing to install, and no computer left running at home.",
    ],
    href: "/products/jotacular",
    draft: false,
  },
];

/** True while any product copy is still awaiting sign-off. */
export const HAS_DRAFT_COPY = PRODUCTS.some((p) => p.draft);

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
