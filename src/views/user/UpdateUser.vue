<template>
  <v-container style="max-width:450px;">
    <v-form ref="form" v-model="valid">
      <v-text-field
              dense
              readonly
              filled
              label="이메일"
              :value=email
      ></v-text-field>
      <v-text-field
              dense
              outlined
              label="이름"
              v-model="name"
              :rules="nameRules"
        ></v-text-field>
        <v-text-field
              dense
              outlined
              label="Score"
              v-model="score"
        ></v-text-field>
        <v-card
          class="mx-auto"
          max-width="430"
        >
          <v-img
            max-height="350"
            :src="this.user.photoUrl"
          ></v-img>
          <v-btn
            color="teal accent-4"
            text
            @click="showHandler"
          >       
            Change profile photo
          </v-btn>
          <v-container style="max-width:420px;">
            <v-file-input
              v-if="isShow"
              v-model="photo"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              outlined
            ></v-file-input> 
          </v-container>
        </v-card>
    </v-form>
    <v-container class="text-center">
      <v-btn
        color="primary"
        depressed
        @click="updateUser"
      >
        <v-icon left>
          mdi-content-save
        </v-icon>
        Save
      </v-btn>
    </v-container>
  </v-container>  
</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      user: this.$route.params,
      valid: true, // form 전체
      id: '',
      email: '',
      name: '',
      score: '',
      photo: null,
      isShow: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }
  },
  created() {
    this.id = this.user.id
    this.email = this.user.email
    this.name = this.user.name
    this.score = this.user.score
  },                   
  methods: {
    updateUser() {
      if(!this.$refs.form.validate()) return

      let formData = new FormData()
      let userData = {
        id: this.id,
        email: this.email,
        name: this.name,
        score: this.score
      }
      formData.append(
        'user', new Blob([JSON.stringify(userData)], { type: "application/json" })
      )
      formData.append('file', this.photo)

      axios.put(`${this.$userAPIUri}/update`, formData, { 
        headers : {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        console.log(res)
        this.$router.push({ name: 'user', params: {email: this.email} })
      }).catch(err => {
        console.log(err);
        this.catchStatus(err)
      }); 
    },
    showHandler() {
      this.isShow = !this.isShow
    }
  }
}
</script>