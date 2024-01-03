<template>

<div class="ItemDistributor">
	<InventoryItem v-for="(group,index) in groups" :key="index" @change_active_description="relay_description_change" :item_data="group"/>
	<InventoryItem v-for="(friendship_request,index) in frienship_requests" :key="index" @change_active_description="relay_description_change" :item_data="friendship_request"/>
	<InventoryItem v-for="(friend,index) in friends" :key="index" @change_active_description="relay_description_change" :item_data="friend"/>
	<InventoryItem v-for="(block,index) in blocks" :key="index" @change_active_description="relay_description_change" :item_data="block"/>

</div>

</template>


<script>
import InventoryItem from './InventoryItem.vue'
import generate_pearl from '../generate_pearl.js'
import generate_rosary from '../generate_rosary.js'
import generate_rose from '../generate_rose.ts'
import break_pearl from '../break_pearl.js'
import { backend, getRequestParams, postRequestParams } from './connect_params'

export default {
	name: "InventoryGrid",
	components: {
		InventoryItem
	},
	data () {
		return ({
          groups: [],
          my_id: globalThis.id,
          frienship_requests: [],
          friends: [],
          blocks: []
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
      fetch(backend + '/players/' + globalThis.id + '/getFrienshipRequests').then((r) => {
        r.json().then((answer) => {
          for (const friend in answer)
            this.frienship_requests.push(generate_rose(answer[friend].name, globalThis.id))
        })
      })
      fetch(backend + '/players/' + globalThis.id + '/getFriends').then((r) => {
        r.json().then((answer) => {
          for (const friend in answer)
            this.friends.push(generate_pearl(globalThis.id, answer[friend].name))
            fetch(backend + '/' + globalThis.id + '/blocks').then((r) => {
              r.json().then((answer) => {
                  for (const blocked in answer)
                      this.blocks.push(break_pearl(generate_pearl(globalThis.id, answer[blocked].name)))
                  for (const block in this.blocks) {
                    let blocked_user = this.blocks[block].target
                    console.log(blocked_user)
                    for (const friend in this.friends){
                      console.log(this.friends[friend].target + "   " + blocked_user)
                      if (this.friends[friend].target == blocked_user)
                        this.friends.splice(friend, 1)
                    }
                  }
             })
           })
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

