import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonClasses } from "@wizeworks/silicaui-react/server";
import { PRODUCTS, productBySlug } from "@/lib/products";
import { articleFor } from "@/lib/product-articles";
import { PageShell } from "@/components/sections/page-shell";
import { MadeByWizeWorks } from "@/components/mark/wordmark";
import { Reveal } from "@/components/motion/reveal";

/**
 * Product detail — a full article, not a summary.
 *
 * Everything on these pages was read off the product's own live site (see the
 * header of lib/product-articles.ts). WizeWorks stays quiet here: the product's
 * colour appears in one contained rail, the attribution sits at the bottom
 * understated, and the mark never takes a product colour (design.md §7, §14).
 *
 * A product with no article falls back to the short form rather than having one
 * written for it. Every product currently has one.
 */

const ACCENT: Record<string, string> = {
  piggles: "bg-piggles",
  sparx: "bg-sparx",
  kanninja: "bg-kanninja",
  jotacular: "bg-jotacular",
  agconn: "bg-agconn",
  silicaui: "bg-silicaui",
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return { title: "Not found" };
  return { title: p.name, description: p.positioning };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const article = articleFor(product.slug);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <PageShell title={product.name} intro={product.positioning}>
      <article className="mx-auto grid max-w-6xl gap-20 px-6 py-20">
        <span
          aria-hidden="true"
          className={`-mt-8 h-[3px] w-16 rounded-full ${ACCENT[product.color]}`}
        />

        {/* ---- lede + interface ---- */}
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-start md:gap-16">
            <div className="grid gap-8">
              <p className="lead max-w-[54ch] text-base-content/85">
                {article ? article.lede : product.outcome}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {product.url ? (
                  <Link
                    href={product.url}
                    className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
                  >
                    Visit {product.name}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </Link>
                ) : (
                  <p className="text-base-content/60">
                    The {product.name} site is temporarily unavailable.
                  </p>
                )}
                <Link
                  href="/contact"
                  className="font-medium underline-offset-4 hover:underline"
                >
                  Talk to us about {product.name} →
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              <span className="text-sm text-base-content/55">
                {product.category}
              </span>
              {product.screenshot ? (
                <Image
                  src={product.screenshot}
                  alt={`The ${product.name} interface`}
                  width={790}
                  height={494}
                  sizes="(min-width: 768px) 42vw, 100vw"
                  className="w-full rounded-lg border border-base-300 object-cover"
                  priority
                />
              ) : (
                <div
                  className="grid aspect-[16/10] place-items-center rounded-lg border border-dashed border-base-300 bg-base-200/60"
                  role="img"
                  aria-label={`${product.name} interface — image pending`}
                >
                  <span className="text-sm text-base-content/45">
                    Interface pending
                  </span>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ---- the article ---- */}
        {article && (
          <div className="grid gap-16 border-t border-base-300 pt-16">
            {article.sections.map((s) => (
              <Reveal key={s.heading}>
                <section className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-balance">
                    {s.heading}
                  </h2>
                  <div className="grid gap-5">
                    {s.body.map((para) => (
                      <p key={para} className="max-w-[62ch] text-base-content/80">
                        {para}
                      </p>
                    ))}
                    {s.link && (
                      <Link
                        href={s.link.href}
                        className="group inline-flex w-fit items-center gap-2 font-medium underline-offset-4 hover:underline"
                      >
                        {s.link.label}
                        <span
                          aria-hidden="true"
                          className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </Link>
                    )}
                    {s.list && (
                      <ul className="grid gap-3 border-t border-base-300 pt-5">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-base-content/75"
                          >
                            <span
                              aria-hidden="true"
                              className="text-base-content/35"
                            >
                              —
                            </span>
                            <span className="max-w-[58ch]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        )}

        {/* ---- audience ---- */}
        {article?.audience && (
          <Reveal>
            <section className="grid gap-4 rounded-lg border border-base-300 bg-base-200 p-10 md:p-12">
              <h2 className="text-2xl font-semibold tracking-tight">
                {article.audience.heading}
              </h2>
              <p className="max-w-[62ch] text-base-content/80">
                {article.audience.body}
              </p>
            </section>
          </Reveal>
        )}

        {/* ---- pricing, quoted from the product's own site ---- */}
        {article?.pricing && (
          <Reveal>
            <section
              aria-labelledby="pricing-heading"
              className="grid gap-8 border-t border-base-300 pt-16 md:grid-cols-[0.9fr_1.1fr] md:gap-14"
            >
              <h2
                id="pricing-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                What it costs
              </h2>
              <div className="grid gap-5">
                <p className="display-3">{article.pricing.headline}</p>
                <p className="lead max-w-[52ch] text-base-content/80">
                  {article.pricing.detail}
                </p>
                <ul className="grid gap-3 border-t border-base-300 pt-5">
                  {article.pricing.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-base-content/75">
                      <span aria-hidden="true" className="text-base-content/35">
                        —
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-base-content/55">
                  Pricing shown as published by {product.name}. Check the
                  product&rsquo;s own site for the current figure.
                </p>
              </div>
            </section>
          </Reveal>
        )}

        {/* ---- close ---- */}
        <Reveal>
          <section className="grid gap-6 border-t border-base-300 pt-14">
            <div className="flex flex-wrap items-center gap-5">
              {product.url && (
                <Link
                  href={product.url}
                  className={`${buttonClasses({ color: "primary", size: "lg" })} group`}
                >
                  Try {product.name}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </Link>
              )}
              <Link
                href="/products"
                className="font-medium underline-offset-4 hover:underline"
              >
                All {PRODUCTS.length} products →
              </Link>
            </div>
            <MadeByWizeWorks />
          </section>
        </Reveal>

        {/* ---- the rest of the family ---- */}
        <Reveal>
          <section aria-labelledby="family-heading" className="grid gap-6">
            <h2
              id="family-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              The rest of the family
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col gap-2 rounded-lg border border-base-300 bg-base-100 p-5 transition-colors duration-300 hover:border-base-content/25"
                  >
                    <span className="text-lg font-semibold tracking-tight">
                      {p.name}
                    </span>
                    <span className="text-sm text-base-content/65">
                      {p.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      </article>
    </PageShell>
  );
}
