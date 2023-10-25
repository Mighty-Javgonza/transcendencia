<template>
<div class="item_drop_wrapper">
	<div class="item-border">
		<div class="item-glow" v-if="item.glow"></div>
		<img class="item_image" :src="require('@/assets/' + item.image)" @click="show_drop()">
	</div>
	<div v-if="drop_enabled" class="dropdown_wrapper">
		<ul class="dropdown_list">
			<li v-for="(option, index) in item.options" :key="index" class="dropdown_option" @click="act(option.action)">{{ option.text }}
			</li>
		</ul>
	</div>
</div>
</template>


<script>

export default {
	name: 'InventoryItemPearl',
	props: ['pearl'],
	data() {
		return ({
			item:this.pearl,
			drop_enabled:false
		});
	},
	methods: {
		show_drop () {
			this.drop_enabled = true
		},
		close_drop () {
			this.drop_enabled = false
		},
		act (action) {
			if (action == "send_message") {
				this.$emit('enable_message_popup', this.pearl.target_user);
				this.close_drop();
			} else if (action == "view_messages") {
				this.$emit('enable_view_messages_popup', this.pearl.target_user)
				this.item.glow = false;
				this.close_drop();
			} else if (action == "close_drop") {
				this.close_drop()
			} else {
				console.log("ERROR: Unrecognised option");
			}
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

.item-glow {
	border-radius:50%;
	position:absolute;
	width: 20px;
	height:20px;
	margin: 50px;
	animation-name: glow_animation;
	animation-duration: 0.75s;
	animation-direction: alternate;
	animation-iteration-count: infinite;
	animation-timing-function: ease-in;
	z-index: -1;
}

@keyframes glow_animation {
	from {box-shadow: 0 0 40px 40px #497ae5;}
	to {box-shadow: 0}
}


.item_drop_wrapper {
	width: 120px;
	height: 120px;
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

</style>
