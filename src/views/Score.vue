<template>
  <v-simple-table>    
    <template v-slot:default>
      <thead>
        <tr bgcolor="lightgrey">
          <th class="text-center">NAME</th>
          <th class="text-center">EMAIL</th>
          <th class="text-center">SCORE</th>
          <th class="text-center">PHOTO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="text-center">{{ user.name }}</td>
          <td class="text-center">{{ user.email }}</td>
          <td class="text-center">{{ user.score }}</td>
          <td align=center>
            <v-avatar size="40">
              <v-img :src="user.photo"></v-img>
            </v-avatar>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>    
</template>
<script>
import axios from "axios"
import adapter from "axios/lib/adapters/http"

export default {
  data () {
    return {
      users: []
    }
  },
  created() {
    this.findByAll()
  },
  methods: {
    async findByAll() {
      await axios.get(`${this.$apiURI}/user/score`, { adapter })
        .then(res => { 
          this.users = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>