<template>

<div class="user_container">
    <p :class="{text_user: true, banned: is_banned}">{{user.name}}</p>
    <button v-if="!is_banned" @click="ban">BAN</button>
    <button v-if="is_banned" @click="unban">UNBAN</button>
</div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserAdmin',
  props: ['user'],
  data () {
    return ({
      is_banned: this.user.banned
    })
  },
  methods: {
    ban () {
      // TODO make ban request to server
      this.is_banned = true
    },
    unban () {
      // TODO make unban request to server
      this.is_banned = false
    }
  }
})

</script>

<style>

.banned {
  color:grey;
}

.user_container {
  display: flex;
}

.text_user {
  margin: 0.6em 1em;
}

</style>
