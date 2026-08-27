import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 09 — Who we build for. docs/landing.md §12.
 *
 * Helps visitors self-identify, and explains why the portfolio spans such
 * different industries on purpose. §12 asks for human terms rather than market
 * segments in corporate language — "founders", not "SMB decision-makers".
 *
 * ONE large photograph, per animation.md §24 — that section explicitly warns
 * against giving every audience category its own image or animation. The
 * photograph is CC0; see public/photos/CREDITS.md.
 *
 * §12 rules out "generic boardroom stock", which bans a genre, not open-licensed
 * sourcing. design.md §22 names what it does want — people building, workshops,
 * tools, materials — and this is that.
 *
 * Not a rotating carousel (§24), not an icon grid (design.md §12).
 */

const AUDIENCE = [
  "founders",
  "local businesses",
  "farmers",
  "creators",
  "operators",
  "service businesses",
  "teams building something new",
] as const;

export function Audience() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="border-b border-base-300/60"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28">
        <Reveal>
          <div className="grid max-w-3xl gap-4">
            <h2 id="audience-heading" className="display-3">
              Built for people doing real work.
            </h2>
            <p className="lead text-base-content/75">
              The products look nothing alike because the people using them
              don&rsquo;t either.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-16">
          <Reveal>
            <Image
              src="/photos/making-by-hand.jpg"
              alt="A potter shaping a form on the wheel, hands at the clay"
              width={960}
              height={540}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="w-full rounded-lg border border-base-300 object-cover"
            />
          </Reveal>

          <Reveal index={1}>
            {/* Columns rather than an inline run with separators. A wrapping
                inline list strands its separator at the end of a line whenever
                the break lands mid-list — a real artefact at several widths.
                Columns remove the failure mode instead of tuning around it. */}
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {AUDIENCE.map((a) => (
                <li
                  key={a}
                  className="border-t border-base-300 pt-4 text-2xl font-semibold tracking-tight"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
