<template>
	<div class="overlay">
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
	</div>
</template>

<script>
export default {
	name: "ViewMessagesPopup",
	props: ['target', 'messages'],
}

</script>

<style>
.overlay {
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

.message_wrapper {
	padding: 0;
	font-family: monospace;
}

.message {
	padding: 0.5% 3%;
	margin: 0;
	list-style-type:none;
	color: #ffffff;
}

</style>
