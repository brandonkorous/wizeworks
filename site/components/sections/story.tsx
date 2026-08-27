import Image from "next/image";
import { TrackLink } from "@/components/analytics/track-link";
import { MakersMark } from "@/components/mark/makers-mark";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 08 — The WizeWorks story. docs/landing.md §11.
 *
 * Visitors evaluating the company eventually ask who is behind all of this.
 * This humanises WizeWorks without turning the homepage into a biography.
 *
 * It is also the right place to explain the mark — not as logo-design trivia,
 * but as the philosophy it stands for (docs/design.md §26): a shared foundation
 * can create very different things, and what you leave room for matters as much
 * as what you build.
 *
 * animation.md §22: this is a slower, more human section. The pacing is
 * deliberately calmer than the portfolio and process — a single reveal, no
 * staggered cascade, and more space around everything.
 *
 * Nothing here is invented. The content is the brand's own stated principles.
 *
 * The photograph gives the section the material, physical texture design.md §16
 * asks for — a real workshop rather than a metaphor for one. CC0; see
 * public/photos/CREDITS.md.
 */
export function Story() {
  return (
    <section
      aria-labelledby="story-heading"
      className="border-b border-base-300/60 bg-base-200"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:grid-cols-[1fr_0.85fr] md:items-center md:gap-20 md:py-32">
        <Reveal>
          <div className="grid gap-8">
            <h2 id="story-heading" className="display-3 max-w-[20ch]">
              We build because we keep finding things that should work better.
            </h2>

            <div className="grid max-w-[54ch] gap-5 text-base-content/80">
              <p>
                WizeWorks exists because the same gap kept showing up in
                completely different places — a business running on software
                that fought it, a farm with no tool built for how the season
                actually works, a team drowning in the parts of the job nobody
                designed for.
              </p>
              <p>
                The industries have nothing in common. The problem underneath
                them does. So we build across all of them, on one shared
                foundation, and let each product become whatever its own people
                need it to be.
              </p>
            </div>

            <TrackLink
              event="story_about_click"
              href="/about"
              className="group inline-flex w-fit items-center gap-2 font-medium underline-offset-4 hover:underline"
            >
              About WizeWorks
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </TrackLink>
          </div>
        </Reveal>

        {/* The mark, explained. docs/design.md §26 — the principles, in the
            brand's own words, beside the thing they describe. */}
        <div className="grid gap-8">
          <Reveal index={1}>
            <Image
              src="/photos/workshop-tools.jpg"
              alt="A wall of hand tools in a woodworking shop, each in its place"
              width={960}
              height={640}
              sizes="(min-width: 768px) 42vw, 100vw"
              className="w-full rounded-lg border border-base-300 object-cover"
            />
          </Reveal>

          <Reveal index={2}>
          <figure className="grid justify-items-center gap-6 rounded-lg border border-base-300 bg-base-100 p-8">
            <MakersMark size={104} title="The WizeWorks maker's mark" />
            <figcaption className="grid gap-5 text-center">
              <p className="text-xl font-semibold tracking-tight">
                One shape. Repeated.
                <br />
                Three visible. One implied.
              </p>
              <p className="max-w-[34ch] text-base-content/75">
                A single foundation can create many things. What is present
                matters — and so does the space left for what comes next.
              </p>
            </figcaption>
          </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
