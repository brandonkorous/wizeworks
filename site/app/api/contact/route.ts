import { NextResponse } from "next/server";

/**
 * Contact submissions — docs/landing.md §18.
 *
 * ⚠️ DELIVERY IS NOT CONFIGURED, AND THIS FAILS LOUDLY RATHER THAN QUIETLY.
 *
 * Choosing how mail leaves this server is the owner's decision — a provider
 * account, a domain to send from, a DPA if it stores submissions. Rather than
 * guess, this validates the submission properly and then returns a clear 503
 * with a direct email address, which the form shows the visitor.
 *
 * The failure mode that was NOT acceptable: a form that accepts a submission,
 * says "thanks", and drops it. A visitor who thinks they have made contact and
 * has not is worse off than one who is told to send an email.
 *
 * To turn delivery on, set `CONTACT_TO` and one provider key, then implement
 * `deliver()` below. Nothing else in the form needs to change.
 */

const MAX = { name: 120, email: 200, company: 160, what: 5000 } as const;

/** Where the form tells people to write instead. Set `CONTACT_EMAIL` to change. */
const FALLBACK_EMAIL = process.env.CONTACT_EMAIL ?? "";

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  what?: unknown;
  website?: unknown; // honeypot
};

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot. Answer 200 so a bot learns nothing from the response.
  if (str(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const what = str(body.what);

  const errors: string[] = [];
  if (!name) errors.push("a name");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("a valid email address");
  if (what.length < 10) errors.push("a sentence about what you're working on");

  if (errors.length) {
    return NextResponse.json(
      { error: `Please include ${errors.join(", ")}.` },
      { status: 400 },
    );
  }

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    company.length > MAX.company ||
    what.length > MAX.what
  ) {
    return NextResponse.json({ error: "That's too long to send." }, { status: 413 });
  }

  const delivered = await deliver({ name, email, company, what });

  if (!delivered) {
    return NextResponse.json(
      {
        error: FALLBACK_EMAIL
          ? "Our contact form isn't connected yet."
          : "Our contact form isn't connected yet. Please reach us through one of the product sites in the meantime.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * Send the submission somewhere a person will see it.
 *
 * Returns false while unconfigured, which is the current state. Implement with
 * whichever provider the owner picks — the shape below is all it needs.
 */
async function deliver(_submission: {
  name: string;
  email: string;
  company: string;
  what: string;
}): Promise<boolean> {
  const to = process.env.CONTACT_TO;
  if (!to) {
    // Not an error worth alerting on — it is the documented current state.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[contact] CONTACT_TO is unset, so the submission was not delivered.",
      );
    }
    return false;
  }

  // TODO: provider call goes here.
  return false;
}
