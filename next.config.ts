import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['localhost', 'ftp.goit.study'], // дозволяє картинки з цих доменів
  },
};

export default nextConfig;
