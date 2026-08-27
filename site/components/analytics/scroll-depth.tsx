"use client";

import { useEffect } from "react";
import { trackScrollDepth } from "@/lib/analytics";

/**
 * Mounts the scroll-depth listener for the page. Renders nothing.
 * docs/landing.md §26 lists scroll depth among the events worth tracking.
 */
export function ScrollDepth() {
  useEffect(() => trackScrollDepth(), []);
  return null;
}
