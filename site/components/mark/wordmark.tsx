import { MakersMark } from "./makers-mark";

/**
 * The WizeWorks lockup — mark plus wordmark.
 *
 * docs/design.md §9: lowercase is preferred in modern digital contexts, and the
 * wordmark is set in the body face — §9 warns off futuristic, geometric and
 * decorative type for the primary wordmark.
 *
 * TYPE RULE: sizes come from the named scale only. The wordmark used to compute
 * `fontSize: size * 0.72` inline, which is exactly the arbitrary sizing that is
 * no longer allowed. It now offers two fixed steps instead.
 *
 * The mark is decorative here: the wordmark beside it already carries the name,
 * so announcing both would read "WizeWorks WizeWorks".
 */

const STEPS = {
  md: { mark: 26, text: "text-xl" },
  lg: { mark: 40, text: "text-2xl" },
} as const;

export type WordmarkProps = {
  size?: keyof typeof STEPS;
  className?: string;
  /** Stacked for footers and narrow contexts. */
  stacked?: boolean;
};

export function Wordmark({
  size = "md",
  className,
  stacked,
}: WordmarkProps) {
  const step = STEPS[size];
  return (
    <span
      className={[
        "inline-flex items-center",
        stacked ? "flex-col gap-2" : "gap-2.5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MakersMark size={step.mark} />
      <span className={`${step.text} font-semibold tracking-tight`}>
        wizeworks
      </span>
    </span>
  );
}

/**
 * The attribution lockup — docs/design.md §14.
 *
 * "WizeWorks should endorse the product without overtaking the product's own
 * identity", so this stays understated by construction: small, quiet, and it
 * never takes a product colour.
 */
export function MadeByWizeWorks({ className }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 text-sm text-base-content/70",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MakersMark size={18} />
      Made by WizeWorks
    </span>
  );
}
