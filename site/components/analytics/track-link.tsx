"use client";

import Link from "next/link";
import { track, type TrackEvent, type TrackProps } from "@/lib/analytics";

/**
 * A `next/link` that records an event when it is followed.
 *
 * This is the ONLY reason any of these links are client components. Keeping the
 * tracking in a thin wrapper means the sections around them stay server
 * components and the page still ships almost no JavaScript.
 *
 * It renders a real `<a href>` either way, so the link works with JS disabled,
 * middle-clicks, and opens in a new tab normally. Tracking is an addition to
 * the link, never a replacement for it.
 */
export function TrackLink({
  event,
  props,
  href,
  children,
  className,
  ...rest
}: {
  event: TrackEvent;
  props?: TrackProps;
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, props)}
      {...rest}
    >
      {children}
    </Link>
  );
}
