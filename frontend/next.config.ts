import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "backend",
        port: "8000",
        pathname: "/static/**"
      }
    ]
  }
};

export default nextConfig;
