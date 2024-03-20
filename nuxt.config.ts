// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    // Will be available at runtime
    cosmosdbKey: process.env.COSMOSDB_KEY,
    cosmosdbEndpoint: process.env.COSMOSDB_ENDPOINT
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
