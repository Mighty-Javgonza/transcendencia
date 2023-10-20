<template>
<div>
	<div class="item_drop_wrapper">
		<div class="item-border">
			<img class="item_image" :src="require('@/assets/' + item.image)" @click="show_drop()">
		</div>
		<transition name="fade">
			<div v-if="drop_enabled" class="dropdown_wrapper">
				<ul class="dropdown_list">
					<li v-for="(option, index) in item.options" :key="index" class="dropdown_option" @click="close_drop()">{{ option.text }}
					</li>
				</ul>
			</div>
		</transition>
	</div>
</div>
</template>

<script>

import * as pearl from "../assets/sample_pearl.json"
export default {
	name: 'InventoryGrid',
	data() {
		return ({
			item:pearl,
			drop_enabled:false
		});
	},
	methods: {
		show_drop () {
			this.drop_enabled = true
		},
		close_drop () {
			this.drop_enabled = false
		}
	}
}

</script>

<style>
.item_image {
	width: 100px;
	height: 100px;
	padding: 3px;
	margin-top: 3px;
}

.item_image:hover {
	border: solid;
	border-color: #497ae5;
	border-width:3px;
	padding: 0px;
}

.item-border {
	border: solid;
	border-width: 3px;
	border-color: #f7e06c;
}

.item_drop_wrapper {
	width: 120px;
	height: 120px;
	margin: 10vw;
}

.dropdown_wrapper {
	background-color: #497ae5;
	text-align:center;
	border-radius:10px;
	border-style: solid;
	border-color: #efcd23;
	position:relative;
	width: 20vw;
	left: -20%;
	top: -50%;
}

.dropdown_option {
	text-align:center;
	cursor: pointer;
	color: #000000;
	font-family: monospace;
	padding: 0;
	margin: 0.1vw 0.8vw;
}

.dropdown_option:hover {
	text-align:center;
	cursor: pointer;
	background-color: #1cbeef;
	color: #ffffff;
}

.dropdown_list {
	list-style-type: none;
	padding: 0;
	margin: 0;
	text-align:center;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
	top: 100%;
}

.fade-enter-active, .fade-leave-active {
	transition: all .5s;
}

</style>
