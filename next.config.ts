import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],

  },
  transpilePackages: ['next-video'],

};

export default nextConfig;
