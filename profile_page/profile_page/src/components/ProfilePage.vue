<template>
    <div class="profile_container">
        <StatsDisplay v-if="display_status != 'registering' && loaded" :username="username"/>
        <MatchHistory v-if="display_status != 'registering' && loaded"/>
        <div class="personal_data_wrapper">
            <div :class="{personal_data:true, float_right:display_status != 'registering'}">
                <div class=status_profile_pair>
                    <StatusPearl v-if="display_status != 'registering'"/>
                    <ProfileImage v-if="loaded" :editable="display_status =='registering' || display_status == 'my_profile'" :path="player_data.profilePic"/>
                </div>
                <Username :username="this.username" :editable="display_status == 'registering' || display_status == 'my_profile'" @change_username="changeUsername"/>
                <div class="float_left">
                    <Enabler2FA v-if="display_status != 'registering' && display_status != 'profile_display'"/>
                    <button class="compressed_button" v-if="display_status == 'profile_display' && !is_blocked && !is_friend" @click="befriend">Befriend</button>
                    <button class="compressed_button" v-if="display_status == 'profile_display' && !is_blocked" @click="block">Block</button>
                    <button class="compressed_button" v-if="display_status == 'profile_display' && !is_blocked" @click="match">Match</button>
                </div>
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
  props: ['display_status', 'register_token', 'userId'],
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
      player_data: {},
      is_blocked: false,
      is_friend: false
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
        fetch(backend + '/changeUsername/' + this.username + '/' + newUsername, getRequestParams)
      }
      this.username = newUsername
    },
    befriend () {
      fetch (backend + '/players/' + globalThis.id + '/sendFrienshipRequest/' + this.userId, postRequestParams).then((r) => {
        r.json().then((a) => {
        })
      })
    },
    block() {
      fetch (backend + '/' + globalThis.id + '/blocks/' + this.userId, postRequestParams).then((r) => {
        this.is_blocked = true
      })
    }
  },
  created () {
    if (globalThis.logToken != undefined && this.userId === undefined)
    {
      const myData : any = getRequestParams
      fetch(backend + '/log/me/' + globalThis.logToken, myData).then((a) => {
        a.json().then((player) => {
          globalThis.id = player.id
          globalThis.my_data = player
          this.player_data = player
          this.username = player.name
          this.loaded = true
        })
      })
    } else if (this.userId !== undefined) {
      const myData : any = getRequestParams
      fetch (backend + '/players/' + this.userId, myData).then((a) => {
        a.json().then((player) => {
          this.player_data = player
          this.username = player.name
          this.loaded = true
        })
      })
    } else {
      this.loaded = true
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
  float:right;
}

.float_left {
  float: left;
  text-align: left;
}

.status_profile_pair {
    display: flex;
}

.compressed_button {
  border: solid;
  border-radius: 2px;
  border-width: 3px;
  width: 7em;
  height: 2.3em;
  color: white;
  border-color: var(--border_color);
  background-color: var(--pop_background);
  cursor: pointer;
  margin: 0.3em;
}

.compressed_button:hover {
  background: var(--select_light)
}

</style>
