<template>
    <StatsDisplay/>
    <h3>{{this.username}}</h3>
    <StatusPearl/>
    <ProfileImage/>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StatsDisplay from './components/StatsDisplay.vue'
import StatusPearl from './components/StatusPearl.vue'
import ProfileImage from './components/ProfileImage.vue'

export default defineComponent({
  name: 'App',
  components: {
    StatsDisplay,
    StatusPearl,
    ProfileImage
  },
  data () {
    return ({
      // TODO make username a prop. (And probaby pass it to every other element)
      username: 'javgonza'
    })
  }
})
</script>

<style>
#app {
  text-align: center;
}
</style>
