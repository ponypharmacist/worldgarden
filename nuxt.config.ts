// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      // link: [{ rel: 'stylesheet', href: '...min.css' }]
      // script: [
      //   {
      //     src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js',
      //   },
      // ],
    }
  },

  compatibilityDate: '2025-05-15',

  css: ['~/assets/css/main.css'],

  // devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    'nuxt-windicss',
  ],

  runtimeConfig: {
    // Only available on the server
    // secret: process.env.SECRET_API_KEY,
    // Available on client and server
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL
    }
  }

  // ssr: false,
})