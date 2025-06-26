<template>
  <div style="padding: 20px">
    <div>inside</div>
    <pre>Token: {{ getTokenFromHash() }}</pre>
  </div>
</template>

<script setup lang="ts">
// Yandex ID
useHead({
  script: [
    {
      src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-token-with-polyfills-latest.js',
    }
  ]
})

onMounted(async () => {
  if (typeof window !== 'undefined') {
    await YaSendSuggestToken(
    'https://localhost:3000', 
    {
        flag: true
    }
    )

    if (getTokenFromHash()) {
      saveTokenToCookies();
    }
  }
})

const route = useRoute();

function getTokenFromHash() {
  if (!route.hash.includes('access_token')) return '';
  return route.hash.replace('#', '').split('&')[0].split('=')[1];
}

// Cookies management
const { $cookies } = useNuxtApp()

// Set a cookie
function saveTokenToCookies() {
  $cookies.set('world-garden-token', getTokenFromHash(), {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
  // close this temp popup
  window.close()
}

// Get a cookie
// const token = $cookies.get('user-token')

// Remove a cookie
// $cookies.remove('user-token')
</script>
