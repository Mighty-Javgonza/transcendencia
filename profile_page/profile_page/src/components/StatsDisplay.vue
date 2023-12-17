<template>

<div>
    <OneStat title="Franciscoins" :value="franciscoins"/>
    <OneStat title="Won matches" :value="won"/>
    <OneStat title="Lost Matches" :value="lost"/>
    <OneStat title="Pearls" :value="pearls"/>
</div>

</template>

<script lang="ts">

import { defineComponent } from 'vue'
import OneStat from './OneStat.vue'
import { backend, getRequestParams } from './connect_params'

export default defineComponent({
  name: 'StatsDisplay',
  props: ['username'],
  components: {
    OneStat
  },
  methods: {
    setStats () {
      /* TODO request stats to server */
      fetch(backend + '/players/' + this.username, getRequestParams).then((r) => {
        r.json().then((data) => {
          this.franciscoins = 0
          this.won = data.wins
          this.lost = data.defeats
          this.pearls = 0
        })
      })
    }
  },
  data () {
    return ({
      franciscoins: 99,
      won: 99,
      lost: 99,
      pearls: 99
    })
  },
  created () {
    this.setStats()
  }

})

</script>
