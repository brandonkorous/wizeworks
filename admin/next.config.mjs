import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    '@wizeworks/app-kit',
    '@wizeworks/ui',
    '@wizeworks/brand',
    '@wizeworks/forms',
    '@wizeworks/silicaui-react',
    '@wizeworks/operator',
    '@wizeworks/operator-auth',
  ],
  // Keep the operator auth instance's native/server-only deps external to the
  // Next bundle — pg (the wize_admin pool) + Better Auth + the @wizeworks/events
  // Pub/Sub client (used by the operator set-password email path).
  serverExternalPackages: [
    'better-auth',
    'pg',
    '@google-cloud/pubsub',
    '@google-cloud/secret-manager',
    'google-gax',
    'google-auth-library',
    '@grpc/grpc-js',
    'gaxios',
    'https-proxy-agent',
    'agent-base',
    // WizeLens patches node:http and reads its own files: load it from node_modules, not a bundle.
    '@wizeworks/lens-node',
  ],
  typedRoutes: true,
  output: 'standalone',
  outputFileTracingRoot: __dirname,
  // admin/ is its own pnpm workspace (the app plus packages/*), with its own
  // lockfile. Pin both roots to it so neither Next nor Turbopack walks up into
  // the repo root, where site/ has a lockfile of its own.
  turbopack: { root: __dirname },
};

export default config;
