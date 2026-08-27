import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { PageShell } from "@/components/sections/page-shell";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Let's build",
  description:
    "Tell us what you're trying to solve. No pitch deck required.",
};

/**
 * Contact — docs/landing.md §14 and §18.
 *
 * §18: do not ask for too much too early. Four fields, one optional, and the
 * page sets expectations rather than qualifying the visitor.
 *
 * Delivery is not wired yet (see app/api/contact/route.ts), so the product
 * sites are offered as a working alternative rather than left implicit.
 */
export default function ContactPage() {
  const reachable = PRODUCTS.filter((p) => p.url);

  return (
    <PageShell
      title="Let's build something worth using."
      intro="Have a problem worth solving, a product worth building, or a business that needs something better? Tell us what you're trying to solve."
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-[1fr_0.75fr] md:gap-24">
        <Reveal>
          <ContactForm fallbackEmail={process.env.CONTACT_EMAIL} />
        </Reveal>

        <Reveal index={1}>
          <aside className="grid content-start gap-10">
            <section aria-labelledby="expect-heading" className="grid gap-4">
              <h2
                id="expect-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                What happens next
              </h2>
              <ul className="grid gap-3 text-base-content/75">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  A person reads it. Not an autoresponder, and not a sales
                  sequence.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  If it isn&rsquo;t a fit, we&rsquo;ll say so plainly rather
                  than going quiet.
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-base-content/35">—</span>
                  No budget question, no discovery call, no deck. Those come
                  later, if at all.
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="products-heading"
              className="grid gap-4 border-t border-base-300 pt-8"
            >
              <h2
                id="products-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                Already using one of the products?
              </h2>
              <p className="text-base-content/75">
                Each product has its own support. You&rsquo;ll get a faster
                answer there than here.
              </p>
              <ul className="grid gap-2">
                {reachable.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={p.url!}
                      className="underline-offset-4 hover:underline"
                    >
                      {p.name} ↗
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </Reveal>
      </div>
    </PageShell>
  );
}
