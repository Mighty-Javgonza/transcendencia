
<template>
    <img class="avatar_image" :src="image">
</template>

<script>
import { defineComponent } from 'vue'
import defaultAvatar from '../assets/default_avatar.jpg'

export default defineComponent({
  name: 'ProfileImage',
  data () {
    return ({
      image: defaultAvatar
    })
  },
  methods: {
    getAvatarImage () {
      // TODO change "this.image" by requesting to server
    }
  },
  created () {
    this.getAvatarImage()
  }
})
</script>

<style>

.avatar_image {
  width: 10vw;
}

</style>
