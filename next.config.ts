import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],

  },
  transpilePackages: ['next-video'],
  serverActions: {
    bodySizeLimit: '50000mb',
  },

};

export default nextConfig;
