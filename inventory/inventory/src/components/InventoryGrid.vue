<template>

<div class="ItemDistributor">
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="fpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="npearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="mpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="ppearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="gpearl"/>

	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="fpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="npearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="mpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="ppearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="gpearl"/>

	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="fpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="npearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="mpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="ppearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="gpearl"/>

	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="fpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="npearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="mpearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="ppearl"/>
	<InventoryItemPearl @enable_message_popup="(login) => relay_message_popup_event(login)" @enable_view_messages_popup="(login) => relay_view_messages_popup_event(login)" :pearl="gpearl"/>
</div>

</template>


<script>
import InventoryItemPearl from './InventoryItemPearl.vue'
import fpearl from '../assets/fgata_pearl.json'
import npearl from '../assets/npinto_pearl.json'
import mpearl from '../assets/mmateo_pearl.json'
import ppearl from '../assets/pdiaz_pearl.json'
import gpearl from '../assets/guilmira_pearl.json'

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
			"gpearl": gpearl
		});
	},
	methods: {
		relay_message_popup_event (login) {
			this.$emit('enable_message_popup', login);
		},
		relay_view_messages_popup_event (login) {
			this.$emit('enable_view_messages_popup', login);
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

