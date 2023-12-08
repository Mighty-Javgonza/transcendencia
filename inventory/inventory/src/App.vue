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

:root {
  --border_color: #603f22;
  --pop_background: #392919;
  --select_light: #85d8e5d0;
}

@font-face {
	font-family: 'joystix';
	src: url('~@/assets/fonts/joystix_monospace.otf') format('opentype');
}

.bordered_popup {
  border-style: solid;
  border-color: var(--border_color);
  font-family: joystix;
  border-radius: 3px;
  border-width: 10px;
  background-color: var(--pop_background);
  color: white;
}
</style>
