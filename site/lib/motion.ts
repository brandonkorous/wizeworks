/**
 * Motion tokens — mirrors docs/animation.md §2 (duration) and §3 (easing).
 *
 * Silica owns component state transitions through its own `--duration` /
 * `--ease` tokens. These are for the custom scroll primitives in
 * components/motion, which Silica's tokens do not reach.
 */

/** docs/animation.md §2. */
export const DURATION = {
  /** Button hover, icon movement, focus, small colour shifts. */
  micro: 160,
  /** Card hover, navigation states, image movement. */
  standard: 300,
  /** Section entrance, large typography, image reveals. */
  reveal: 620,
  /** The initial hero composition only. */
  hero: 950,
} as const;

/** docs/animation.md §3. Nothing in the interface may visibly bounce. */
export const EASE = {
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  enter: "cubic-bezier(0.16, 1, 0.3, 1)",
  exit: "cubic-bezier(0.4, 0, 1, 1)",
} as const;

/**
 * docs/animation.md §4: trigger when ~15–25% of the section has entered.
 */
export const REVEAL_THRESHOLD = 0.2;

/** docs/animation.md §4: 50–90ms between staggered children. */
export const STAGGER_MS = 70;

/**
 * docs/animation.md §4: never stagger more than 4–5 children in one reveal.
 * Past this index the delay stops growing, so a long list cannot turn into a
 * slow cascade.
 */
export const STAGGER_MAX_INDEX = 4;

/** docs/animation.md §34: mobile travels 30–50% less than desktop. */
export const TRAVEL = {
  desktop: 20,
  mobile: 12,
} as const;

export function staggerDelay(index: number): number {
  return Math.min(index, STAGGER_MAX_INDEX) * STAGGER_MS;
}

/**
 * Reads the user's motion preference.
 *
 * Silica forces its own `--duration` to 0.01ms under
 * `prefers-reduced-motion: reduce`, but that only covers CSS transitions inside
 * the component library. Everything in components/motion is driven from JS and
 * has to ask separately — docs/animation.md §33 and §37, where reduced motion
 * is Tier 1, not polish.
 *
 * Returns false during SSR so the server markup matches the pre-hydration
 * client render; each primitive re-checks on mount.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
