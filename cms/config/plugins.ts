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
  "webp-converter": {
    enabled: true,

    config: {
      // mimeTypes that converts to WebP. Default is ['image/png', 'image/jpeg', 'image/jpg']

      mimeTypes: undefined,

      options: {
        // WebP options: https://sharp.pixelplumbing.com/api-output#webp
      },
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
});
