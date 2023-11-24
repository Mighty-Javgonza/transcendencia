<template>
<!--<InventoryPopupable/>-->
<!--<ViewMessagesPopup :messages="['Un buen día,', 'mi buen amigo, fgata-va', 'me invitó a un baile.', '...', '', 'Imagínense mi felicidad.', '', 'Qué buena es la vida.']"/>-->
<ButtonedInventory/>

</template>

<script>
//import InventoryPopupable from './components/InventoryPopupable.vue'
//import ViewMessagesPopup from './components/ViewMessagesPopup.vue'
import ButtonedInventory from './components/ButtonedInventory.vue'

export default {
  name: 'App',
  components: {
//		InventoryPopupable,
		ButtonedInventory,
//		ViewMessagesPopup
  }
}
</script>

<style>
#app {
  text-align: center;
}

@font-face {
	font-family: 'joystix';
	src: url('~@/assets/fonts/joystix_monospace.otf') format('opentype');
}
</style>
