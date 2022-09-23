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
    <v-pagination
      v-model="pageNum"
      :length="totalPage"
      :total-visible="5"
      @input="findByAll(pageNum)"
    ></v-pagination>
  </div>
</v-container>
</template>
<script>
import axios from "axios"

export default {
  data () {
    return {
      users: [],
      pageNum: 1,
      pageSize: 5,
      totalPage: 0
    }
  },
  created() {
    this.findByAll(this.pageNum)
  },                   
  methods: {
    findByAll(pageNum) {
      axios.get(`${this.$userAPIUri}/all?pageNum=${pageNum}&pageSize=${this.pageSize}`)
        .then(res => {
          this.users = res.data.list
          this.totalPage = res.data.pages
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