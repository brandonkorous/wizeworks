import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms covering this website — what you may do with it, and what it does not promise.",
};

/**
 * ⚠️ NOT LEGALLY REVIEWED. HAVE A LAWYER READ THIS BEFORE LAUNCH.
 *
 * This is a plain-language starting point covering THIS WEBSITE ONLY — a
 * marketing site with no accounts, no payments, and no user content. That is a
 * genuinely small surface, which is why a short document is appropriate here.
 *
 * It deliberately does NOT attempt:
 *   • a governing-law or jurisdiction clause — that is a legal choice, not a
 *     drafting one, and guessing at it is worse than leaving it out
 *   • limitation-of-liability language, which varies by jurisdiction and is
 *     exactly the sort of clause that fails when copied from a template
 *   • anything about the PRODUCTS. Each has its own terms and its own account
 *     relationship; conflating them here would create an obligation WizeWorks
 *     did not intend.
 *
 * If this site ever gains accounts, payments, or user-submitted content, this
 * document is no longer sufficient and needs replacing rather than extending.
 */

/** Update whenever the substance changes. */
const LAST_UPDATED = "27 August 2026";

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section
        aria-labelledby={id}
        className="grid gap-5 border-t border-base-300 pt-10 md:grid-cols-[0.8fr_1.2fr] md:gap-14"
      >
        <h2 id={id} className="text-2xl font-semibold tracking-tight md:text-balance">
          {heading}
        </h2>
        <div className="grid max-w-[62ch] gap-4 text-base-content/80">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

export default function TermsPage() {
  return (
    <PageShell
      title="Terms"
      intro="This page covers the WizeWorks website. It is short because the site is simple — there are no accounts here, nothing to buy, and nothing for you to upload."
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20">
        <Reveal>
          <p className="text-sm text-base-content/60">
            Last updated {LAST_UPDATED}
          </p>
        </Reveal>

        <Section id="scope" heading="What this covers">
          <p>
            These terms apply to this website. They do not cover the products
            WizeWorks builds — Piggles, sparx, AGCONN, kanNINJA, jotacular and
            SilicaUI each have their own site, their own account relationship,
            and their own terms. If you use one of those, its terms govern, not
            these.
          </p>
        </Section>

        <Section id="use" heading="Using this site">
          <p>
            Read it, share it, link to it, quote it. You do not need permission
            to write about WizeWorks or to link here.
          </p>
          <p>
            Please do not attempt to disrupt the site or gain access to parts of
            it that are not published — the ordinary, boring version of this
            request, which almost everyone was going to honour anyway.
          </p>
        </Section>

        <Section id="content" heading="The words and pictures">
          <p>
            The text, layout and photography on this site belong to WizeWorks
            unless stated otherwise. Photography used under a public-domain
            dedication is credited in the site&rsquo;s own source.
          </p>
          <p>
            Quoting a sentence or two with attribution is welcome and needs no
            permission. Republishing whole pages as your own is not.
          </p>
        </Section>

        <Section id="mark" heading="The maker's mark and the name">
          <p>
            The WizeWorks name and maker&rsquo;s mark are ours. You may use the
            mark to refer to WizeWorks — in an article, a talk, a directory
            listing — provided it is unmodified and follows the guidance on the{" "}
            <Link href="/brand" className="underline underline-offset-4">
              press and brand page
            </Link>
            .
          </p>
          <p>
            Please do not use the mark or the name in a way that suggests
            WizeWorks endorses, sponsors, or is affiliated with something it is
            not.
          </p>
        </Section>

        <Section id="links" heading="Links to the products and elsewhere">
          <p>
            This site links out to the product websites and occasionally to third
            parties. Once you follow a link you are on someone else&rsquo;s site,
            under their terms and their privacy policy.
          </p>
        </Section>

        <Section id="accuracy" heading="Accuracy, and things that go out of date">
          <p>
            We try to keep this site correct, and where it quotes a product&rsquo;s
            pricing or capabilities it says so and points you at that
            product&rsquo;s own site for the current figure. Software changes
            faster than marketing pages do.
          </p>
          <p>
            The site is provided as it is. Nothing here is a contract, a quote, or
            a commitment to build anything — if we agree to work together, that
            will be written down separately and signed.
          </p>
        </Section>

        <Section id="contact-terms" heading="Messages you send us">
          <p>
            If you write to us, please do not send confidential information in a
            first message. Nothing you send through the contact form creates a
            confidentiality obligation on its own, and an idea shared in an
            unsolicited message is not something we can promise to keep separate
            from work already underway.
          </p>
          <p>
            If there is something sensitive to discuss, say so first and we will
            put an agreement in place before you send it.
          </p>
        </Section>

        <Section id="changes-terms" heading="Changes">
          <p>
            These terms may be revised. The date at the top shows when they last
            were.
          </p>
        </Section>

        <Reveal>
          <div className="flex flex-wrap items-center gap-5 border-t border-base-300 pt-12">
            <Link href="/contact" className="font-medium underline-offset-4 hover:underline">
              Questions about any of this →
            </Link>
            <Link href="/privacy" className="text-base-content/70 underline-offset-4 hover:text-base-content hover:underline">
              Privacy →
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
