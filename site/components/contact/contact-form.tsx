"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Contact form — docs/landing.md §18.
 *
 * The field list is the spec's, and the omissions are deliberate: no budget, no
 * phone number, no company size, no timeframe, no project-category dropdown.
 * §18 is explicit that more qualification happens after interest exists, not
 * before. Company is optional. That is four fields, one of them optional.
 *
 * Validation is native-first — `required`, `type="email"`, `minLength` — so the
 * browser does the work and it still functions with JavaScript disabled apart
 * from the async submit. The client check exists only to give a better message
 * than the browser default.
 */

type State = "idle" | "sending" | "sent" | "error";

export function ContactForm({ fallbackEmail }: { fallbackEmail?: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string>("");
  const [started, setStarted] = useState(false);

  // §26 tracks form start separately from completion, so an abandoned form is
  // distinguishable from one that was never begun.
  function onFirstInput() {
    if (started) return;
    setStarted(true);
    track("contact_form_start");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setState("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setState("sent");
        track("contact_form_complete");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => ({}));
      setState("error");
      setMessage(
        body?.error ??
          "We could not send that just now. Please try again in a moment.",
      );
    } catch {
      setState("error");
      setMessage(
        "We could not reach the server. Check your connection and try again.",
      );
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="grid gap-3 rounded-lg border border-base-300 bg-base-200 p-8"
      >
        <p className="text-2xl font-semibold tracking-tight">
          Thanks — that came through.
        </p>
        <p className="text-base-content/75">
          We read everything that arrives here, and you will hear back from a
          person rather than an autoresponder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onInput={onFirstInput} className="grid gap-6">
      <div className="grid gap-2">
        <label htmlFor="name" className="font-medium">
          Your name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="input w-full"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input w-full"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="company" className="font-medium">
          Company{" "}
          <span className="font-normal text-base-content/55">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="input w-full"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="what" className="font-medium">
          What are you working on?
        </label>
        <textarea
          id="what"
          name="what"
          required
          minLength={10}
          rows={6}
          className="textarea w-full"
          placeholder="A sentence or two is plenty. No pitch deck required."
        />
      </div>

      {/* Honeypot: a real person never fills this. Hidden from everyone,
          including screen readers, and never focusable. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && (
        <p role="alert" className="text-error">
          {message}
          {fallbackEmail && (
            <>
              {" "}
              You can also email us directly at{" "}
              <a href={`mailto:${fallbackEmail}`} className="underline">
                {fallbackEmail}
              </a>
              .
            </>
          )}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn btn-primary btn-lg"
        >
          {state === "sending" ? "Sending…" : "Start a conversation"}
        </button>
        <span className="text-sm text-base-content/60">
          No pitch deck required.
        </span>
      </div>
    </form>
  );
}
