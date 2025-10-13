import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "res.cloudinary.com" },
        { protocol: "https", hostname: "lh3.googleusercontent.com" },
      ], // Add the domain(s) of your image server
      loader: "default", // Use the default image loader
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
};

export default nextConfig;