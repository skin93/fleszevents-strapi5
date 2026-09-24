export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  "gen-types": {
    enabled: true,
    config: {
      outputLocation: "myTypes.ts",
      singleFile: true,
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      landingPage: (strapi) => {
        if (env("NODE_ENV") !== "production") {
          return true;
        } else {
          return false;
        }
      },
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
  "next-image": {
    config: {
      deviceSizes: [320, 400, 480, 640, 750, 828, 1080, 1280, 1440],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
      qualities: [75],
      formats: ["image/webp"],
      minimumCacheTTL: 14400,
      dangerouslyAllowSVG: false,
      blurSize: 8,
    },
  },
});
