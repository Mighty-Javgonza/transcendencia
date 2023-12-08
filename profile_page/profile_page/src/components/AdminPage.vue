<template>

<h1>ADMIN PAGE</h1>

<div class="admin_page_columns_container">
    <div class="admin_page_column" id="user_ban">
        <h3>Users</h3>
        <User v-for="(user,index) in users" :key="index" :user="user"/>
    </div>

    <div class="admin_page_column" id="user_ban">
        <h3>Channels</h3>
        <Channel v-for="(channel,index) in channels" :key="index" :channel="channel"/>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import User from './User.vue'
import Channel from './Channel.vue'

export default defineComponent({
  name: 'AdminPage',
  components: {
    User,
    Channel
  },
  data () {
    return {
      users: [{ name: 'javgonza', banned: false },
        { name: 'fgata-va', banned: true },
        { name: 'npinto-g', banned: false },
        { name: 'mmateo-t', banned: false },
        { name: 'pdiaz-pa', banned: false },
        { name: 'guilmira', banned: false }
      ],
      channels: [{
        name: 'Debate sociopolítico',
        users: [{ name: 'javgonza', banned: false },
          { name: 'fgata-va', admin: true },
          { name: 'npinto-g', admin: false },
          { name: 'mmateo-t', admin: false },
          { name: 'pdiaz-pa', admin: false },
          { name: 'guilmira', admin: false }
        ]
      },
      {
        name: 'Open mic',
        users: [{ name: 'javgonza', banned: false },
          { name: 'fgata-va', admin: true },
          { name: 'npinto-g', admin: false },
          { name: 'mmateo-t', admin: false },
          { name: 'pdiaz-pa', admin: false },
          { name: 'guilmira', admin: false }
        ]
      }
      ]
    }
  }
})

</script>

<style>

.admin_page_column {
  display: flex;
  flex-direction:column;
  margin: 0 5%;
}

#user_ban {
    width: 30vw;
}

.admin_page_columns_container {
  display: flex;
}

</style>
