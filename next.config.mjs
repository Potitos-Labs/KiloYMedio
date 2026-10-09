import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") initOpenNextCloudflareForDev();

import bundleAnalyzer from "@next/bundle-analyzer";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

export default withBundleAnalyzer(
  defineNextConfig({
    reactStrictMode: true,
    outputFileTracingExcludes: { "/*": ["./assets/**/*"] },
    outputFileTracingIncludes: { "/*": [
      "node_modules/.pnpm/jose@*/node_modules/jose/dist/**/*",
      "node_modules/.pnpm/@panva+hkdf@*/node_modules/@panva/hkdf/dist/**/*",
    ] },
    serverExternalPackages: ["@prisma/client", ".prisma/client"],
    experimental: { cpus: 2 },
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    images: {
      unoptimized: true,
    },
  }),
);
