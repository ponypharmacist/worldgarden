<template>
  <div class="flex-grow bg-slate-100 p-4">
    <h1>Boilerplate</h1>
    <ul>
      <li>uno.css support, beautify pages, add backgrounds</li>
      <li>yandexID auth - get user data https://yandex.ru/dev/id/doc/ru/user-information</li>
      <li>Pinia</li>
      <li>yandex map integration</li>
      <li>what is nuxt /utils?</li>
      <li>what is nuxt /server directory?</li>
    </ul>

    <div>
      <pre>{{ apiResult }}</pre>
    </div>

    <div v-if="!isAuthorized" id="buttonContainerId" />
  </div>
</template>

<script setup lang="ts">
// const config = useRuntimeConfig();
// console.log('config from useRuntimeConfig', config.app, config.public);

// const { $api } = useNuxtApp();
// const { data: apiResult } = await useAsyncData('modules', () => $api('/'));
const { data: apiResult } = await useAPI('/')

// Yandex ID
useHead({
  script: [
    {
      src: 'https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js',
    }
  ]
})

const isAuthorized = ref(false);

onMounted(() => {
  if (typeof window !== 'undefined') {
    // Check cookies
    const { $cookies } = useNuxtApp();
    const token = $cookies.get('world-garden-token');
    if (token) {
      isAuthorized.value = true;
      return;
    }
    
    // Show button
    window.YaAuthSuggest.init(
        {
          client_id: "b2b23b27fcca44acb29fcc4a2f38511d",
          response_type: "token",
          redirect_uri: "http://localhost:3000/yauthorizer"
        },
        "http://localhost:3000",
        {
          view: "button",
          parentId: "buttonContainerId",
          buttonSize: 'm',
          buttonView: 'main',
          buttonTheme: 'light',
          buttonBorderRadius: "0",
          buttonIcon: 'ya',
        }
      )
      .then(({handler}) => handler())
      .then(data => console.log('Сообщение с токеном', data))
      .catch(error => console.log('Обработка ошибки', error))
  }
})
</script>
