import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Standalone output — required for the container image.
   *
   * `next build` then emits `.next/standalone` containing a minimal server plus
   * only the node_modules actually reached at runtime. The runtime stage copies
   * that instead of the full dependency tree.
   *
   * This matters more than usual here: the AKS cluster is a SINGLE node with a
   * 110 GB ephemeral disk, and a rolling update holds two image generations at
   * once. sparx hit DiskPressure on 2026-08-02 doing exactly that with fat
   * images. A standalone Next image is ~200 MB rather than ~1 GB.
   */
  output: "standalone",

  /**
   * `sharp` is installed in the runtime stage — Next 15 removed the WASM
   * fallback, so production image optimisation requires it. Alpine needs
   * `libc6-compat` alongside it; both are in the Dockerfile.
   */

  /**
   * WizeLens patches node:http and reads its own files, so it loads from
   * node_modules rather than a bundle. The standalone trace still copies it
   * into `.next/standalone/node_modules`, because instrumentation.ts imports it.
   */
  serverExternalPackages: ["@wizeworks/lens-node"],

  poweredByHeader: false,

  async headers() {
    return [
      {
        // The mark SVGs on /brand are immutable — they are the frozen brand
        // geometry, not content that changes between releases.
        source: "/brand/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
