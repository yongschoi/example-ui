<template>
  <v-simple-table>    
    <template v-slot:default>
      <thead>
        <tr bgcolor="lightgrey">
          <th class="text-center">Name</th>
          <th class="text-center">Email</th>
          <th class="text-center">Score</th>
          <th class="text-center">Photo</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="text-center">{{ user.name }}</td>
          <td class="text-center">{{ user.email }}</td>
          <td class="text-center">{{ user.score }}</td>
          <td align=center>
            <v-avatar size="40">
              <v-img :src="user.photoUrl"></v-img>
            </v-avatar>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>    
</template>
<script>
import axios from "axios"

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
    findByAll() {
      axios.get(`${this.$userAPIUri}/excludezero`)
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