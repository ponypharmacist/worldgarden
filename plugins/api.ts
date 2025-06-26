// https://nuxt.com/docs/guide/recipes/custom-usefetch

export default defineNuxtPlugin((nuxtApp) => {
  // const { session } = useUserSession()
  const config = useRuntimeConfig()

  const api = $fetch.create({
    baseURL: config.public.apiUrl,

    // onRequest({ request, options, error }) {
      // if (session.value?.token) {
      //   // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
      //   options.headers.set('Authorization', `Bearer ${session.value?.token}`)
      // }
      // options.headers.set('Access-Control-Allow-Headers' , '*');
      // options.headers.set('Access-Control-Allow-Origin' , '*');
    // },

    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})