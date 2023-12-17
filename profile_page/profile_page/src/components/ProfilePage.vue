<template>
    <div class="profile_container">
        <StatsDisplay v-if="display_status != 'registering' && loaded" :username="username"/>
        <MatchHistory v-if="display_status != 'registering' && loaded"/>
        <div class="personal_data_wrapper">
            <div :class="{personal_data:true, float_right:display_status != 'registering'}">
                <div class=status_profile_pair>
                    <StatusPearl v-if="display_status != 'registering'"/>
                    <ProfileImage v-if="loaded" editable="display_status =='registering'" :path="player_data.profilePic"/>
                </div>
                <Username :username="this.username" editable="display_status == 'registering'" @change_username="changeUsername"/>
                <Enabler2FA v-if="display_status != 'registering'"/>
            </div>
        </div>
    </div>
    <button class='fa_button' v-if="display_status == 'registering'" @click="registerUser">REGISTER</button>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatsDisplay from './StatsDisplay.vue'
import StatusPearl from './StatusPearl.vue'
import ProfileImage from './ProfileImage.vue'
import Username from './Username.vue'
import MatchHistory from './MatchHistory.vue'
import Enabler2FA from './Enabler2FA.vue'
import { backend, postRequestParams, getRequestParams } from './connect_params'

export default defineComponent({
  name: 'ProfilePage',
  props: ['display_status', 'register_token'],
  components: {
    StatsDisplay,
    StatusPearl,
    ProfileImage,
    Username,
    MatchHistory,
    Enabler2FA
  },
  data () {
    return ({
      username: 'Username',
      loaded: false,
      player_data: {}
    })
  },
  methods: {
    registerUser () {
      const myData : any = postRequestParams
      myData.body = JSON.stringify({
        username: this.username,
        register_token: this.register_token
      })
      fetch(backend + '/log/register', myData).then((r) => {
        // TODO try catch, invalid JSON
        r.json().then((registerAnswer) => {
          if (registerAnswer.status === 'ok') {
            this.$emit('successful_register')
            globalThis.logToken = registerAnswer.meta_token
          }
        })
      })
    },
    changeUsername (newUsername : string) {
      if (this.display_status != 'registering')
      {
        console.log('Changing username')
        fetch(backend + '/changeUsername/' + this.username + '/' + newUsername, getRequestParams)
      }
      this.username = newUsername
    }
  },
  created () {
    if (globalThis.logToken != undefined)
    {
      const myData : any = getRequestParams
      fetch(backend + '/log/me/' + globalThis.logToken, myData).then((a) => {
        a.json().then((player) => {
          globalThis.id = player.id
          this.player_data = player
          this.username = player.name
          this.loaded = true
        })
      })
    }
  }
})
</script>

<style>

.profile_container {
  display: flex;
  flex: 33vw;
}

.personal_data_wrapper {
  width:100%;
}

.personal_data {
  margin: 0 0.5em;
}

.float_right {
  float:center;
}

.status_profile_pair {
    display: flex;
}

</style>
