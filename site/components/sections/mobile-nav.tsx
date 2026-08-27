"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./site-nav";

/**
 * Mobile navigation disclosure — the only interactive part of the header, and
 * the only place the header ships JavaScript.
 *
 * Hand-built rather than pulled from Silica: the library's Drawer is a full
 * modal dialog, which is more machinery than a four-link menu needs on a
 * marketing page where docs/landing.md §22 asks for minimal client-side JS.
 *
 * Keyboard: Escape closes and returns focus to the trigger.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex items-center gap-2 rounded-sm px-1 py-1"
      >
        {/* Label, not an icon alone — the state is readable without decoding a glyph. */}
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="grid gap-[3px]">
          <span className="block h-px w-4 bg-current" />
          <span className="block h-px w-4 bg-current" />
        </span>
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-base-300 bg-base-100"
        >
          <ul className="mx-auto grid max-w-6xl gap-1 px-6 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block py-2 font-semibold"
              >
                Let&rsquo;s build →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
