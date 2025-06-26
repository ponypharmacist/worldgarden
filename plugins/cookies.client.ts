import { defineNuxtPlugin, useRequestHeaders } from '#app'
import cookie from 'cookie-universal'

export default defineNuxtPlugin(() => {
  const cookies = cookie()
  return {
    provide: {
      cookies,
    },
  }
})