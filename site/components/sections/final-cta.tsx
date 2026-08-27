import { TrackLink } from "@/components/analytics/track-link";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { MakersMark } from "@/components/mark/makers-mark";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section 12 — Final CTA. docs/landing.md §14.
 *
 * The page arriving at a conclusion, not shouting. A dark band with the large
 * mark, one primary action, and expectation-setting microcopy that lowers the
 * pressure ("No pitch deck required.").
 *
 * Dark again by theme island. animation.md §26: calm reveal, no dramatic
 * animation — the CTA should feel confident, not aggressive.
 */
export function FinalCta() {
  return (
    <section data-theme="wizeworks-dark" aria-labelledby="cta-heading">
      <div className="mx-auto grid max-w-4xl justify-items-center gap-10 px-6 py-32 text-center md:py-36">
        <Reveal>
          <MakersMark size={64} />
        </Reveal>

        <Reveal index={1}>
          <h2 id="cta-heading" className="display-2 max-w-[20ch]">
            Let&rsquo;s build something worth using.
          </h2>
        </Reveal>

        <Reveal index={2}>
          <p className="lead max-w-[52ch] text-base-content/75">
            Have a problem worth solving, a product worth building, or a business
            that needs something better? We&rsquo;d like to hear about it.
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="grid justify-items-center gap-4">
            <TrackLink
              event="final_cta_click"
              href="/contact"
              className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
            >
              Start a conversation
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </TrackLink>
            <p className="text-sm text-base-content/60">
              No pitch deck required.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
