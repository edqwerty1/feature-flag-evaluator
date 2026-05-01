const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const shopOrigin =
  process.env.NEXT_PUBLIC_SHOP_ORIGIN || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "flagManager",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          shop: `shop@${shopOrigin.replace(/\/$/, "")}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        exposes: {
          "./TestDecider": "./components/TestDecider",
          "./FlagContext": "./context/FlagContext",
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;
