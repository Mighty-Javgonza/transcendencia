<template>
<InventoryGrid @enable_message_popup="activate_message_popup" @enable_view_messages_popup="activate_view_messages_popup"/>
<SendMessagePopup :target="message_login" v-if="message_popup" @close="disable_message_popup"/>
<ViewMessagesPopup :target="message_login" :messages="['Hola mundo', 'Adios mundo']" v-if="view_messages_popup" @close="disable_view_messages_popup"/>
</template>

<script>
import InventoryGrid from './InventoryGrid.vue'
import SendMessagePopup from './SendMessagePopup.vue'
import ViewMessagesPopup from './ViewMessagesPopup.vue'

export default {
  name: 'InventoryPopupable',
  components: {
	ViewMessagesPopup,
	InventoryGrid,
	SendMessagePopup
  },
  data () {
	return {
		message_popup: false,
		view_messages_popup: false,
		message_login: "crisfern"
	}
  },
  methods: {
		activate_message_popup(login) {
			this.message_popup = true;
			this.message_login = login;
		},
		disable_message_popup() {
			this.message_popup = false;
		},
		activate_view_messages_popup(login) {
			this.view_messages_popup = true;
			this.message_login = login;
		},
		disable_view_messages_popup() {
			this.view_messages_popup = false;
		}
	}
}
</script>

<style>
</style>
