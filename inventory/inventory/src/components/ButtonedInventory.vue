<template>

<img class="inventory_button" :src="require('@/assets/' + this.current_image)" @click="toggle_inventory">
<InventoryPopupable v-if="this.inventory_opened" @close_request="close_inventory()" />


</template>

<script>
import InventoryPopupable from "./InventoryPopupable.vue"

export default {
	name: "ButtonedInventory",
	components: {
		InventoryPopupable,
	},
	data () {
		return ({
			inventory_opened: false,
			current_image: "Bolsa1.png"
		});
	},
	methods: {
		close_inventory () {
			this.inventory_opened = false;
		},
		toggle_inventory () {
            const animation_delay = 60;
			if (!this.inventory_opened)
            {
              this.current_image = "Bolsa2.png"
              setTimeout(() => {this.current_image = "Bolsa3.png"}, animation_delay);
              setTimeout(() => {this.current_image = "Bolsa4.png"}, animation_delay * 2);
              setTimeout(() => {this.inventory_opened = !this.inventory_opened;}, animation_delay * 3);
            }
			else
            {
              this.inventory_opened = !this.inventory_opened;
              setTimeout(() => {this.current_image = "Bolsa3.png"}, animation_delay);
              setTimeout(() => {this.current_image = "Bolsa2.png"}, animation_delay * 2);
              setTimeout(() => {this.current_image = "Bolsa1.png"}, animation_delay * 3);
            }
		}
	}
}
</script>

<style>

.inventory_button {
	width: 50px;
	height: 50px;
	cursor: pointer;
}

</style>
