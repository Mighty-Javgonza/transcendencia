import { createApp } from 'vue'
import App from './App.vue'

declare global {
  var logToken: string
  var id: string
  var has2FA : boolean
}

globalThis.has2FA = false

createApp(App).mount('#app')
