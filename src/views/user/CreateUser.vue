<template>
  <v-container style="max-width:450px;">
    <v-form ref="form" v-model="valid">
      <v-text-field
              dense
              outlined
              label="이메일"
              v-model="email"
              :rules="emailRules"
        ></v-text-field>
      <v-text-field
              dense
              outlined
              label="이름"
              v-model="name"
              :rules="nameRules"
        ></v-text-field>
        <v-file-input
              v-model="photo"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              placeholder="프로필 사진을 선택하세요"
              outlined
              :rules="photoRules"
        ></v-file-input>
    </v-form>
    <div class="text-center">
      <v-btn
        color="primary"
        depressed
        @click="createUser"
      >
        <v-icon left>
          mdi-content-save
        </v-icon>
        Save
      </v-btn>
    </div>
  </v-container>  
</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      valid: true, // form 전체
      email: '',
      name: '',
      score: '',
      photo: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      photoRules: [
        v => !!v || 'Photo is required',
      ]
    }
  },
  created() {
  },                   
  methods: {
    createUser() {
      if(!this.$refs.form.validate()) return
      
      let formData = new FormData()
      formData.append('email', this.email)
      formData.append('name', this.name)
      formData.append('file', this.photo)

      axios.post(`${this.$userAPIUri}/create`, formData, { 
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
    }
  }
}
</script>