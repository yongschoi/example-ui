<template>
  <v-container style="max-width:450px;">
      <v-text-field
              readonly
              dense
              filled
              label="이메일"
              :value=user.email
        ></v-text-field>
      <v-text-field
              readonly
              dense
              filled
              label="이름"
              :value=user.name
        ></v-text-field>
        <v-text-field
              readonly
              dense
              filled
              label="Score"
              :value=user.score
        ></v-text-field>
        <v-card
          class="mx-auto"
          max-width="430"
        >
          <v-img
            max-height="350"
            :src="user.photoUrl"
          ></v-img>
        </v-card>
        <v-container class="text-center">
          <v-btn
            color="orange darken-2"
            dark
            @click="updateUser"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
            </v-btn>
        </v-container>
  </v-container>  
</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      user: '',
      email: this.$route.params.email
    }
  },
  created() {
    this.findByEmail(this.email)
  },                   
  methods: {
    findByEmail(email) {
      axios.get(`${this.$userAPIUri}/email/${email}`)
        .then(res => {
          this.user = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateUser() {
      // User 수정화면으로 이동
      this.$router.push({ name: 'updateuser', params: this.user })
    }
  }
}
</script>