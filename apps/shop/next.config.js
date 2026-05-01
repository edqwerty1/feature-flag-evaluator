const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const flagManagerOrigin =
  process.env.NEXT_PUBLIC_FLAG_MANAGER_ORIGIN || "http://localhost:3001";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shop",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          flagManager: `flagManager@${flagManagerOrigin.replace(/\/$/, "")}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./ProductPage": "./components/ProductPage",
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
