/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["127.0.0.1"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
