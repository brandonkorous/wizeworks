import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/page-shell";
import {
  MakersMark,
  MakersMarkMono,
  CLEAR_SPACE_UNIT,
} from "@/components/mark/makers-mark";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Press & brand",
  description:
    "The WizeWorks maker's mark, palette, and the rules for using them. Downloadable assets included.",
};

/**
 * Press & brand. docs/landing.md §15 lists it under Resources.
 *
 * This is the public, short form of docs/design.md — the parts someone outside
 * WizeWorks needs in order to use the mark correctly. The rules here are quoted
 * from the spec rather than restated loosely: §4 (geometry is locked), §5 and
 * §6 (palette), §19 (clear space), §20 (minimum sizes), §27 and §28 (do / do
 * not).
 *
 * The clear-space unit is imported from the mark component rather than written
 * down again, so it cannot drift from the geometry it describes.
 */

/** docs/design.md §5, §6 — the canonical values. */
const PALETTE = [
  { name: "Deep Charcoal", hex: "#1F1F1F", swatch: "bg-primary", use: "Wordmark, two mark units, body text, dark surfaces" },
  { name: "Warm Taupe", hex: "#A69D90", swatch: "bg-accent", use: "The third mark unit, dividers, restrained accents" },
  { name: "Paper", hex: "#F7F3EA", swatch: "bg-base-100", use: "Warm page backgrounds, premium print" },
  { name: "Soft Neutral", hex: "#F2EEE7", swatch: "bg-base-200", use: "Alternating sections, subtle cards" },
  { name: "Light Warm Gray", hex: "#DDD8D0", swatch: "bg-base-300", use: "Borders, dividers, disabled states" },
  { name: "Graphite", hex: "#62605C", swatch: "bg-secondary", use: "Secondary text" },
  { name: "Muted Warm Gray", hex: "#8E8981", swatch: "bg-neutral", use: "Large text and labels only — 3.14:1 on paper" },
  { name: "Near Black", hex: "#151515", swatch: "bg-[#151515]", use: "Dark surfaces" },
] as const;

const DOWNLOADS = [
  { file: "wizeworks-mark-twotone.svg", label: "Two-tone mark", note: "The primary identity. Use this wherever colour allows." },
  { file: "wizeworks-mark-charcoal.svg", label: "One-colour, charcoal", note: "Production alternative — embroidery, deboss, etching." },
  { file: "wizeworks-mark-white.svg", label: "One-colour, white", note: "For dark grounds where contrast is limited." },
] as const;

/** docs/design.md §27 and §28, trimmed to what an outside user needs. */
const DO = [
  "Use the approved mark exactly as supplied",
  "Prefer the two-tone version",
  "Give it generous clear space",
  "Treat it like a signature, not a decoration",
] as const;

const DONT = [
  "Redraw the pieces or change the corner rounding",
  "Rotate the pieces independently, or alter the centre opening",
  "Recolour the mark with a product's brand colour",
  "Add gradients, outlines, or shadows",
  "Turn it into a W, or place a W inside it",
  "Stretch, compress, or skew it",
] as const;

export default function BrandPage() {
  return (
    <PageShell
      title="Press &amp; brand"
      intro="The WizeWorks maker's mark, the palette around it, and the rules that keep it recognisable. If you are writing about WizeWorks or placing the mark beside one of our products, everything you need is here."
    >
      <div className="mx-auto grid max-w-6xl gap-24 px-6 py-20">
        {/* ---- the mark ---- */}
        <Reveal>
          <section aria-labelledby="mark-heading" className="grid gap-10">
            <div className="grid max-w-[58ch] gap-4">
              <h2 id="mark-heading" className="display-3">
                One shape. Repeated.
              </h2>
              <p className="text-base-content/80">
                The mark is built from a single geometric unit, repeated three
                times around an open centre. It contains no letters — it is not
                a W, and it is not initials. The geometry is fixed; only its
                size and placement are yours to choose.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="grid justify-items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-10">
                <MakersMark size={120} title="Two-tone mark on paper" />
                <span className="text-sm text-base-content/60">
                  Two-tone, on paper
                </span>
              </div>
              <div
                data-theme="wizeworks-dark"
                className="grid justify-items-center gap-4 rounded-lg border border-base-300 p-10"
              >
                <MakersMark size={120} title="Two-tone mark on a dark ground" />
                <span className="text-sm text-base-content/60">
                  Two-tone, on dark
                </span>
              </div>
              <div className="grid justify-items-center gap-4 rounded-lg border border-base-300 bg-base-100 p-10">
                <MakersMarkMono size={120} className="text-primary" title="One-colour mark" />
                <span className="text-sm text-base-content/60">
                  One colour
                </span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ---- downloads ---- */}
        <Reveal>
          <section aria-labelledby="dl-heading" className="grid gap-6">
            <h2 id="dl-heading" className="text-2xl font-semibold tracking-tight">
              Download the mark
            </h2>
            <p className="max-w-[58ch] text-base-content/75">
              SVG, so it stays sharp at any size and can be recoloured for
              one-colour production without redrawing anything.
            </p>
            <ul className="grid gap-4 sm:grid-cols-3">
              {DOWNLOADS.map((d) => (
                <li key={d.file}>
                  <a
                    href={`/brand/${d.file}`}
                    download
                    className="group flex h-full flex-col gap-2 rounded-lg border border-base-300 bg-base-100 p-6 transition-colors duration-300 hover:border-base-content/25"
                  >
                    <span className="text-lg font-semibold tracking-tight">
                      {d.label}
                    </span>
                    <span className="text-sm text-base-content/65">{d.note}</span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-3 font-medium">
                      SVG
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ---- clear space + minimum size ---- */}
        <Reveal>
          <section aria-labelledby="space-heading" className="grid gap-8 md:grid-cols-2 md:gap-14">
            <div className="grid gap-4">
              <h2 id="space-heading" className="text-2xl font-semibold tracking-tight">
                Clear space
              </h2>
              <p className="max-w-[52ch] text-base-content/80">
                The unit is <strong>X</strong> — the width of the opening at the
                centre of the mark, which is {CLEAR_SPACE_UNIT.toFixed(1)} units
                in the mark&rsquo;s own {200}-unit grid. Keep at least{" "}
                <strong>1X</strong> clear on every side. More is better; less is
                not permitted.
              </p>
            </div>
            <div className="grid gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Minimum size
              </h2>
              <ul className="grid gap-3 text-base-content/80">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  Digital: 24px minimum, 32px or larger preferred
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  Print: 6mm minimum
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  Embroidery: test with the vendor and stitch method — never size
                  from a screen measurement
                </li>
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ---- palette ---- */}
        <Reveal>
          <section aria-labelledby="palette-heading" className="grid gap-6">
            <div className="grid max-w-[58ch] gap-3">
              <h2 id="palette-heading" className="text-2xl font-semibold tracking-tight">
                Palette
              </h2>
              <p className="text-base-content/75">
                WizeWorks is intentionally almost achromatic. Colour belongs to
                the products; the parent company is the surface they sit on.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="py-3 pr-4 text-sm font-semibold">Colour</th>
                    <th className="py-3 pr-4 text-sm font-semibold">Hex</th>
                    <th className="py-3 text-sm font-semibold">Used for</th>
                  </tr>
                </thead>
                <tbody>
                  {PALETTE.map((c) => (
                    <tr key={c.hex} className="border-b border-base-300/60">
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`inline-block size-5 shrink-0 rounded border border-base-300 ${c.swatch}`}
                          />
                          {c.name}
                        </span>
                      </td>
                      <td className="py-3 pr-4 tabular-nums text-base-content/75">
                        {c.hex}
                      </td>
                      <td className="py-3 text-base-content/75">{c.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Reveal>

        {/* ---- do / do not ---- */}
        <Reveal>
          <section aria-labelledby="rules-heading" className="grid gap-8 md:grid-cols-2 md:gap-14">
            <div className="grid gap-4">
              <h2 id="rules-heading" className="text-2xl font-semibold tracking-tight">
                Please do
              </h2>
              <ul className="grid gap-3 text-base-content/80">
                {DO.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="text-base-content/35">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Please don&rsquo;t
              </h2>
              <ul className="grid gap-3 text-base-content/80">
                {DONT.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden="true" className="text-base-content/35">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* ---- naming ---- */}
        <Reveal>
          <section
            aria-labelledby="naming-heading"
            className="grid gap-4 rounded-lg border border-base-300 bg-base-200 p-10"
          >
            <h2 id="naming-heading" className="text-2xl font-semibold tracking-tight">
              Writing the names
            </h2>
            <p className="max-w-[58ch] text-base-content/80">
              The company is <strong>WizeWorks</strong> — one word, capital W and
              capital W. Product names are styled rather than merely
              capitalised: <strong>AGCONN</strong> is all caps,{" "}
              <strong>jotacular</strong> and <strong>sparx</strong> are all
              lowercase, <strong>kanNINJA</strong> carries internal capitals, and{" "}
              <strong>SilicaUI</strong> and <strong>Piggles</strong> are written
              as shown. Please don&rsquo;t title-case them.
            </p>
            <p className="max-w-[58ch] text-base-content/80">
              The attribution phrase is <strong>Made by WizeWorks</strong>.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center gap-5 border-t border-base-300 pt-12">
            <Link href="/contact" className="font-medium underline-offset-4 hover:underline">
              Press enquiries →
            </Link>
            <Link href="/about" className="text-base-content/70 underline-offset-4 hover:text-base-content hover:underline">
              What the mark means →
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
