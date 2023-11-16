<template>

<div class="ItemDistributor">
	<InventoryItem :item_data="fpearl"/>
	<InventoryItem :item_data="npearl"/>
	<InventoryItem :item_data="mpearl"/>
	<InventoryItem :item_data="ppearl"/>
	<InventoryItem :item_data="gpearl"/>
	<InventoryItem :item_data="fjpearl"/>
	<InventoryItem :item_data="njpearl"/>
	<InventoryItem :item_data="mjpearl"/>
	<InventoryItem :item_data="pjpearl"/>
	<InventoryItem :item_data="gjpearl"/>
	<InventoryItem :item_data="rosary"/>

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
			"rosary": generate_rosary(["guilmira", "fgata-va", "npinto-g", "javgonza"], "javgonza", "javgonza", ["fgata-va"]),
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
	grid-template-columns: repeat(auto-fill, minmax(117px, 117px));
}
</style>

