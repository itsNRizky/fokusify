/** @type {import('next').NextConfig} */
import nextPWA from "next-pwa";
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/sounds",
          outputPath: "static/sounds/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });
    // Make sure to return the modified config
    return config;
  },
};

const withPwa = nextPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

export default withPwa(nextConfig);
