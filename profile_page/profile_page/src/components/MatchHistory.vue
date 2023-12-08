<template>

<div class ="history_container">
    <OneStat v-for="(entry, index) in this.history" :key="index" :title="entry.rivals[0] + ' - ' + entry.rivals[1]" :value="entry.result[0] + ' - ' + entry.result[1]"/>
</div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import OneStat from './OneStat.vue'

export default defineComponent({
  name: 'MatchHistory',
  components: {
    OneStat
  },
  methods: {
    setHistory () {
      // TODO request matchs from  server
      const history = [
        { rivals: ['javgonza', 'fgata-va'], result: ['0', '3'] },
        { rivals: ['javgonza', 'fgata-va'], result: ['3', '5'] },
        { rivals: ['javgonza', 'npinto-g'], result: ['0', '3'] },
        { rivals: ['javgonza', 'guilmira'], result: ['12', '21'] }
      ]
      return (history)
    }
  },
  data () {
    return ({
      history: this.setHistory()
    })
  }
})

</script>

<style>

.history_container {
  width: 100%;
  margin: 0 1em;
}
</style>
