<template>

	<div class="overlay">
		<div class="messages_holder">
			<div class="message_wrapper">
				<transition-group name="staggered-in" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter">
					<div v-for="message in this.messages" :key="message" class="one_message_container">
						<li class="message">{{message}}</li>
					</div>
				</transition-group>
				<button class="close_popup" @click="this.$emit('close_interaction')">Close</button>
			</div>
		</div>
	</div>


<!--	<div class="overlay">
		<div class="popup_background">
			<h3 class="top_title"> Displaying messages from <b>{{ this.target }}</b></h3>
			<div class="messages_background">
				<ul class="message_wrapper">
					<div v-for="message in this.messages" :key="message" class="one_message_container">
						<li class="message">{{message}}</li>
						<hr>
					</div>
				</ul>
			</div>
			<button class="close_popup" @click="this.$emit('close')">Close</button>
		</div>
	</div>-->
</template>

<script>
export default {
	name: "ViewMessagesPopup",
	props: ['target', 'messages', 'user'],
	methods: {

		beforeEnter: function (el) {
			el.style.opacity = 0;
		},
		enter: function (el) {
			el.style.opacity = '100%';
		},
		getMessages() {
			try {
				fetch ("http://localhost:4242/receive_messages?"+ new URLSearchParams({
						recipient:this.user
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
		}
	}
}

</script>

<style>

.one_message_container {
/*	background-color: #e7c06f;*/
	background-image: linear-gradient(135deg, #f9de63 15%, #eab538 40%);
	margin: 0.6em 0;
	min-height: 1.5em;
	padding: 0.2em;
	animation: enter_message;
	animation-duration: 1s;
}

.messages_holder {
	position:absolute;
	width: 40%;
	float: right;
	right:0;
}

/*.overlay {
	width: 100vw;
	height: 100vh;
	position:absolute;
	background-color: #bbbbbbdd;
	top: 0;
}

.popup_background {
	width: 45vw;
	height: 50vh;
	min-width: 300px;
	min-height: 200px;
	background-color: #497ae5;
	margin: 25%;
	border-style: solid;
	border-color: #efcd23; 
	border-radius: 10px;
	text-align: center;
}

.close_popup {
	margin: 2%;
	border-style: solid;
	border-color: #efcd23; 
	border-radius: 3px;
	width: 40%;
	height: 7%;
	font-size: 15px;
	font-family: monospace;
	cursor: pointer;
}

.messages_background {
	overflow-y: scroll;
	width: 70%;
	height: 71%;
	background-color: #1b1db5;
	border-style: solid;
	border-color: #efcd23; 
	border-radius: 10px;
	margin: 0 15%;
}
*/
.message_wrapper {
	padding: 0;
	font-family: monospace;
}

.message {
	padding: 0.5% 3%;
	margin: 0;
	list-style-type:none;
	font-family: joystix;
/*	color: #ffffff;*/
}

</style>
