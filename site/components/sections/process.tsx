import { Reveal } from "@/components/motion/reveal";
import { ProcessTrack } from "./process-track";

/**
 * Section 06 — How we work. docs/landing.md §8.
 *
 * Four stages: Strategy → Design → Systems → Launch. The four-stage sequence is
 * canonical (docs/design.md §13); post-launch improvement lives inside Launch
 * rather than as a fifth terminal stage.
 *
 * This carries the page's second signature motion moment (animation.md §39) —
 * a construction line that progresses as the section is scrolled. The line
 * itself is a client island; everything around it renders on the server.
 *
 * The "How we work" eyebrow was removed. What it said is now a sentence under
 * the heading, where a person reads it rather than decoding a label.
 */

export const STAGES = [
  {
    n: "01",
    title: "Strategy",
    body: "Start with the people, problem, constraints, and opportunity.",
  },
  {
    n: "02",
    title: "Design",
    body: "Turn the problem into a clear product direction.",
  },
  {
    n: "03",
    title: "Systems",
    body: "Design and engineer the thing that has to keep working after everyone stops paying attention.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Put it in front of real people, then keep making it better.",
  },
] as const;

export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="border-b border-base-300/60"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28">
        <Reveal>
          <div className="grid max-w-3xl gap-4">
            <h2 id="process-heading" className="display-3">
              Four stages, and none of them end at launch.
            </h2>
            <p className="lead text-base-content/75">
              How we work, from the first conversation to the version people are
              still using a year later.
            </p>
          </div>
        </Reveal>

        <ProcessTrack stages={STAGES} />
      </div>
    </section>
  );
}
