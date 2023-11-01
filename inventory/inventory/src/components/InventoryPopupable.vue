<template>
<InventoryGrid @enable_message_popup="activate_message_popup" @enable_view_messages_popup="activate_view_messages_popup"/>
<SendMessagePopup :target="message_login" :sender="message_sender" v-if="message_popup" @close="disable_message_popup"/>
<ViewMessagesPopup :target="message_login" :messages="view_messages" v-if="view_messages_popup" @close="disable_view_messages_popup"/>
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
		message_login: "crisfern",
		view_messages: []
	}
  },
  methods: {
		activate_message_popup(login, sender) {
			this.message_login = login;
			this.message_sender = sender;
			this.message_popup = true;
		},
		disable_message_popup() {
			this.message_popup = false;
		},
		activate_view_messages_popup(sender, me) {
			this.message_login = sender;
			this.view_messages_popup = true;
			try {
				fetch ("http://localhost:4242/receive_messages?"+ new URLSearchParams({
						recipient:me
				})).then((result) => {
					result.text().then((t) => {
						const json = JSON.parse(t);
						let messages_array = [];
						for (let row in json) {
							messages_array.push(json[row].message);
						}
						this.view_messages = messages_array;
					});
				});
			} catch (e) {
				console.log(e)
			}
		},
		disable_view_messages_popup() {
			this.view_messages_popup = false;
			this.view_messages = [];
		}
	}
}
</script>

<style>
</style>
