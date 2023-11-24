<template>
	<div class="overlay">
		<div class="messages_holder">
			<div class="message_wrapper">
					<div v-for="(member, index) in this.members" :key="index" class="one_message_container" :style="'animation-delay: ' + index * 0.15 + 's'">
						<li :class="{member: true, message: true, admin: check_is_admin(member), owner: member == this.owner}" @click="this.$emit('user_interact', member) ">{{member}}</li>
					</div>
				<button class="close_popup" @click="this.$emit('close_interaction')">Close</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ViewMembersPopup",
	props: ['members', 'admins', 'owner'],
	methods: {
		check_is_admin(member) {
			for (var a in this.admins)
				if (member == this.admins[a])
					return true;
			return false;
		}
	},

}
</script>

<style>
.admin {
	color: red;
}

.owner {
	color: green;
}

.member {
	cursor: pointer;
}
</style>
