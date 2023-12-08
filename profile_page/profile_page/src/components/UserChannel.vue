<template>

<div class="user_container">
    <p :class="{text_user: true, admin: admin && !kicked, kicked: kicked}">{{user.name}}</p>
    <div id="channels_admin_container" v-if="!kicked">
        <button v-if="!admin" @click="make_admin">MAKE ADMIN</button>
        <button v-if="admin" @click="demote_admin">REVOKE</button>
        <button @click="kick_user">KICK</button>
    </div>
</div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserChannel',
  props: ['user'],
  data () {
    return ({
      admin: this.user.admin,
      kicked: false
    })
  },
  methods: {
    make_admin () {
      // TODO make unadmin request to server
      this.admin = true
    },
    demote_admin () {
      // TODO make admin request to server
      this.admin = false
    },
    kick_user () {
      // TODO make kick request to server
      this.kicked = true
    }
  }
})

</script>

<style>

.admin {
  color:green;
}

.kicked {
  color: red;
}

#channels_admin_container {
  display: flex;
}

</style>
