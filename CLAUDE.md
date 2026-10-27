# CLAUDE.md

## What this repo is

Brand and product-spec documentation for **WizeWorks LLC** — the parent company / product
studio behind Piggles, sparx, AGCONN, kanNINJA, jotacular, and SilicaUI.

```
docs/design.md      Design system — brand foundation, logo rules, palette, type, materials
docs/landing.md     Landing-page strategy — section-by-section homepage structure & copy
docs/animation.md   Motion specification — timing tokens, easing, per-section choreography
docs/plan.md        Build plan for the homepage — phases, decisions, open questions
images/             Rendered concept mockups (PNG, ~0.4–2.9 MB each)
site/               The Next.js implementation — homepage plus six routes
admin/              The operator console (admin.wize.works) — see admin/README.md
k8s/                Cluster manifests: namespace.yaml, then one folder per app
```

`site/` and `admin/` are the two parts with a build. Each has its own lockfile,
its own `Dockerfile` (built from the repo root), and its own `k8s/<app>/`
folder. `.github/workflows/deploy.yml` deploys whichever one a push changed.

The rest of this file is about the site. The console's rules are in
`admin/README.md` and in the CLAUDE.md files under `admin/packages/`.

## The site

`site/` is Next.js 16 (App Router, TypeScript) + `@wizeworks/silicaui-react` on Tailwind v4.
Run it with `pnpm dev` / `pnpm build` from inside `site/`.

Two rules carry most of the weight:

- **No literal hex in components.** The palette is a Silica theme in
  `site/styles/theme.css`, applied via `data-theme`. Components read tokens
  (`bg-base-100`, `text-primary`, `btn-accent`), never colors.
- **Dark sections are theme islands**, written `<section data-theme="wizeworks-dark">`.
  There are no `dark:` variants anywhere, and there should never be.

## Site structure

```
/                     homepage — 10 sections (docs/landing.md §24)
/products             index of the portfolio
/products/[slug]      detail, generated from lib/products.ts
/about                why the company exists, the mark, the principles
/contact              four-field form + /api/contact
/work  /insights      honest holding pages — gated on real content
/brand                press & brand, with downloadable mark SVGs
/careers              real page, nothing open
/privacy  /terms      ⚠ NOT legally reviewed — see the notes in each file
```

`lib/products.ts` is the single source of truth for the portfolio. Adding a
product there gives it a homepage card, an index row, a detail page, and a
footer link — no route to create by hand.

Product names are **styled, not merely capitalised**: `AGCONN`, `jotacular`,
`kanNINJA`, `sparx`, `SilicaUI`. Never title-case them, and never let
`text-transform` set them.

**SilicaUI is both a product in the portfolio and the design system this site is
built on.** Adding a product means: an entry in `lib/products.ts`, an article in
`lib/product-articles.ts`, a colour role in `styles/theme.css`, and an entry in
the three `ACCENT` maps (portfolio, products index, product detail). Counts on
the page are derived from `PRODUCTS.length`, so they never need touching.

The contact form's delivery is intentionally unconfigured — `/api/contact`
validates and returns 503 rather than pretending to send. Set `CONTACT_TO` and
implement `deliver()` to switch it on.

Two traps worth knowing before touching the styles:

- Silica's component sizes carry **their own font sizes** — `btn-sm` is 12px, under
  the floor. Grep can't catch this; measure the rendered page.
- The Silica theme plugin **silently discards `var()`** in a token value — it keeps only the
  last comma-separated part. That is why `--font-sans` lives in `globals.css` as a plain
  `:root` rule rather than in the theme block. Don't move it back.
- Tailwind generates utilities by scanning source text, so a class name must appear
  **literally**. `bg-${token}` compiles to nothing. Silica's own component classes
  (`btn-primary`, `badge-sparx`) come from the plugin and are exempt.

The three docs are meant to be read together: `landing.md` decides *what goes on the page*,
`design.md` decides *how it looks*, `animation.md` decides *how it moves*. When implementing
the site, all three apply to any given section.

`images/icon.png` is the maker's mark itself: three rounded chevron/L units arranged around
a hexagonal negative-space center — two deep charcoal, one warm taupe. Use it as the shape
reference.

**Everything else in `images/` is an exploratory mockup, not a specification.** `landing.png`
in particular is a design exploration — it is not a committed layout, and details in it are
not necessarily true. The same goes for `hero.png`, `concept-site.png`, `concept-logo.png`,
`brand.png`, `card.png`, `letterhead.png`, `sign.png`, `heritage.png`, `patches.png`,
`leather.png`, `gear.png`, `tshirts.png`, `wearable.png`, and `wearable2.png`. They show
direction and material feel. When a mockup and the docs disagree, **the docs win** — and
don't cite a mockup as evidence that something was decided.

## Working in the docs

Edits there are prose edits to the specs. Match the existing document conventions:

- `# N. Section Title` numbered top-level headings, `---` rules between sections
- Status/metadata block right under the H1 (`**Status:** …`)
- Values written as inline code with units: `#1F1F1F`, `550–700ms`, `translateY 24px → 0`
- En-dashes for ranges (`240–360ms`), not hyphens
- Blockquotes for brand copy and taglines, not for asides
- Prescriptive voice with explicit **Do** / **Avoid** / **Do not** lists

## Locked constraints (do not "improve" these)

These are stated as canonical in the docs. Treat them as fixed unless the user explicitly
overrides them:

- **Logo geometry is locked.** Don't redraw pieces, change corner rounding, alter the
  internal notch or spacing, rotate pieces independently, make it a W or WW monogram, add
  gradients/outlines, or put anything in the center negative space.
- **The mark is never recolored with product colors.** Two charcoal units + one warm taupe.
- **Motto is `We make things that work.`** Don't substitute abstract tech/AI language.
- **Attribution phrase is `Made by WizeWorks`.**
- **Core palette:** Deep Charcoal `#1F1F1F`, Warm Taupe `#A69D90`, Paper `#F7F3EA`,
  Soft Neutral `#F2EEE7`, Light Warm Gray `#DDD8D0`, Near Black `#151515`,
  Graphite `#62605C`, Muted Warm Gray `#8E8981`.
- **WizeWorks stays neutral; products bring the color.** Product color stays contained to
  that product's card, screenshot, label, and hover state.
- **The process is four stages:** Strategy → Design → Systems → Launch. Improvement after
  launch is real work but lives inside **Launch**, not as a fifth stage.
- **Never invent metrics or testimonials.** `landing.md` §9 and §25 are explicit: use
  qualitative proof rather than fabricated numbers.
- **`prefers-reduced-motion` support is Tier 1**, not a polish item (`animation.md` §33, §37).

## Related

Sibling directories under `G:\code\@wizeworks\` hold the actual product codebases
(helpNINJA, AgConnect, jotDOJO, kanninja, and others). Those are separate repos with their
own conventions — this one only governs the parent brand.
