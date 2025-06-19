/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker/SST builds.
 */
if (!process.env.SKIP_ENV_VALIDATION) {
  await import("./src/env.ts");
}

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  // Only include if you're NOT using the /app directory
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  // Allow transpiling external packages like Geist UI
  transpilePackages: ["geist"],

  // Disable eslint checks during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: makes deployments smoother in containers/SST
  output: "standalone",
};

export default config;
