/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/galleries",
        destination: "/galerie",
        permanent: true,
      },
      {
        source: "/galleries/:slug",
        destination: "/galerie/:slug",
        permanent: true,
      },
      {
        source: "/tags",
        destination: "/tagi",
        permanent: true,
      },
      {
        source: "/tags/:slug",
        destination: "/tagi/:slug",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/kontakt",
        permanent: true,
      },
      {
        source: "/calendar",
        destination: "/kalendarz",
        permanent: true,
      },
      {
        source: "/festival-map",
        destination: "/festiwalowa-mapa",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/szukaj",
        permanent: true,
      },
    ];
  },
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: `${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=(), camera=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Server-Timing",
            value: "app; dur=100",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
