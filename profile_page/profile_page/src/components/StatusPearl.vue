<template>
    <img :class="{status_pearl: true, in_match_status: this.online_status == 'in_match', online_status: this.online_status == 'online'}" :src="image">
</template>

<script>
import { defineComponent } from 'vue'
import pearl from '../assets/pearl.png'

export default defineComponent({
  name: 'StatusPearl',
  data () {
    return ({
      image: pearl,
      online_status: this.getStatus()
    })
  },
  methods: {
    getStatus () {
    // TODO determine status making a request to the backend. valid Status is 'online', 'in_match' or 'offline'
      return ('in_match')
    }
  }
})
</script>

<style>

.status_pearl {
  width: 2em;
}

.online_status {
  filter: hue-rotate(90deg) contrast(110%) drop-shadow(0 0 0.35em green);
}

.in_match_status {
  filter: hue-rotate(290deg) contrast(110%) drop-shadow(0 0 0.35em crimson);
}

</style>
