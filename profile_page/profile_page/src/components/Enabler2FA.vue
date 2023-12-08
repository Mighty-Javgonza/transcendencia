<template>
    <button class="fa_button" v-if="!enabled && !enabling" @click="enable" >Enable 2FA</button>
    <div class="qr_cage"  v-if="enabling">
        <img class="qr_code_image" :src="qr_image">
        <h3 class="fa_confirm_title" >Input Code To Confirm</h3>
        <textarea class="fa_code_input"></textarea>
        <button class="fa_button">Send Code</button>
    </div>
    <button class="fa_button" v-if="enabled">Disable 2FA</button>
</template>

<script>

import { defineComponent } from 'vue'
import QRNotReceived from '../assets/QR_no_recibido.png'

export default defineComponent({
  name: 'Enabler2FA',
  data () {
    return ({
      // TODO get from the server
      enabled: false,
      enabling: false,
      qr_image: QRNotReceived
    })
  },
  methods: {
    enable () {
      this.enabling = true
      // TODO request server to enable 2FA and change QR code
    }
  }
})

</script>

<style>

.qr_code_image {
  width: 200px;
  height: 200px;
}

.fa_code_input {
    resize: none;
    width: 6em;
    height: 1.5em;
    border: solid;
    border-color: var(--border_color);
    border-radius: 6px;
    color: black;
    background-color: white;
}

.fa_button {
  border: solid;
  border-radius: 2px;
  border-width: 3px;
  width: 10em;
  height: 2.3em;
  color: white;
  border-color: var(--border_color);
  background-color: var(--pop_background);
  cursor: pointer;
  margin: 1em;
}

.fa_button:hover {
  background: var(--select_light)
}

.fa_confirm_title {
  margin: 0;
}

</style>
