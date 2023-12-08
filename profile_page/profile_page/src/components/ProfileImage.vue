<template>
    <div class=profile_image_container>
      <img v-if="!this.editing" class="avatar_image" :src="image">
      <input v-if="this.editing" class="avatar_image" type="file" @change="readFile" accept="image/*">
      <EditField v-if="this.editable" @start_edit="start_edit" @cancel_edit="cancel_edit" @accept_edit="accept_edit"/>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import defaultAvatar from '../assets/default_avatar.jpg'
import EditField from './EditField.vue'

export default defineComponent({
  name: 'ProfileImage',
  props: ['editable'],
  components: {
    EditField
  },
  data () {
    return ({
      image: defaultAvatar,
      editing: false
    })
  },
  methods: {
    getAvatarImage () {
      // TODO change "this.image" by requesting to server
    },
    created () {
      this.getAvatarImage()
    },
    start_edit () {
      this.editing = true
    },
    cancel_edit () {
      this.editing = false
    },
    accept_edit () {
      // TODO upload image
      this.editing = false
    },
    readFile (event) {
      if (event.target.files[0] !== undefined) {
        try {
          const newImage = URL.createObjectURL(event.target.files[0])
          this.image = newImage
        } catch (e) {
        }
      }
    }
  }
})
</script>

<style>

.avatar_image {
  min-width: 4em;
  width: 15vw;
  min-height: 4em;
  height: 15vw;
  border:solid;
  border-width: 6px;
  border-color: var(--border_color);
  border-radius: 2px;
  margin: 1em;
}

.profile_image_container {
  display: flex;
}

</style>
