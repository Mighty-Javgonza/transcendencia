<template>
	<div class="sub_interaction_wrapper" v-if="this.interaction != 'none'">
		<ViewMessagesPopup @close_interaction="close" v-if="this.interaction == 'viewing_messages'" :messages="['Hola', 'Buenos días']"/>
		<SendMessagePopup @close_interaction="close" v-if="this.interaction == 'sending_message'"/>
		<SetPasswordPopup @close_interaction="close" @set_password="set_password" v-if="this.interaction == 'setting_password'"/>
		<InputPasswordPopup @close_interaction="close" @unlock_password="unlock_password" v-if="this.interaction == 'unlocking_password'"/>
		<ViewMembersPopup @close_interaction="close" @user_interact="user_interact" :members="users_in_chat" v-if="this.interaction == 'displaying_members' || this.interaction == 'making_admin' || this.interaction == 'unmaking_admin' || this.interaction == 'kicking_member'"/>
	</div>
</template>

<script>
import SendMessagePopup from './SendMessagePopup'
import ViewMessagesPopup from './ViewMessagesPopup'
import SetPasswordPopup from './SetPasswordPopup'
import InputPasswordPopup from './InputPasswordPopup'
import ViewMembersPopup from './ViewMembersPopup'

const server_url = "http://localhost:3000"
const post_request_params = {
  method: 'POST',
  mode: 'cors',
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'
  },
  body: JSON.stringify({})
}

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
				if (member != this.item.sender)
				{
                  //TODO change check
					if (member.isAdmin)
					{
						if (member.isOwner)
							this.$emit('kick_member', member)
					}
					else
						this.$emit('kick_member', member)
				}
			}
		},
		check_is_admin(member) {
			if (member.isOwner)
				return false;
            return (member.isAdmin)
		},
        getUsersInChat(id) {
          if (this.item.item_type == "rosary")
          {
            fetch(server_url + "/chats/"+ id +"/users", post_request_params).then((response) => {
                response.json().then( (r) => {
                  this.users_in_chat = r;
                });
            });
          }
        }
	},
    data () {
      return ({
        users_in_chat: []
        })
    },
    mounted() {
      this.getUsersInChat(this.item.id);
    }
}
</script>

<style>
</style>
