<template>
    <ProfilePage v-if="profile_state != 'no'" :display_status="profile_state" :register_token="register_token"/>
    <!--AdminPage/-->
    <CookieChecker @register='start_register'/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfilePage from './components/ProfilePage.vue'
// import AdminPage from './components/AdminPage.vue'
import CookieChecker from './components/CookieChecker.vue'

export default defineComponent({
  name: 'App',
  components: {
    ProfilePage,
    //  AdminPage
    CookieChecker
  },
  data () {
    return ({
      profile_state: 'no',
      register_token: ''
    })
  },
  methods: {
    start_register (token : string) {
      this.register_token = token
      this.profile_state = 'registering'
    }
  }
})
</script>

<style>

:root {
  --border_color: #603f22;
  --pop_background: #392919;
  --select_light: #85d8e5d0;
}

#app {
  text-align: center;
  font-family: monospace;
  color: white;
}

body {
  background-color: #392919d5
}
</style>
