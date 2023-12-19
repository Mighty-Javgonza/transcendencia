<template>

<div class="ItemDistributor">
	<!--InventoryItem @change_active_description="relay_description_change" :item_data="fpearl"/-->
	<InventoryItem v-for="(group,index) in groups" :key="index" @change_active_description="relay_description_change" :item_data="group"/>

</div>

</template>


<script>
import InventoryItem from './InventoryItem.vue'
import generate_pearl from '../generate_pearl.js'
import generate_rosary from '../generate_rosary.js'
import { backend, getRequestParams, postRequestParams } from './connect_params'

export default {
	name: "InventoryGrid",
	components: {
		InventoryItem
	},
	data () {
		return ({
          groups: [],
          my_id: globalThis.id
//			"fpearl": generate_pearl("javgonza", "fata-va"),
//			"npearl": generate_pearl("javgonza", "npinto-g"),
//			"mpearl": generate_pearl("javgonza", "mmateo-t"),
//			"ppearl": generate_pearl("javgonza", "pdiaz-pa"),
//			"gpearl": generate_pearl("javgonza", "guilmira"),
//			"fjpearl": generate_pearl("fata-va", "javgonza"),
//			"njpearl": generate_pearl("npinto-g", "javgonza"),
//			"mjpearl": generate_pearl("mmateo-t", "javgonza"),
//			"pjpearl": generate_pearl("pdiaz-pa", "javgonza"),
//			"gjpearl": generate_pearl("guilmira", "javgonza"),
//			"rosary": generate_rosary("Javi", 1),
		});
	},
	methods: {
		relay_description_change (new_description) {
			this.$emit('change_active_description', new_description);
		}
	},
    created() {
      fetch(backend + '/' + globalThis.id + '/chats', getRequestParams).then((r) => {
        r.json().then((answer) => {
          for (const chat in answer) {
            this.groups.push(generate_rosary(globalThis.id, answer[chat].id))
          }
        })
      })
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

