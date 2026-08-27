import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

/**
 * The chrome every page below the homepage shares: skip link, navigation,
 * `<main>` landmark, footer.
 *
 * The homepage composes these itself because it has no page header — its hero
 * IS the header. Everything else opens with a title block, so the shell owns it
 * and no page has to remember the skip link or the landmark.
 */
export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-content"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main">
        <header className="border-b border-base-300/60">
          <div className="mx-auto grid max-w-6xl gap-5 px-6 py-20 md:py-24">
            <h1 className="display-2 max-w-[20ch]">{title}</h1>
            {intro && (
              <p className="lead max-w-[58ch] text-base-content/75">{intro}</p>
            )}
          </div>
        </header>

        {children}
      </main>

      <SiteFooter />
    </>
  );
}
