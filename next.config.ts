import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/drive-storage/**",
      },
    ],
  },
  typescript: {
    // This option is set to true to ignore TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
