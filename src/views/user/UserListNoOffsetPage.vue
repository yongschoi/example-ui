<template>
<v-container>
  <v-container>
    <v-btn
      class="mx-2"
      fab
      dark
      small
      color="primary"
      @click="createUser"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>
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
        <tr v-for="user in users" :key="user.id" @click="selectUser(user)">
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
  <div class="text-center">
    <v-btn
      color="primary"
      width="300"
      :disabled="lastPage"
      @click="findByAll"
    >
      <v-icon left>
        mdi-arrow-collapse-down
      </v-icon>
      Next
    </v-btn>
  </div>
</v-container>
</template>
<script>
import axios from "axios"

export default {
  data () {
    return {
      users: [],
      lastId: 0,
      pageSize: 5,
      lastPage: false
    }
  },
  created() {
    this.findByAll()
  },                   
  methods: {
    findByAll() {
      axios.get(`${this.$userAPIUri}/allnooffset?lastId=${this.lastId}&pageSize=${this.pageSize}`)
        .then(res => {
          let dataSize = res.data.length
          this.users = res.data   
          // 데이터가 있는경우에만 lastInstanceId 셋팅
          if(dataSize != 0 ) this.lastId = res.data[dataSize-1].id
          // 마지막 페이지 셋팅
          if(dataSize != this.pageSize || dataSize == 0) this.lastPage = true
        })
        .catch(err => {
          console.log(err)
        })
    },
    createUser() {
      // User 등록화면으로 이동
      this.$router.push({ name: 'createuser' })
    },
    selectUser(user) {
      this.$router.push({ name: 'user', params: {email: user.email}})
    }
  }
}
</script>