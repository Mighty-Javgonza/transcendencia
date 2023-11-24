<template>

<OneStat v-for="stat in this.stats" :key="stat" :title="stat.title" :value="stat.value"/>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import OneStat from './OneStat.vue'

export default defineComponent({
  name: 'StatsDisplay',
  components: {
    OneStat
  },
  methods: {
    setStats () {
      /* TODO request stats to server */
      const stats = [{ title: 'Franciscoins', value: '33' },
        { title: 'Won matches', value: '4' },
        { title: 'Lost Matches', value: '10' },
        { title: 'Pearls', value: '30' }]
      return stats
    }
  },
  data () {
    return ({
      stats: this.setStats()
    })
  }

})

</script>
