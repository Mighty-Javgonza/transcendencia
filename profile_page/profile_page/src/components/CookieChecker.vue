<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CookieChecker',
  created () {
    const metaCookie = document.cookie.split('; ').find((row) => row.startsWith('MetaJWT='))?.split('=')[1]
    const urlParams = new URLSearchParams(window.location.search)
    if (metaCookie === undefined && urlParams.get('code') === null) {
      window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code'
    } else if (urlParams.get('code') !== null) {
      fetch('http://localhost:3000/log/code/' + urlParams.get('code')).then((r) => {
        // TODO: try catch
        r.json().then((access) => {
          if (access.status === 'ko') {
            window.location.href = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-b16e1d817c759a4768523eda7110974f45570d769c4180e352137a7aeb4a5ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8080&response_type=code'
          } else if (access.status === 'needs_register') {
            console.log(access.register_token)
            this.$emit('register', access.register_token)
          }
        })
      })
    }
  }
})
</script>
