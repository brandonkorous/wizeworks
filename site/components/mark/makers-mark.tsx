/* ============================================================================
   The WizeWorks maker's mark — CANONICAL GEOMETRY. DO NOT EDIT THE NUMBERS.
   ----------------------------------------------------------------------------
   docs/design.md §4 locks this geometry. Changing any value below changes the
   brand mark. Redrawing the pieces, altering corner rounding, changing the
   notch, or adding geometry to the centre are all explicitly forbidden.

   PROVENANCE — how these numbers were derived, so they can be re-derived:

   `images/icon.png` (1254×1254, alpha-masked) was decomposed into three
   connected components. Their centroids sit at equal radius from a common
   centre, 120° apart (measured: 119.7° and 120.6°), which confirms the brand's
   own claim — one shape, repeated three times.

   Each straight edge was fitted by least squares and is straight to within
   0.35px. The bottom edges measured a slope of 0.5777 against an ideal
   1/√3 = 0.57735; the top edges measured ~0.599. A parametric model was then
   fitted to the raster by intersection-over-union. Locking BOTH slopes to an
   exact 30° scored marginally HIGHER (IoU 0.9754) than leaving them free
   (0.9747), so the mark is drawn as exact hexagonal geometry — which is both
   the design intent and the better fit. The residual ~2.5% is rasterisation
   and antialiasing in the source concept render.

   NOTE: the source is a raster concept render, not vector master artwork.
   docs/design.md §4 asks for the approved source artwork when production
   assets are made. If a true vector master exists, it should replace this.

   Units: mark centre at (0,0), piece apex at y = -100.
   ============================================================================ */

/** Half-width of one piece. */
const A = 44.72;
/** Apex → notch depth. */
const T = 55.17;
/** Outer corner radius. */
const R_OUT = 11.65;
/** Notch corner radius — deliberately tighter than the outer corners. */
const R_NOTCH = 5.69;

/**
 * One piece. The other two are this path rotated 120° and 240° — the geometry
 * is never duplicated, which is what makes "one shape, repeated" literally true
 * in the markup and not just in the brand story.
 */
const PIECE =
  "M 5.825 -96.637 L 38.895 -77.544 A 11.65 11.65 0 0 1 44.72 -67.455 " +
  "L 44.72 -39.189 A 11.65 11.65 0 0 1 27.245 -29.1 L 2.845 -43.187 " +
  "A 5.69 5.69 0 0 0 -2.845 -43.187 L -27.245 -29.1 " +
  "A 11.65 11.65 0 0 1 -44.72 -39.189 L -44.72 -67.455 " +
  "A 11.65 11.65 0 0 1 -38.895 -77.544 L -5.825 -96.637 " +
  "A 11.65 11.65 0 0 1 5.825 -96.637 Z";

/**
 * Where the geometric centre sits inside a 0 0 200 200 viewBox so that the
 * assembly's bounding box (173.205 × 172.215) is optically centred. The mark is
 * three-fold symmetric, so its bounding box is NOT centred on its centre of
 * rotation — this offset is why.
 */
const CX = 100;
const CY = 112.09;

/**
 * Distance from the centre to a notch vertex — the radius of the negative-space
 * opening. docs/design.md §19 defines the clear-space unit X from this opening;
 * exported so layout code can derive clear space instead of guessing at it.
 */
export const CLEAR_SPACE_UNIT = 100 - T; // 44.83 in viewBox units

/** Which rotation carries the warm taupe. Matches the source artwork. */
const TAUPE_ROTATION = 120; // lower-right

export type MakersMarkProps = {
  /** Rendered size in px. Below 24px use the small-size master (design.md §20). */
  size?: number | string;
  /**
   * Accessible name. Omit for a decorative mark that sits beside the wordmark —
   * it is then hidden from assistive technology rather than announced twice.
   */
  title?: string;
  /** Hero-only: pieces settle into place on load. docs/animation.md §7. */
  assembling?: boolean;
  className?: string;
};

/**
 * Two pieces take `--color-primary`, one takes `--color-accent`. These are
 * theme tokens, not literals, so the mark inverts correctly inside a
 * `data-theme="wizeworks-dark"` island without a second asset.
 *
 * `currentColor` is deliberately NOT used: the mark is two-tone by definition,
 * and a single inherited colour would flatten it into the one-colour variant.
 */
export function MakersMark({
  size = 48,
  title,
  assembling = false,
  className,
}: MakersMarkProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      focusable="false"
      style={assembling ? { overflow: "visible" } : undefined}
    >
      <g transform={`translate(${CX} ${CY})`}>
        {/* Each piece sits in its own <g> so the assembly animation can offset
            it in the mark's own coordinate space. Putting the offset on the
            <path> instead would compose with that path's rotate() and send the
            lower two pieces off in rotated directions. */}
        {[0, TAUPE_ROTATION, 240].map((deg) => (
          <g
            key={deg}
            className={assembling ? `mark-piece mark-piece-${deg}` : undefined}
          >
            <path
              d={PIECE}
              transform={deg ? `rotate(${deg})` : undefined}
              fill={
                deg === TAUPE_ROTATION
                  ? "var(--color-accent)"
                  : "var(--color-primary)"
              }
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Single-colour variant — production alternative for embroidery, deboss, etch. */
export function MakersMarkMono({
  size = 48,
  title,
  className,
}: Omit<MakersMarkProps, "assembling">) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      focusable="false"
    >
      <g transform={`translate(${CX} ${CY})`} fill="currentColor">
        {[0, 120, 240].map((deg) => (
          <path key={deg} d={PIECE} transform={deg ? `rotate(${deg})` : undefined} />
        ))}
      </g>
    </svg>
  );
}

export { A as PIECE_HALF_WIDTH, T as PIECE_DEPTH, R_OUT, R_NOTCH };
