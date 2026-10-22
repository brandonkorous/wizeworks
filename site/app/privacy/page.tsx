import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/sections/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this website collects, which is very little, and what happens to it.",
};

/**
 * ⚠️ NOT LEGALLY REVIEWED. HAVE A LAWYER READ THIS BEFORE LAUNCH.
 *
 * What this document IS: an accurate, verified description of what this website
 * actually does. Every factual claim below was checked against the running site
 * rather than assumed —
 *
 *   • no analytics provider is installed (lib/analytics.ts is a no-op seam)
 *   • zero third-party hosts are contacted (verified in the browser)
 *   • no cookie is set by this site
 *   • fonts are self-hosted by next/font, so no request reaches Google
 *   • the contact form collects four fields and currently cannot deliver them
 *   • performance traces (WizeLens, instrumentation.ts) cover a sample of
 *     requests and go to WizeLens Cloud, our own tracing service
 *
 * What it is NOT: advice about which jurisdictions apply, whether GDPR/CCPA
 * obligations are triggered, or what a data-processing agreement needs to say.
 * Those are questions for a lawyer, and they become live the moment a contact
 * provider or an analytics tool is switched on.
 *
 * IF YOU CHANGE WHAT THE SITE COLLECTS, CHANGE THIS PAGE IN THE SAME COMMIT.
 * A privacy policy that describes a previous version of the software is worse
 * than none, because it is a statement that has become untrue.
 */

/** Update whenever the substance changes. Not auto-generated on purpose. */
const LAST_UPDATED = "21 October 2026";

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

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy"
      intro="This website collects almost nothing. Here is exactly what it does collect, and what happens to it."
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20">
        <Reveal>
          <p className="text-sm text-base-content/60">
            Last updated {LAST_UPDATED}
          </p>
        </Reveal>

        <Section id="short" heading="The short version">
          <p>
            We do not track you. This site sets no cookies, loads nothing from
            third-party servers, and has no analytics product installed. If you
            send us a message through the contact form, we receive what you
            typed and nothing else. To keep the site fast and working, we
            record how a sample of page requests performed; see{" "}
            <a href="#servers" className="underline underline-offset-4">
              Server logs and performance
            </a>
            .
          </p>
        </Section>

        <Section id="cookies" heading="Cookies and tracking">
          <p>
            This site sets no cookies of its own, and there is no advertising
            pixel, session recorder, or third-party analytics script anywhere on
            it. Nothing follows you to another website.
          </p>
          <p>
            Page-interaction events — which links were clicked, how far a page
            was scrolled — are defined in the code but are not sent anywhere.
            They exist so that a privacy-respecting analytics tool could be
            connected in future. If one is ever connected, this page will say so
            before it goes live.
          </p>
        </Section>

        <Section id="fonts" heading="Fonts and images">
          <p>
            Typefaces are served from this domain rather than fetched from a font
            provider, so loading a page does not tell anyone else that you
            visited. Images are served from this domain too.
          </p>
        </Section>

        <Section id="contact" heading="If you use the contact form">
          <p>
            The form asks for your name, your email address, an optional company
            name, and a description of what you are working on. That is all it
            collects — there is no hidden field, no fingerprinting, and no
            enrichment against a third-party database.
          </p>
          <p>
            We use it to reply to you. We do not sell it, rent it, or add you to
            a mailing list you did not ask for.
          </p>
          <p>
            At the time of writing, delivery for this form is not yet connected,
            so submissions are validated and then rejected with an error rather
            than being stored. When delivery is connected, this section will be
            updated to name the provider that carries the message.
          </p>
        </Section>

        <Section id="servers" heading="Server logs and performance">
          <p>
            Like almost every website, the server that delivers these pages keeps
            ordinary request logs, which may include an IP address, a timestamp,
            and which page was requested. These are operational records used to
            keep the site running and to investigate abuse. They are not combined
            with anything else to build a profile of you.
          </p>
          <p>
            For a sample of page requests, the server also records a
            performance trace: the page requested, how long each step took,
            any error, your IP address, and your browser&rsquo;s user-agent
            string. Your browser reports the same page&rsquo;s load and render
            times and any script errors back to this domain, with a random id
            for the tab, kept in session storage and gone when the tab closes.
            It is not a cookie.
          </p>
          <p>
            These traces go to WizeLens, the tracing service WizeWorks runs. We
            use them to find slow pages and errors, and for nothing else. They
            are not used for advertising and are not combined with anything to
            build a profile of you.
          </p>
        </Section>

        <Section id="products" heading="The products are separate">
          <p>
            WizeWorks builds several products, each with its own website, its own
            account system, and its own privacy policy. This page covers{" "}
            <em>this</em> website only. If you have an account with one of the
            products, that product&rsquo;s policy governs your data there.
          </p>
        </Section>

        <Section id="rights" heading="Your data, and getting rid of it">
          <p>
            If you have written to us and would like that message deleted, ask
            and we will delete it. You do not need to give a reason, and you do
            not need to be in a particular country to ask.
          </p>
        </Section>

        <Section id="changes" heading="Changes to this page">
          <p>
            If what this site collects changes, this page changes in the same
            release. The date at the top tells you when it was last revised.
          </p>
        </Section>

        <Reveal>
          <div className="flex flex-wrap items-center gap-5 border-t border-base-300 pt-12">
            <Link href="/contact" className="font-medium underline-offset-4 hover:underline">
              Ask us about any of this →
            </Link>
            <Link href="/terms" className="text-base-content/70 underline-offset-4 hover:text-base-content hover:underline">
              Terms →
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
