<template>
    <div class="profile_container">
        <StatsDisplay v-if="display_status != 'registering'"/>
        <MatchHistory v-if="display_status != 'registering'"/>
        <div class="personal_data_wrapper">
            <div :class="{personal_data:true, float_right:display_status != 'registering'}">
                <div class=status_profile_pair>
                    <StatusPearl v-if="display_status != 'registering'"/>
                    <ProfileImage editable="display_status =='registering'"/>
                </div>
                <Username :username="this.username" editable="display_status == 'registering'" @change_username="changeUsername"/>
                <Enabler2FA/>
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

const backend = 'http://localhost:3000'

const postRequestParams = {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({})
}

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
      // TODO make username a prop. (And probaby pass it to every other element)
      username: 'javgonza'
    })
  },
  methods: {
    registerUser () {
      console.log('REGISTER')
      console.log(this.register_token)
      console.log(this.username)
      const myData : any = postRequestParams
      myData.body = JSON.stringify({
        username: this.username,
        register_token: this.register_token
      })
      fetch(backend + '/log/register', myData)
    },
    changeUsername (newUsername : string) {
      this.username = newUsername
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
