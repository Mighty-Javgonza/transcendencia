<template>
<InventoryPopupable/>
<!--<ViewMessagesPopup :messages="['Un buen día,', 'mi buen amigo, fgata-va', 'me invitó a un baile.', '...', '', 'Imagínense mi felicidad.', '', 'Qué buena es la vida.']"/>-->

</template>

<script>
import InventoryPopupable from './components/InventoryPopupable.vue'
//import ViewMessagesPopup from './components/ViewMessagesPopup.vue'

export default {
  name: 'App',
  components: {
		InventoryPopupable,
//		ViewMessagesPopup
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
	font-family: 'joystix';
	src: url('~@/assets/fonts/joystix_monospace.otf') format('opentype');
}
</style>
