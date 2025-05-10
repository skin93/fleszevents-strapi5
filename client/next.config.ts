/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: `${process.env.PROTOCOL}`,
        hostname: `${process.env.STRAPI_HOST}`,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
