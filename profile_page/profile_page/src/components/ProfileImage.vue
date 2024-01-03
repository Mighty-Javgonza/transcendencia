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
import { backend, postRequestParams } from './connect_params'

export default defineComponent({
  name: 'ProfileImage',
  props: ['editable', 'path'],
  components: {
    EditField
  },
  data () {
    return ({
      image: defaultAvatar,
      editing: false,
      selected_image: ''
    })
  },
  created () {
    if (this.path !== undefined) {
      this.image = backend + '/' + this.path
    }
  },
  methods: {
    getAvatarImage () {
      // TODO change "this.image" by requesting to server
    },
//    created () {
//      this.getAvatarImage()
//    },
    start_edit () {
      this.editing = true
    },
    cancel_edit () {
      this.editing = false
    },
    accept_edit () {
      this.uploadImage()
      this.editing = false
    },
    readFile (event) {
      if (event.target.files[0] !== undefined) {
        this.selected_image = event.target.files[0]
        try {
          const newImage = URL.createObjectURL(event.target.files[0])
          this.image = newImage
        } catch (e) {
        }
      }
    },
    uploadImage() {
      const formData = new FormData()
      formData.append('image', this.selected_image)
      fetch(backend + '/users/' + globalThis.id + '/uploadProfilePic', {
        method: 'POST',
        body: formData
      })
    }
  }
  })
</script>

<style>

.avatar_image {
  min-width: 10em;
  max-width: 24em;
  width: 20vw;
  min-height: 10em;
  max-height: 24em;
  width: 20vw;
  border:solid;
  border-width: 6px;
  border-color: var(--border_color);
  border-radius: 2px;
  margin: 1em;
  image-rendering:pixelated;
}

.profile_image_container {
  display: flex;
}

</style>
