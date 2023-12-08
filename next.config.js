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
        destination: "https://docker-pratice-production.up.railway.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
