import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['bcs-app.s3.us-east-1.amazonaws.com'],
        unoptimized: true,
    },
};

export default nextConfig;
