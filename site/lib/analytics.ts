/**
 * Measurement plan — docs/landing.md §26.
 *
 * §26 asks for the page to be judged on behaviour, not on "does it look
 * premium". These are the events it names.
 *
 * NO ANALYTICS PROVIDER IS INSTALLED, AND THAT IS DELIBERATE.
 *
 * Choosing a provider is a privacy decision, not an engineering one: it decides
 * whether the site sets cookies, whether it needs a consent banner, and whose
 * servers see WizeWorks' visitors. That belongs to the owner. So this ships the
 * *events* — named, typed, and fired from the right places — behind a seam that
 * any provider can be attached to later without touching a single component.
 *
 * Until something subscribes, `track()` does nothing. No network request, no
 * cookie, no third-party script, nothing to consent to.
 *
 * To attach a provider, subscribe once from the root layout:
 *
 *     onTrack((name, props) => plausible(name, { props }));
 *
 * Or read the DOM events directly — each call also dispatches
 * `wizeworks:track` on `window`, so a tag manager can listen without importing
 * anything.
 */

/** The events docs/landing.md §26 asks to be tracked. */
export type TrackEvent =
  | "hero_explore_products"
  | "hero_view_work"
  | "nav_lets_build"
  | "product_card_click"
  | "scroll_depth"
  | "story_about_click"
  | "final_cta_click"
  | "contact_form_start"
  | "contact_form_complete";

export type TrackProps = Record<string, string | number | boolean>;

type Subscriber = (name: TrackEvent, props?: TrackProps) => void;

const subscribers: Subscriber[] = [];

/** Attach a provider. Returns an unsubscribe function. */
export function onTrack(fn: Subscriber): () => void {
  subscribers.push(fn);
  return () => {
    const i = subscribers.indexOf(fn);
    if (i > -1) subscribers.splice(i, 1);
  };
}

/**
 * Record an event. Safe to call from anywhere, including during SSR, where it
 * is a no-op.
 *
 * A subscriber that throws must not break the page — analytics is never
 * allowed to take down a marketing site — so each is called in isolation.
 */
export function track(name: TrackEvent, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  for (const fn of subscribers) {
    try {
      fn(name, props);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[analytics] subscriber threw", err);
      }
    }
  }

  try {
    window.dispatchEvent(
      new CustomEvent("wizeworks:track", { detail: { name, props } }),
    );
  } catch {
    /* CustomEvent unavailable — nothing to do, and nothing worth breaking for */
  }
}

/**
 * Scroll-depth milestones, each reported once.
 *
 * Deliberately coarse: four thresholds, not a continuous stream. §32 forbids
 * anything that interferes with normal scrolling, so this only reads, and the
 * listener is passive and rAF-throttled like the process line.
 */
export function trackScrollDepth(): () => void {
  if (typeof window === "undefined") return () => {};

  const milestones = [25, 50, 75, 100];
  const fired = new Set<number>();
  let frame = 0;

  const measure = () => {
    frame = 0;
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = (window.scrollY / scrollable) * 100;
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        track("scroll_depth", { percent: m });
      }
    }
  };

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(measure);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  measure();

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
  };
}
