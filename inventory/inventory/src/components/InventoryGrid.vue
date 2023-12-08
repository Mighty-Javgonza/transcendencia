<template>

<div class="ItemDistributor">
	<InventoryItem @change_active_description="relay_description_change" :item_data="fpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="npearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="mpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="ppearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="gpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="fjpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="njpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="mjpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="pjpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="gjpearl"/>
	<InventoryItem @change_active_description="relay_description_change" :item_data="rosary"/>

</div>

</template>


<script>
import InventoryItem from './InventoryItem.vue'
import generate_pearl from '../generate_pearl.js'
import generate_rosary from '../generate_rosary.js'

export default {
	name: "InventoryGrid",
	components: {
		InventoryItem
	},
	data () {
		return ({
			"fpearl": generate_pearl("javgonza", "fata-va"),
			"npearl": generate_pearl("javgonza", "npinto-g"),
			"mpearl": generate_pearl("javgonza", "mmateo-t"),
			"ppearl": generate_pearl("javgonza", "pdiaz-pa"),
			"gpearl": generate_pearl("javgonza", "guilmira"),
			"fjpearl": generate_pearl("fata-va", "javgonza"),
			"njpearl": generate_pearl("npinto-g", "javgonza"),
			"mjpearl": generate_pearl("mmateo-t", "javgonza"),
			"pjpearl": generate_pearl("pdiaz-pa", "javgonza"),
			"gjpearl": generate_pearl("guilmira", "javgonza"),
			"rosary": generate_rosary("Javi", 1),
		});
	},
	methods: {
		relay_description_change (new_description) {
			this.$emit('change_active_description', new_description);
		}
	}
}

</script>

<style>
.ItemDistributor {
	margin: 0 5vw;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(140px, 140px));
}
</style>

