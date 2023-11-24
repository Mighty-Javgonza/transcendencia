<template>
	<div class="sub_interaction_wrapper" v-if="this.interaction != 'none'">
		<ViewMessagesPopup @close_interaction="close" v-if="this.interaction == 'viewing_messages'" :messages="['Hola', 'Buenos días']"/>
		<SendMessagePopup @close_interaction="close" v-if="this.interaction == 'sending_message'"/>
		<SetPasswordPopup @close_interaction="close" @set_password="set_password" v-if="this.interaction == 'setting_password'"/>
		<InputPasswordPopup @close_interaction="close" @unlock_password="unlock_password" v-if="this.interaction == 'unlocking_password'"/>
		<ViewMembersPopup @close_interaction="close" @user_interact="user_interact" :members="this.item.target" :admins="this.item.admins" :owner="this.item.owner" v-if="this.interaction == 'displaying_members' || this.interaction == 'making_admin' || this.interaction == 'unmaking_admin' || this.interaction == 'kicking_member'"/>
	</div>
</template>

<script>
import SendMessagePopup from './SendMessagePopup'
import ViewMessagesPopup from './ViewMessagesPopup'
import SetPasswordPopup from './SetPasswordPopup'
import InputPasswordPopup from './InputPasswordPopup'
import ViewMembersPopup from './ViewMembersPopup'

export default {
	name: 'SubItemInteraction',
	props: ['interaction', 'item'],
	components: {
		SendMessagePopup,
		ViewMessagesPopup,
		InputPasswordPopup,
		SetPasswordPopup,
		ViewMembersPopup,
	},
	methods: {
		close () {
			this.$emit('close_interaction');
		},
		set_password(password) {
			this.$emit('set_password', password);
			this.close();
		},
		unlock_password(password) {
			this.$emit('unlock_password', password)
		},
		user_interact(member) {
			if (this.interaction == 'making_admin')
			{
				if (!this.check_is_admin(member))
					this.$emit('make_admin', member)
			} else if (this.interaction == 'unmaking_admin') {
				if (this.check_is_admin(member))
					this.$emit('unmake_admin', member)
			} else if (this.interaction == 'kicking_member') {
				console.log("HOLAA " + member);
				if (member != this.item.sender)
				{
					if (this.check_is_admin(member))
					{
						if (this.item.sender == this.item.owner)
							this.$emit('kick_member', member)
					}
					else
						this.$emit('kick_member', member)
				}
			}
		},
		check_is_admin(member) {
			if (member == this.item.owner)
				return false;
			for (var a in this.item.admins)
				if (member == this.item.admins[a])
					return true;
			return false;
		}
	}
}
</script>

<style>
</style>
