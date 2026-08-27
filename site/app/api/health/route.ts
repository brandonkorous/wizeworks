/**
 * Liveness and readiness endpoint for Kubernetes.
 *
 * Deliberately trivial: it answers "is the Node server up and routing", which
 * is the only question a probe on a static marketing site can usefully ask.
 * There is no database and no upstream to check, so anything more would be
 * inventing a dependency in order to test it.
 *
 * Probing `/` instead would work but renders the full homepage — the entire
 * React tree, every image reference — several times a minute, forever.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { status: "ok", service: "wizeworks-site" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
