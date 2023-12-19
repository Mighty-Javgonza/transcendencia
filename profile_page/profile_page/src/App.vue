<template>
    <button v-if='!in_metaverse && profile_state != "no"' @click="close_profile">Close Profile</button>
    <ProfilePage v-if="profile_state != 'no'" :display_status="profile_state" :register_token="register_token" @successful_register="go_to_metaverse"/>
    <!--AdminPage/-->
    <CookieChecker @register='start_register' @log_success="go_to_metaverse"/>
    <h1 v-if='in_metaverse && profile_state === "no"'>YOU ARE IN THE METAVERSE</h1>
    <button v-if='in_metaverse && profile_state === "no"' @click="open_profile">See Profile</button>
    <ButtonedInventory v-if="in_metaverse" @inventory_open="open_inventory" @inventory_close="close_inventory"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfilePage from './components/ProfilePage.vue'
// import AdminPage from './components/AdminPage.vue'
import CookieChecker from './components/CookieChecker.vue'
import ButtonedInventory from './components/ButtonedInventory.vue'

export default defineComponent({
  name: 'App',
  components: {
    ProfilePage,
    //  AdminPage
    CookieChecker,
    ButtonedInventory
  },
  data () {
    return ({
      profile_state: 'no',
      register_token: '',
      in_metaverse: false,
      log_token: ''
    })
  },
  methods: {
    start_register (token : string) {
      this.register_token = token
      this.profile_state = 'registering'
    },
    go_to_metaverse (logToken : string) {
      this.profile_state = 'no'
      this.in_metaverse = true
      this.log_token = logToken
    },
    open_profile () {
      this.profile_state = 'my_profile'
      this.in_metaverse = false
    },
    close_profile () {
      this.profile_state = 'no'
      this.in_metaverse = true
    },
    open_inventory () {
      this.profile_state = 'no'
    //  this.in_metaverse = false
    },
    close_inventory () {
    //  this.in_metaverse = true
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

@font-face {
  font-family: 'joystix';
  src: url('~@/assets/fonts/joystix_monospace.otf') format('opentype');
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
