# WizeWorks LLC — Homepage Build Plan

**Status:** Approved for build  
**Scope:** Homepage only — the 12 sections in `landing.md` §24, plus stub routes for the rest of the nav  
**Stack:** Next.js (App Router) + `@wizeworks/silicaui-react` + Tailwind v4  
**Location:** `site/` in this repo  
**Governing specs:** `design.md` (look) · `landing.md` (content) · `animation.md` (motion)

---

# 1. Decisions Already Made

| Decision | Choice |
|---|---|
| Framework | Next.js App Router, TypeScript, RSC by default |
| Design system | `@wizeworks/silicaui-react` `0.55.0` (Base UI under it) |
| CSS | Tailwind v4 via the `@wizeworks/silicaui` plugin |
| First build | Homepage; Products / Work / About / Insights / Contact are stubs |
| Code location | `site/` inside this repo, beside `docs/` |
| Process model | Four stages — Strategy → Design → Systems → Launch |

The three spec docs are the source of truth. The PNGs in `images/` are exploratory mockups and are not binding — where a mockup and a doc disagree, the doc wins.

---

# 2. Repository Layout

```
wizeworks/
  docs/                     ← unchanged; canonical brand specs
  images/                   ← unchanged; exploratory mockups
  site/                     ← new
    app/
      layout.tsx            root <html data-theme="wizeworks">
      page.tsx              homepage — composes the 12 sections
      products/page.tsx     stub
      work/page.tsx         stub
      about/page.tsx        stub
      insights/page.tsx     stub
      contact/page.tsx      stub + form
    components/
      mark/
        makers-mark.tsx     canonical inline SVG, 3 addressable pieces
        mark-assembly.tsx   hero assembly variant
        wordmark.tsx        wizeworks lockup
      sections/
        site-nav.tsx        01
        hero.tsx            02
        proof-strip.tsx     03
        portfolio.tsx       04
        philosophy.tsx      05
        process.tsx         06
        selected-work.tsx   07
        testimonials.tsx    08
        story.tsx           09
        audience.tsx        10
        insights.tsx        11
        final-cta.tsx       12
        site-footer.tsx     13
      motion/
        reveal.tsx          IntersectionObserver reveal wrapper
        scroll-progress.tsx scroll-linked 0→1 for the process line
        count-up.tsx        metric count-up
    lib/
      products.ts           the five products as typed data
      motion.ts             duration + easing tokens
    styles/
      theme.css             the wizeworks Silica theme (see §3)
      globals.css           Tailwind entry
    public/
      products/             product logos + screenshots
```

---

# 3. The WizeWorks Theme — The Central Architectural Move

**Do not write hex values into components.** Silica's only sanctioned palette mechanism is a theme applied through `data-theme`. Declaring the WizeWorks palette as a theme means every Silica component resolves to brand color with no per-component styling, and dark sections become a nested attribute rather than a parallel set of CSS rules.

`site/styles/theme.css`, loaded **after** `@plugin "@wizeworks/silicaui"`:

```css
@plugin "@wizeworks/silicaui" {
  colors: primary, secondary, accent, neutral, info, success, warning, error,
          helpninja, agconn, sparx, piggles, jotacular;
}

@plugin "@wizeworks/silicaui/theme" {
  name: wizeworks;
  color-scheme: light;
  default: true;

  --color-base-100: #F7F3EA;   /* Paper */
  --color-base-200: #F2EEE7;   /* Soft Neutral */
  --color-base-300: #DDD8D0;   /* Light Warm Gray */
  --color-base-content: #1F1F1F;

  --color-primary: #1F1F1F;    /* Deep Charcoal */
  --color-secondary: #62605C;  /* Graphite */
  --color-accent: #A69D90;     /* Warm Taupe */
  --color-neutral: #8E8981;    /* Muted Warm Gray */

  /* NOTE: --font-sans is NOT set here. The theme plugin strips var()
     references from token values — see the Phase 0 finding in §8. It lives
     in globals.css as a plain :root rule instead. */

  --radius-field: 0.25rem;
  --radius-box: 0.5rem;
  --border: 1px;
  --depth: 0;                  /* design.md §15 — little or no shadow */
  --duration: 160ms;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);  /* animation.md §3 */
}

@plugin "@wizeworks/silicaui/theme" {
  name: wizeworks-dark;
  color-scheme: dark;

  --color-base-100: #151515;   /* design.md §21 */
  --color-base-200: #1F1F1F;
  --color-base-300: #333230;
  --color-base-content: #F7F3EA;

  --color-primary: #F7F3EA;
  --color-secondary: #B9B4AC;
  --color-accent: #A69D90;
  --color-neutral: #8E8981;
}
```

## Why two named themes rather than light/dark modes

The dark treatments in this design are **section islands**, not a user preference. The philosophy band (`animation.md` §14) and the final CTA band (`landing.md` §14) are dark *inside a light page*. Silica emits `[data-theme]` rules that nest, so:

```tsx
<section data-theme="wizeworks-dark">…</section>
```

is the entire implementation. No `dark:` variants, no duplicated component styles, and `<Button variant="outline">` inside it resolves to the correct ink automatically.

A site-wide dark mode is deliberately **out of scope for v1**. `design.md` §21 specifies dark values, so the theme above is ready if we later add a `prefersdark` root strategy.

## Free reduced-motion coverage

Silica forces `--duration` to `0.01ms` under `prefers-reduced-motion: reduce`, on `:root` and every theme island, with `!important`. Every hover, focus and open/close transition in the library is therefore already compliant. **Our custom scroll reveals are not** — they need their own guard (§7).

---

# 4. Product Color Strategy

`design.md` §7: WizeWorks stays neutral; the product brings the color, contained to that product's own card, logo, label and hover state.

Register the five product colors as custom Silica roles (the `colors:` list in §3). Silica then generates the full utility trio plus every component variant for each — `bg-sparx`, `badge-piggles`, `btn-agconn`, `text-jotacular` — with no safelist and no codegen step.

Containment is a lint rule, not a hope: **a `*-<product>` class may only appear inside that product's card subtree.** Nothing outside a product card may reference a product color, and the maker's mark never does.

`site/lib/products.ts` carries the five as typed data — slug, name, positioning line, category, outcome sentence, brand color, logo path, screenshot path — so the portfolio, proof strip and footer all render from one list.

> Product brand hexes are **not yet in the specs.** See §10.

---

# 5. The Maker's Mark

The single most constrained artifact in the build. `design.md` §4: the geometry is locked.

- Traced **once** from `images/icon.png` into an inline SVG, then frozen. Three rounded chevron/L units around a hexagonal negative-space center; two charcoal, one taupe.
- Each of the three pieces is its **own `<path>` in its own group**, because `animation.md` §7 animates their positions independently. They must be separately addressable without any piece being redrawn, rotated, or morphed.
- `currentColor` is wrong here — the mark is two-tone by definition. Pieces read `--color-primary` (×2) and `--color-accent` (×1) so the mark inverts correctly inside a dark island without a second asset.
- Props: `size`, `title` (a11y label), `assembling` (hero variant only).
- A separate small-size master is required below 24px (`design.md` §20).

Deliverables: `makers-mark.tsx`, plus `favicon.ico` / `icon.svg` / `apple-icon.png` generated from the same geometry.

---

# 6. Section → Component Mapping

| # | Section | Silica components | Custom work |
|---|---|---|---|
| 01 | Navigation | `Navbar`, `Link`, `Button`, `Drawer` (mobile) | Sticky background transition |
| 02 | Hero | `Hero`, `Display`, `Button` | Mark assembly, line-staggered headline, drafting-line bg |
| 03 | Proof strip | `ScrollStrip` (mobile), `Link` | Product logo rail |
| 04 | Portfolio | `ClickableCard`, `MockupBrowser`, `Badge` | Asymmetric editorial grid, per-card color scope |
| 05 | Philosophy | `Display`, `Text`, `Divider` | Dark island, editorial type composition |
| 06 | Process | `Steps` + `Step` | **Scroll-linked SVG drafting line** (see below) |
| 07 | Selected work | `Card`, `Stat` | Count-up, clip reveal |
| 08 | Testimonials | `Blockquote`, `Avatar`, `Card` | — (no autoplay carousel; `animation.md` §20) |
| 09 | Story | `Heading`, `Text`, `Card` | Mark construction animation (Tier 2) |
| 10 | Audience | `Text` | Image crossfade on label hover (Tier 3) |
| 11 | Insights | `ClickableCard` | — |
| 12 | Final CTA | `Button`, `Display` | Dark island + large mark |
| 13 | Footer | `Footer`, `Link` | — |

## The one place Silica does not cover the intent

`Steps` is a **state** tracker — you color the steps up to the current one. `animation.md` §15 wants a **scroll-linked construction line** that draws via `stroke-dashoffset` and activates each stage as it arrives.

The split: `Steps`/`Step` provide the semantic list and per-node activation (drive each `Step`'s `color` prop from a scroll-progress index). The continuous drafting line is a custom absolutely-positioned SVG overlay driven by `scroll-progress.tsx`. Do not try to bend `Steps`' own connectors into the drafting line.

---

# 7. Motion Layer

`animation.md` §36 is explicit: CSS for hover/focus/buttons/nav, IntersectionObserver for reveals, no large animation framework shipped just to fade sections in. Silica already owns every hover/focus transition through `--duration` and `--ease`.

That leaves three primitives to build:

**`reveal.tsx`** — IntersectionObserver at 15–25% threshold, fires once, applies `opacity 0→1` + `translateY 20px→0` over 550–700ms with `--ease-enter`. Accepts a stagger index. Caps at 4–5 staggered children.

**`scroll-progress.tsx`** — normalized 0→1 for a section's traversal, for the process line only. IntersectionObserver plus a rAF-throttled scroll listener; no scroll hijacking.

**`count-up.tsx`** — 700–1100ms, once, real numbers only, final value present in the accessible tree immediately (`aria-label` on the container, `aria-hidden` on the animating text).

All three must read `prefers-reduced-motion` in JS and render final state immediately — Silica's `--duration` override does not reach them. `animation.md` §37 puts reduced-motion in Tier 1, not polish.

Motion tokens live in `lib/motion.ts` and mirror `animation.md` §2–3 exactly.

**Motion budget (`animation.md` §39):** a visitor should remember two moments — the mark assembling, and the process line progressing. Everything else is polish. If a third section starts competing for attention, cut it.

---

# 8. Build Phases

## Phase 0 — Foundation · **complete**

Scaffolded Next.js 16.3.3 in `site/` with React 19, Tailwind v4.3.3, `@wizeworks/silicaui-react` 0.55.0. Both themes authored in `site/styles/theme.css`. Inter self-hosted via `next/font`. Verification harness at `/theme-check`.

**Exit — verified against computed styles in a browser, not by inspecting CSS:**

| Check | Result |
|---|---|
| `<Button color="primary">` on paper | `#1F1F1F` on `#F7F3EA` ✓ |
| Same button in `wizeworks-dark` island | `#F7F3EA` on `#151515` ✓ |
| Light island nested inside the dark one | back to `#F7F3EA` ✓ |
| Component-level CSS required | none — the island sets no background or text color ✓ |
| `--depth: 0` | all button shadows resolve at zero alpha ✓ |
| Product roles registered | `badge-*` / `btn-*` generated for all five ✓ |
| Inter applied | loaded and computed on `body` ✓ |
| Build | both routes prerender static ✓ |

### Finding — the theme plugin discards `var()` in a token value

`--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif` inside a
`@plugin "@wizeworks/silicaui/theme"` block compiles down to `--font-sans: sans-serif`.
The plugin keeps only the last comma-separated part, silently, with no build warning — the
page renders in the system fallback and looks plausible.

`--font-sans` therefore lives in `site/styles/globals.css` as a plain unlayered `:root`
rule, which beats Tailwind's layered `@theme` default and inherits into every theme island.
**Do not move it back into a theme block.** The same caution applies to any other token
whose value needs a `var()` reference.

## Phase 1 — Mark and motion primitives · **complete**

Mark traced and frozen in `site/components/mark/makers-mark.tsx`; favicon generated from the same geometry in `site/app/icon.svg`. Motion tokens in `site/lib/motion.ts`, primitives in `site/components/motion/`. Verification harness at `/mark-check`.

**Exit — verified in a browser:** the mark renders two-tone at 24 / 32 / 48 / 96 / 160px, inverts correctly inside a `wizeworks-dark` island with no props changed, and the one-colour variant works on both grounds.

### How the geometry was derived

`images/icon.png` is a 1254×1254 raster with an alpha channel — there is no vector master. It was decomposed into three connected components whose centroids sit at equal radius, 120° apart (measured 119.7° and 120.6°). **The brand's "one shape, repeated" claim is literally true in the source**, and it is now literally true in the markup: one `<path>` constant, rendered three times with `rotate(120)` / `rotate(240)`.

Every straight edge fits a line to within **0.35px**. A parametric model was fitted to the raster by intersection-over-union:

| Model | IoU |
|---|---|
| Free slopes (top 0.599, bottom 0.578 as measured) | 0.9747 |
| **Both slopes locked to exactly 30° (1/√3)** | **0.9754** |

Exact hexagonal regularity scores *higher* than matching the source's own measured slopes. The ~2.5% residual is antialiasing and rasterisation in the concept render. The mark is therefore drawn as exact hexagonal geometry — which is both the design intent (§4 forbids pieces differing in shape) and the closer fit.

Derived constants, all in `makers-mark.tsx`: half-width `44.72`, apex→notch `55.17`, outer corner radius `11.65`, notch radius `5.69` (deliberately tighter). Clear-space unit **X = 44.83** viewBox units, exported as `CLEAR_SPACE_UNIT` so layout derives §19 clear space rather than guessing.

> **Open:** the source is a raster concept render, not approved vector master artwork. `design.md` §4 asks for the master when production assets are made. If one exists it should replace this trace — the numbers above are re-derivable, so swapping is cheap.

### Motion primitives

`reveal` fires once at 20% visibility with a capped stagger; `scroll-progress` is rAF-throttled, passive, and only listens while its section is near the viewport; `count-up` keeps the final value in the accessible tree at all times.

Verified: `sr-only` reported `38%` / `5 products` while the visible text was still mid-count. Reduced motion is checked in one shared helper that all three import, plus a CSS rule for the mark assembly.

**Caveat:** reduced motion was verified by code path and by confirming the rules ship in both the CSS and the JS bundle. It was *not* verified by toggling the OS setting and re-observing — worth doing once by hand before launch.

## Phase 2 — Tier 1 sections · **complete**

Nav (+ mobile disclosure), Hero, Proof strip, Portfolio, Philosophy band, Process, Final CTA, Footer, plus five stub routes. 11 routes, all prerendered static.

**Exit — verified in a browser:** both signature motion moments work (the mark assembling, the process line progressing) and the page reads top to bottom.

Accessibility spot-check on the homepage: one `<h1>`, heading order with no skipped levels, working skip link, `<main>` landmark, `aria-label` on the nav, no image missing `alt`.

### Finding — `stroke-dashoffset` does not survive `non-scaling-stroke`

The process line was first built the way `animation.md` §15 suggests: an SVG line with `pathLength={1}`, `strokeDasharray={1}`, and `vectorEffect="non-scaling-stroke"`.

`vectorEffect` stops the browser normalising the dash array against `pathLength`, so `strokeDasharray: 1` computes to a literal **`1px`**. The result is a full-width 1px *dotted* rule that never shows progress — and it looks close enough to a drawn line at a glance to pass a casual review. Caught by reading the computed style, not by looking.

Replaced with a `scaleX`-transformed element: no dash maths, no such failure mode, and it animates on `transform`, which §35 prefers anyway. §15 says the line *can* use `stroke-dashoffset`; it does not require it.

### Finding — the `neutral` role fails on paper

Recomputing the palette turned up a second contrast problem beyond the known taupe one: `#8E8981` on `#F7F3EA` is **3.14:1**. Fine for large text, borders, and muted labels; not usable for body copy. Full table in §10.1.

### Revision — banned elements and a closed type scale

The owner banned **eyebrows** and **"editorial" as a design direction**, and
closed the type scale to named steps only with a hard 14px floor and a 16px
body default. The specs mandated the opposite in three places, so they were
updated too: `design.md` §11 is a new closed scale, `landing.md` §4 no longer
specifies a hero eyebrow, and `landing.md` §24a is a new standing rule.

What changed in the build:

- The hero eyebrow ("A product studio & parent company") became the first
  sentence of the supporting copy — the information was worth keeping, the label
  was not.
- "Made by WizeWorks" and the footer column headings were uppercase tracked
  11px labels; they are now real headings at real sizes.
- Every hand-written `clamp()` heading became `display-1` / `display-2` /
  `display-3`. Every 10–12px label became `text-sm` (14px) at minimum.
- The `Wordmark` computed `fontSize: size * 0.72` inline; it now offers two
  fixed steps.
- The philosophy section's 01–04 numbering was removed — four parallel
  principles are not a sequence, so the numbers were decoration. The process
  stages keep theirs, because those genuinely are ordered.

**Verified by measuring the rendered page, not by grepping source.** The final
ladder is 14 / 16 / 18 / 20 / 24 / 48 / 60 / 72px with zero values below 14.

That measurement caught something a source audit could not: the header CTA was
rendering at **12px** because Silica's `btn-sm` sets its own font size inside the
library's CSS. See the component-size table in `design.md` §11.

### Follow-through — spacing had to move with the type

Raising font sizes without touching spacing makes a layout **more** dense, not
less: the elements sit just as close together and now hold bigger text. Density
is spacing, not type size (`design.md` §12a), so every container whose type went
up got its padding, gap, and margins raised to match.

| Where | Before → after |
|---|---|
| Hero content stack | `gap-8` → `gap-10`, section `py-24` → `py-28` (`md:py-32` → `md:py-36`) |
| Proof-strip cards | `px-4 py-4 gap-3` → `px-5 py-5 gap-4` |
| Portfolio feature cards | `p-7 gap-6` → `p-8 gap-7` |
| Portfolio supporting cards | `p-6 gap-4` → `p-7 gap-5` |
| Philosophy principles | `gap-2 pt-5` → `gap-3 pt-6`, grid `gap-y-9` → `gap-y-12` |
| Process stages | grid `gap-8` → `gap-10` |
| Footer | link `gap-2` → `gap-2.5`, columns `gap-10` → `gap-12` |

Verified after the change: no element overflows, no horizontal scroll, feature
cards resolve to 32px padding and 28px gap.

**Mobile note.** The window-resize tool reported success but the viewport did
not change, so the narrow-screen layout was NOT verified by rendering. Measured
instead: at `display-1`'s 40px floor the widest headline line ("things that") is
214px against 272px available at a 320px viewport — it fits with room to spare,
and body copy runs ~31 characters per line. Worth confirming on a real device
before launch.

### Decisions taken

- **Hero emphasis is charcoal**, per §10.1. Isolated behind a single `EMPHASIS` constant in `hero.tsx` — reversing it to taupe is a one-word edit.
- **Product copy is drafted, not final.** `lib/products.ts` carries a `draft` flag; only Piggles' line is quoted from the specs. The rest were written from the category hints in `design.md` §30 and need the owner's sign-off.
- **Screenshot wells are deliberately empty**, labelled "Interface pending". §6 wants real product interfaces, and inventing UI to fill the space is exactly what §19 rules out.
- **Primary actions use `size="lg"`** (16px). `sm` and `xs` are banned outright.
- **Silica components were used sparingly.** The package is `"use client"`, so the sections use `buttonClasses()` from `/server` plus plain markup. The only client islands are the mobile nav, the reveal wrappers, and the process line.

## Phase 3 — Proof sections · **partially complete**

Of the five, two needed nothing external and are built. Three are content-gated
and stay out until the material exists.

| Section | State |
|---|---|
| 08 — WizeWorks story | **built** — from `landing.md` §11 and the mark principles in `design.md` §26 |
| 09 — Who we build for | **built** — the audience list is `landing.md` §12's own wording |
| 06 — Selected work / results | **gated** — needs real case studies and truthful metrics |
| 07 — Social proof | **gated** — needs real, attributable testimonials |
| 10 — Insights | **gated** — needs three real posts |

The three gated sections are absent from `app/page.tsx`, with a comment saying
why, so their absence reads as a decision rather than an oversight. `landing.md`
§9 and §25 forbid inventing any of their inputs; a section with nothing true to
say would undermine the credibility the rest of the page is building.

Two notes on what was built:

- **Both sections carry real photography.** An earlier pass left them
  typographic on the reading that "avoid generic boardroom stock" ruled out
  open-licensed imagery. That was wrong: the spec bans a *genre*, not a sourcing
  method, and `design.md` §22 names exactly what it wants — people building,
  workshops, tools, materials. Both docs have been corrected.

  Two **CC0 1.0** photographs are now in `site/public/photos/`, with provenance
  in `CREDITS.md`: a hand-tool wall in the story section, and a potter at the
  wheel beside the audience list. CC0 means commercial use with no attribution
  obligation and no share-alike.

  The audience section uses **one** photograph, per `animation.md` §24, which
  warns against giving every category its own image. §24's hover crossfade
  becomes available if per-category photographs are ever added.

  **Sourcing lesson worth keeping:** a third candidate was labelled CC0 in the
  API and arrived with a repeating vendor watermark across the frame. Every
  image was opened and inspected before use. Do not trust image metadata —
  look at the file.
- **The audience list started as an inline run separated by slashes.** A
  wrapping inline list strands its separator at the end of a line whenever the
  break lands mid-list, which happened at ordinary widths. Rebuilt as columns
  with a hairline per entry, which removes the failure mode rather than tuning
  around it.

Verified with both new sections in place: font ladder still 14 / 16 / 18 / 20 /
24 / 48 / 60 / 72 with nothing below the floor, no overflow, no horizontal
scroll, one `<h1>`, heading order intact.

## Phase 4 — Polish and verification · **mostly complete**

**Cleanup done.** `/theme-check`, `/mark-check` and the 400KB `mark-source.png`
are gone; the production build is 8 routes, all static, and no longer ships a
development page. (Deleting the routes leaves stale entries in
`.next/types/validator.ts` — `rm -rf .next` before the next typecheck.)

### Product colour introduction — `animation.md` §12

Now possible, because the brand colours are real. Each card carries a short
colour rule and its border tints toward the product colour on hover. Contained
to the card: nothing outside one references a product colour, and the mark never
does.

**Colour is never used for text here.** Measured on the paper ground:

| Product | On paper | AA normal | AA large |
|---|---|---|---|
| Piggles `#FF7C91` | 2.22:1 | fail | fail |
| jotacular `#00C2A8` | 2.04:1 | fail | fail |
| sparx `#E04631` | 3.73:1 | fail | pass |
| kanNINJA `#E0432F` | 3.78:1 | fail | pass |

All four fail AA for normal text and two fail it for large text. The colour lives
in a rule and a border tint, where no contrast floor applies; every label stays
charcoal.

### Accessibility

Audited on the built page: no image missing `alt`, no link or button without an
accessible name, no skipped heading levels, one `<h1>`, all four landmarks
present, no list with non-`<li>` children, no horizontal scroll, font ladder
still 14/16/18/20/24/48/60/72 with nothing below the floor.

**Focus ring added.** Silica rings its own components (65 `:focus-visible`
rules) but not a plain anchor — and most links here are plain anchors. A
zero-specificity `:where(...)` rule in `globals.css` now fills the gap, reading
Silica's own focus tokens so the ring matches the component library.

### Measurement — `landing.md` §26

Events are wired and verified firing: `hero_explore_products`, `hero_view_work`,
`nav_lets_build`, `product_card_click` (with product + placement),
`story_about_click`, `final_cta_click`, `scroll_depth` (25/50/75/100).

**No analytics provider is installed, deliberately.** Choosing one is a privacy
decision — cookies, a consent banner, whose servers see the visitors — and it
belongs to the owner. `lib/analytics.ts` ships the events behind a seam any
provider attaches to in one line. Verified: **zero third-party hosts** contacted,
no cookie set, nothing to consent to.

### Performance

CLS **0** (measured twice), TTFB 9–13ms local, 10 requests, ~100KB transferred,
every image lazy-loaded through `next/image`.

**Not verified:** LCP and FCP were not obtainable in this context, and local
timings would not represent production regardless. Real Core Web Vitals need a
deployed build plus field data.

### Still owed — needs a human

- Toggle `prefers-reduced-motion` at the OS level and re-observe all three
  primitives, plus the mark assembly and hero entrance.
- Tab through the page by hand. Synthetic key events did not move focus in
  automation, so the new ring is verified in the stylesheet but not on screen.
- Check the narrow-screen layout on a real device.
- Draw the sub-24px small-size master (`design.md` §20).

---

# 9. Definition of Done

- [ ] Every color comes from a theme token; no literal hex in any component
- [ ] Dark sections are `data-theme` islands, not `dark:` variants
- [ ] Mark geometry identical across every usage, and never product-colored
- [ ] `prefers-reduced-motion` verified on all three motion primitives, not just Silica's
- [ ] Keyboard path through the whole page; visible focus everywhere
- [ ] WCAG AA on all text (see the taupe finding in §10)
- [ ] No invented metrics, testimonials, or logos
- [ ] Semantic heading order, one `<h1>`
- [ ] Core Web Vitals green on mobile
- [ ] Analytics events from `landing.md` §26 firing

---

# 10. Open Questions — Answer Before The Phase That Needs Them

## 10.1 Warm taupe fails contrast on paper — blocks Phase 2

`landing.md` §4 sets the hero headline as **We make things that work.** with `work.` in warm taupe. Measured against the paper background:

| Pair | Ratio | AA normal (4.5:1) | AA large (3:1) |
|---|---|---|---|
| `#A69D90` on `#F7F3EA` | **2.42:1** | fail | **fail** |
| `#A69D90` on `#1F1F1F` | 6.16:1 | pass | pass |
| `#1F1F1F` on `#F7F3EA` | 14.88:1 | pass | pass |
| `#A69D90` on `#151515` (dark island) | 6.82:1 | pass | pass |
| `#8E8981` on `#F7F3EA` (`neutral`) | 3.14:1 | **fail** | pass |

`design.md` §24 requires WCAG-compliant contrast, so the spec conflicts with itself. Taupe is sound as a *material* — the third mark unit, dividers, borders, text inside a dark island (6.82:1 against the near-black ground) — but not as ink on paper at any size.

The same table turned up a second one: the `neutral` role `#8E8981` reaches only **3.14:1** on paper. It is fine for large text, borders and muted labels, and must not be used for body copy.

Options: darken taupe for text use only; render `work.` in charcoal and let the mark carry the two-tone story; or accept the failure as a deliberate exception on decorative display type. **Recommend the second** — it costs nothing, and the mark already makes the point.

## 10.2 Content gates on Phase 3

**Roster change:** HelpNinja is out; **kanNINJA** (kanninja.com) is in. Product
names are styled, not merely capitalised — `AGCONN` all caps, `jotacular` all
lowercase, `kanNINJA` with internal capitals. Never title-case them and never
let `text-transform` decide.

### Read from production

Four of five products were read from their own live sites, so their copy,
colour and interface capture are all sourced rather than drafted:

| Product | Domain | Brand colour | Capture |
|---|---|---|---|
| Piggles | mypiggles.com | `#FF7C91` | signed-in app — workspace home |
| sparx | sparx.works | `#E04631` | module picker, "3 of 14 on" |
| kanNINJA | kanninja.com | `#E0432F` | board view |
| jotacular | jotacular.com | `#00C2A8` | note canvas |

Every card in the portfolio now carries a real interface. A product without a
capture renders a labelled "Interface pending" well rather than a stand-in, and
the two feature slots auto-promote products that HAVE one — so the section
re-sorts itself as captures land.

### ⚠ Two product brands share the same red

`sparx #E04631` and `kanNINJA #E0432F` are three units apart — visually the same
colour. That weakens the portfolio's core device: WizeWorks stays neutral so
each product can bring its own colour (`design.md` §7). With two of five
indistinguishable, the device does less work. **Flagged for the brand owner, not
resolved here** — changing a product's brand colour is not a website decision.

### Still blocked

| Product | Blocker |
|---|---|
| **AGCONN** | **agconn.com is DOWN** — Cloudflare Error 1000, "DNS points to prohibited IP". Owner is on it. No capture, no sampled colour, copy still `draft: true`. |

### Capture notes

- `sparx.works` runs a continuous animation loop that blocks script injection —
  screenshots time out repeatedly. A **fresh tab** clears it. Same fix applied
  when the extension degraded mid-session.
- The Piggles capture is cropped to drop an account-state nag ("Nearly full —
  you are close to the websites your plan includes"), which is unflattering and
  irrelevant to the pitch.

### Screenshots — and a privacy limit

`landing.md` §6 wants real product interface. kanNINJA and jotacular now carry
real captures; the portfolio automatically promotes products that HAVE a capture
into the two feature slots, so it re-sorts itself as more land.

**The kanNINJA production dashboard must not be screenshotted as-is.** It lists
third-party client names and project details — McZeek Group, Gillett Diesel,
mczeekgroup.com — plus grant deadlines and the owner's personal email. Those are
other people's businesses and they have not agreed to appear on WizeWorks'
marketing site. Capture the WizeWorks' own internal board instead, or a seeded
demo workspace. This is a consent question, not an ownership question: the apps
are unambiguously WizeWorks', the client names on them are not.
- **Metrics.** `landing.md` §9 forbids invented numbers. If none are real yet, §07 ships qualitative and the count-up primitive goes unused in v1.
- **Testimonials.** Same rule. If none exist, cut §08 rather than fill it.
- **Insights posts.** Three real items, or cut §11 and drop it from the nav.

## 10.3 Smaller decisions

- Contact form backend — route handler plus email, or a form service?
- Serif accent face for heritage/editorial moments (`design.md` §10) — needed only if §09 uses one
- Hosting target and domain
- Does `site/` get `git init`, or does this repo stay untracked?

---

# 10a. Phase 5 — The Rest of the Site · **complete**

The homepage was v1's scope; these were stubs. They are now real pages.

## A live bug this fixed

Every product card on the homepage and the portfolio linked to
`/products/<slug>` — and **all five 404'd**. The links had existed since Phase 2;
the routes never had. Now generated from `PRODUCTS` via `generateStaticParams`,
so a product added to the data gets a page automatically.

## What was built

| Route | State |
|---|---|
| `/products` | Real index — alternating rows, each product's interface, and the points its own site makes |
| `/products/[slug]` | Five detail pages — **full articles**, ~2,300–2,600 words each |
| `/about` | Why the company exists, the mark explained, the six principles, the brand architecture |
| `/contact` | The four-field form from §18, plus a validating API route |
| `/work` | Honest holding page — gated on real case studies |
| `/insights` | Honest holding page — gated on real posts |

`PageShell` now owns the skip link, nav, `<main>` landmark and title block for
every page below the homepage, so no page can forget them.

## The product articles are researched, not written

Each detail page is a real article rather than a card with more padding. The
material was read off each product's own live site — kanninja.com/features and
/pricing, meetpiggles.com, sparx.works/features, jotacular.com — and lives in
`lib/product-articles.ts`, kept separate so the homepage and footer never pay
for it.

| Product | Words | Sourced from |
|---|---|---|
| kanNINJA | ~2,600 | 28 features across four disciplines, the MCP/42-tools model, $12/seat |
| Piggles | ~2,370 | the "ordinary Thursday" narrative, fifteen apps, $99/mo, 14-day trial |
| jotacular | ~2,320 | four capture modes, the MCP setup, the never-grow-into list |
| sparx | ~2,230 | twelve modules with real prices, 333 features (281 live) |
| AGCONN | ~2,510 | three-role model, FLC/grower verification, SMS-first signup, WIOA reporting |

**Every number is quoted, none estimated.** Module prices, seat prices, feature
counts and trial lengths all came off the live sites in August 2026. Each
pricing block carries a line telling the reader to check the product's own site
for the current figure, because these WILL drift. If a figure here disagrees
with the product, the product is right and this is stale.

# 10b. The Remaining Pages · **complete**

`/brand`, `/careers`, `/privacy` and `/terms` were all linked from the footer
and all **404'd** — the same shape of bug as the product detail routes. The site
now has no broken internal link: every `href` on every page was crawled and
returns 200.

## Press & brand

The public short form of `design.md`: the mark in three treatments, clear space
(quoting **X** from `CLEAR_SPACE_UNIT`, imported from the mark component so it
cannot drift from the geometry it describes), minimum sizes, the palette table,
do / don't, and how to write the product names.

**Three downloadable SVGs** generated from the canonical path data —
`public/brand/wizeworks-mark-{twotone,charcoal,white}.svg`.

## Careers — nothing open, said plainly

Deliberately **not invented**: headcount, funding, offices, remote policy,
benefits, salary bands, or a values section. None of it is in the specs, and a
careers page is where a fabricated detail does real harm — somebody might apply
because of it.

What the page does carry is derivable: how the work is structured, what the
portfolio actually is, and an honest route for a speculative message.

## ⚠ Privacy and Terms are NOT legally reviewed

**Have a lawyer read both before launch.** Each file says so at the top.

What they are: an accurate description of what this site actually does, checked
against the running site rather than assumed — no analytics provider, no cookies
set, zero third-party hosts, fonts self-hosted, four contact fields, delivery
currently unconfigured so submissions are rejected rather than stored.

What they are not: advice on which jurisdictions apply, whether GDPR or CCPA
obligations are triggered, or a governing-law clause. Terms deliberately omits
limitation-of-liability language rather than copying a template that may not
hold where it matters.

**Both carry a `LAST_UPDATED` constant, not a generated date.** If what the site
collects changes, the privacy page must change in the same commit — a policy
describing a previous version of the software is worse than none, because it is
a statement that has become untrue.

Terms covers **this website only**. Each product has its own account
relationship and its own terms; conflating them would create an obligation
WizeWorks did not intend.

---

## Decision — Piggles' free tools are showcased, not rebuilt

meetpiggles.com/tools hosts seventeen free small-business tools. The question
was whether WizeWorks should host its own versions.

**It should not**, and the reasoning is worth keeping because it will come up
again with the next product that has a lead magnet:

1. **They are Piggles' funnel.** The page says so outright — "The tools are
   free. The business software is $99." A WizeWorks copy of the QR generator
   would split that traffic and compete with Piggles for the same search terms,
   across two domains the same company owns.
2. **It contradicts the brand architecture.** `design.md` §1 — WizeWorks must
   not visually compete with its products; §31 — WizeWorks is the maker, each
   product is its own brand. A tools suite turns the parent into a competitor of
   its own child. `landing.md` §25 also rules out "every possible service
   WizeWorks can perform".
3. **Credibility comes from the portfolio, not utilities.** §17 — the products
   are the trust asset. A favicon generator does not convince anyone WizeWorks
   can build AGCONN.

**What was built instead:** a section inside the Piggles article describing the
tools, quoting Piggles' own reason for giving them away, and linking out to
meetpiggles.com/tools. `ArticleSection` gained an optional `link` for this.

There is deliberately **no `/tools` route on this site** — verified 404.

### Observation for the product owner, not the site

That toolset serves two different audiences. `invoice`, `quote`,
`margin-calculator`, `barcode` and `digital-card` are small-business tools and
belong with Piggles. But `contrast-checker`, `color-palette`, `favicon`,
`og-image`, `meta-tags` and `structured-data` are **developer and design
tools** — six of seventeen — which convert better from **SilicaUI's** audience
than from a bakery's. Worth considering whether those six are on the right
product's funnel. Not a website decision.

---

## SilicaUI added — the sixth product

silicaui.com researched and built into the portfolio: brand colour `#00A0B9`
sampled from its `--color-accent` token (`oklch(64% .13 211)`, resolved through a
canvas because the site ships OKLCH), a hero capture, and a full article.

**116 components across 13 packages**, open source, built on Base UI and
Tailwind v4, shipping in three synchronized layers — React, framework-neutral
HTML, and a zero-dependency vanilla runtime.

The article closes on the thing only WizeWorks can honestly say: **this site is
a SilicaUI application.** The WizeWorks palette is one declared theme, and the
dark bands are the same components under a nested theme attribute, with no
`dark:` variants anywhere. That is a stronger endorsement than any adjective.

### ⚠ silicaui.com is mostly unreachable

Only the homepage loads. `/about` and `/docs` return **301 to
`http://silicaui.com:8080/…`** — port 8080, unreachable, and downgrading HTTPS
to HTTP on the way. `/components` returns **404**, despite the homepage
promising "every one has a live page".

**This is the same class of bug as agconn.com**, which was redirecting its root
to `:3000`. Two sites, two internal ports leaking into production redirects —
likely the same deployment template. Worth fixing together.

The portfolio links to `https://silicaui.com`, the one URL that works.

### Counts are now derived

Adding a sixth product surfaced hard-coded "five" in four places. The proof
strip and the product-detail footer now read `PRODUCTS.length`, so the next
product cannot leave a stale number on the page.

---

## AGCONN — live as of 27 Aug 2026, with two caveats

The site came back and AGCONN is now fully sourced: brand colour `#5B6E2E`
sampled from its own CTA, a real interface capture, and a ~2,510-word article.
All five products are now complete.

### ⚠ agconn.com's root redirect is broken

`https://agconn.com` returns a **307 to `https://agconn.com:3000/es`** — a
redirect to port 3000, the Next.js dev default. That port does not answer, so
every visitor arriving at the bare domain lands on a dead URL.

`https://agconn.com/es` and `/en` both serve correctly on 443. The site works;
the redirect is pointing at a development port. **This is a live production
bug** and is unrelated to the WizeWorks build — the portfolio links to
`/en` to route around it, which is a workaround, not a fix.

### ⚠ AGCONN is pre-launch, and its article is written to say so

Its own impact panel reads **"Coming soon"** for workers placed, median wage at
hire and trainings completed. It lists **2 verified employers** and **1 active
posting**, from "Demo Farm Labor Co". The "142 results" and per-county counts in
its hero are interface mockup, not inventory.

So the article describes what AGCONN **does** — the three-role design, the
FLC/grower verification checked nightly against the federal DOL list, SMS-first
signup, WIOA-aligned exports — and claims **nothing** about volume or outcomes.

Quoting an aspirational figure off a product's own marketing onto the parent
company's portfolio would launder it into a fact, which is exactly what
`landing.md` §9 exists to prevent. Do not add placement counts, wage medians or
testimonials to AGCONN's article until AGCONN publishes real ones.

## Nothing invented on /about

No team size, founding date, headcount or origin story — none of that is in the
specs. The page is built from `design.md` §26 (the six principles, verbatim),
§3 (what the mark means) and §31 (brand architecture). A fabricated history is
the fastest way to lose the credibility the rest of the site is building.

## The contact form fails loudly, on purpose

Delivery is **not** configured — choosing a provider means choosing cookies, a
sending domain, and possibly a DPA, which is the owner's decision. So
`/api/contact` validates properly and then returns **503** with a clear message
the form shows the visitor.

The failure mode deliberately avoided: a form that accepts a submission, says
"thanks", and drops it. A visitor who believes they made contact and did not is
worse off than one who is told to write elsewhere.

Verified: empty body → 400, bad email → 400, honeypot filled → 200 (so a bot
learns nothing), valid submission → 503.

**To switch it on:** set `CONTACT_TO` and `CONTACT_EMAIL`, then implement
`deliver()` in `app/api/contact/route.ts`. Nothing in the form changes.

## Verified

All twelve routes 200 (and `/nope` 404s). On every new page: one `<h1>`, no
skipped heading levels, no image without `alt`, no unnamed interactive element,
no horizontal scroll, font ladder within the closed scale. On `/contact`: every
control labelled, honeypot hidden from assistive technology and out of the tab
order.

---

# 11. Explicit Non-Goals For v1

- Site-wide dark mode toggle (the theme is ready; the control is not in scope)
- CMS or MDX pipeline
- Per-product detail pages
- WebGL or 3D hero (`landing.md` §22: don't ship a heavy scene if a rendered asset works)
- Internationalization
- Anything in `animation.md` Tier 3
