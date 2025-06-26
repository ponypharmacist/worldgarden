import { defineNuxtPlugin, useRequestHeaders, useNuxtApp } from '#app'
import cookie from 'cookie-universal'

export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event
  const cookies = cookie(event?.req, event?.res)
  return {
    provide: {
      cookies,
    },
  }
})