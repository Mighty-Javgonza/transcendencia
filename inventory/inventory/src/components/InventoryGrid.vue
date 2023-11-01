<template>

<div class="ItemDistributor">
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="fpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="npearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="mpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="ppearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="gjpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="fjpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="njpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="mjpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="pjpearl"/>
	<InventoryItemPearl @enable_message_popup="(login, sender) => relay_message_popup_event(login, sender)" @enable_view_messages_popup="(login, sender) => relay_view_messages_popup_event(login, sender)" :pearl="gjpearl"/>

</div>

</template>


<script>
import InventoryItemPearl from './InventoryItemPearl.vue'
import fpearl from '../assets/fgata_pearl.json'
import npearl from '../assets/npinto_pearl.json'
import mpearl from '../assets/mmateo_pearl.json'
import ppearl from '../assets/pdiaz_pearl.json'
import gpearl from '../assets/guilmira_pearl.json'
import fjpearl from '../assets/fgata_javgonza_pearl.json'
import njpearl from '../assets/npinto_javgonza_pearl.json'
import mjpearl from '../assets/mmateo_javgonza_pearl.json'
import pjpearl from '../assets/pdiaz_javgonza_pearl.json'
import gjpearl from '../assets/guilmira_javgonza_pearl.json'

export default {
	name: "InventoryGrid",
	components: {
		InventoryItemPearl
	},
	data () {
		return ({
			"fpearl": fpearl,
			"npearl": npearl,
			"mpearl": mpearl,
			"ppearl": ppearl,
			"gpearl": gpearl,
			"fjpearl": fjpearl,
			"njpearl": njpearl,
			"mjpearl": mjpearl,
			"pjpearl": pjpearl,
			"gjpearl": gjpearl
		});
	},
	methods: {
		relay_message_popup_event (login, sender) {
			this.$emit('enable_message_popup', login, sender);
		},
		relay_view_messages_popup_event (login, sender) {
			this.$emit('enable_view_messages_popup', login, sender);
		}
	}
}

</script>

<style>
.ItemDistributor {
	margin: 0 5vw;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(117px, 117px));
}
</style>

