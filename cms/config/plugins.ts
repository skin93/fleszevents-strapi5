export default () => ({
  seo: {
    enabled: true,
  },
  "gen-types": {
    enabled: true,

    config: {
      outputLocation: "myTypes.ts",

      // If this is true, then the outputLocation should be the location to a .ts file

      singleFile: true,
    },
  },
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      landingPage: true, // disable Sandbox everywhere
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
});
