<template>
  <v-container style="max-width:450px;">
      <v-text-field
              dense
              readonly
              filled
              label="주문번호"
              :value=this.order.no
      ></v-text-field>
      <v-card
        class="mx-auto"
        max-width="max-width:450px;"
      >
        <v-card-title>
          {{ order.product.name }}
        </v-card-title>
        <v-img
          max-height="200"
          :src="order.product.imageUrl"
        ></v-img>
        <v-card-subtitle>
          {{ order.pay.account }} / {{ order.pay.total | currency }}
        </v-card-subtitle>
        <v-card-actions>
          <v-btn
            color="red accent-5"
            text
          >
            {{ status }} 
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            icon
            @click="show = !show"
          >
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <v-container v-show="show" style="max-width:420px;">
            <v-form ref="form" v-model="valid">
              <v-select
                :items="trace.location"
                v-model="toStatus"
                label="배송상태변경"
                solo
                @change="toStatus==trace.location"
              ></v-select>
              <v-text-field
                dense
                outlined
                label="배송지"
                v-model="address"
                :rules="addressRules"
              ></v-text-field>           
            </v-form>
          </v-container>
        </v-expand-transition>
      </v-card>  
    <v-container class="text-center">
      <v-btn
        color="primary"
        depressed
        @click="updateOrder"
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
      order: this.$route.params,
      valid: true, // form 전체
      show: false,
      status: '',
      toStatus: '',
      address: '',
      trace: '',
      addressRules: [
        v => !!v || '배송지 is required'
      ],
    }
  },
  created() {
    this.address = this.order.delivery.address
    this.getStatus(this.order.delivery.no)
  },
  filters: {
    currency: function(value) {
      let num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },                   
  methods: {
    getStatus(no) {
      axios.get(`${this.$traceAPIUri}/no/${no}`)
        .then(res => {
          this.trace = res.data
          this.status = this.trace.location[this.trace.status-1]
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateOrder() {
      if(!this.$refs.form.validate()) return

      // 주소 update
      let deliveryData = new FormData()
      deliveryData.append('no', this.order.delivery.no)
      deliveryData.append('address', this.address)

      axios.put(`${this.$deliveryAPIUri}/updateAddress`, {
        no: this.order.delivery.no,
        address: this.address
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

      // 배송상태 변경시에만 update
      if(this.toStatus != '' && this.status != this.toStatus) {
        axios.put(`${this.$traceAPIUri}/updateStatus`, {
          no: this.trace.no,
          status: this.trace.location.findIndex(x => x === this.toStatus)+1
        }).then(res => {
          console.log(res.data)
          this.status = this.toStatus
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
}
</script>