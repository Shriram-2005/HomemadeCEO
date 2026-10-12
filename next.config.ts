import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '172.17.33.13',
    '192.168.56.1',
    '10.94.45.175',
    'localhost',
    '127.0.0.1',
  ],
};

export default nextConfig;
