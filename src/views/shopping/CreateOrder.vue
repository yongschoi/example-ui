<template>
  <v-stepper
    v-model="e6"
    vertical
  >
    <v-stepper-step
      :complete="e6 > 1"
      step="1">
      <p v-if="user=='' || user.id==0">
        <v-avatar color="indigo" size="40">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>   
      </p>
      <p v-else>
        <v-avatar color="indigo" size="40">
          <v-img :src="user.photoUrl"></v-img>
        </v-avatar> 
      </p>
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-text-field
        outlined
        v-model="email"
        label="e-mail을 입력하세요"
        append-icon="mdi-magnify"
        @click:append="searchEmail(email)"
        v-on:keyup.enter="searchEmail(email)">
      ></v-text-field>
    </v-stepper-content>

    <v-stepper-step
      :complete="e6 > 2"
      step="2">
      <v-card
        v-if="product!==''"
      >
        <v-avatar color="indigo" size="40">
          <v-img :src="product.imageUrl"></v-img>
        </v-avatar>
        <v-card-title>{{product.name}}</v-card-title>
        <v-card-subtitle>총비용: {{product.price + product.shippingfee | currency}}</v-card-subtitle>
      </v-card>
      <p v-else>제품선택</p>
    </v-stepper-step>
    <v-stepper-content step="2">
      <v-text-field
        outlined
        ref="ref_productname"
        v-model="productname"
        label="구매할 제품명을 입력하세요"
        append-icon="mdi-magnify"
        @click:append="searchProduct(productname)"
        v-on:keyup.enter="searchProduct(productname)">
      ></v-text-field>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr v-for="product in products" :key="product.id" @click="selectProduct(product)">
            <td align=center>
              <v-avatar size="40">
                <v-img :src="product.imageUrl"></v-img>
              </v-avatar>
            </td>
            <td class="text-center">{{ product.name }}</td>
            <td class="text-right">{{ product.price | currency}}</td>
            <td class="text-right">{{ product.shippingfee | currency}}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-stepper-content>
    <v-stepper-step
      :complete="e6 > 3"
      step="3">
      <p v-if="account!==''">{{account}}</p>
      <p v-else>결제정보</p>
    </v-stepper-step>
    <v-stepper-content step="3">
      <v-text-field
        outlined
        ref="ref_account"
        v-model="account"
        label="결제정보를 입력하세요"
        v-on:keyup.enter="payment()">
      ></v-text-field>
    </v-stepper-content>
    
    <v-stepper-step
      :complete="e6 > 4"
      step="4">
      <p v-if="address!==''">{{address}}</p>
      <p v-else>배송정보</p>
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-text-field
        outlined
        ref="ref_address"
        v-model="address"
        label="주소를 입력하세요">
      ></v-text-field>
      <v-btn
        :disabled="ordered"
        color="primary"
        @click="order()"
      >
        주문요청
      </v-btn>
    </v-stepper-content>
    <v-stepper-step
      v-show = "ordered"
      complete
      step="5">
      주문이 완료되었습니다
    </v-stepper-step>
  </v-stepper>
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      e6: 1,
      email: '',
      productname: '',
      user: '',
      product: '',
      account: '',
      total: '',
      address: '',
      products: [],
      ordered: false
    }
  },
  created() {
  },
  filters: {
    currency: function(value) {
      let num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  methods: {
    searchEmail(email) {
      axios.get(`${this.$orderAPIUri}/useremail/${email}`)
        .then(res => { 
          this.user = res.data
          if(this.user.id !== 0) {
            this.e6 = 2
            this.$refs["ref_productname"].focus()
          } else {
            alert('없는 사용자입니다.')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchProduct(productname) {
      axios.get(`${this.$orderAPIUri}/productname/${productname}`)
        .then(res => {
          this.products = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectProduct(product) {
      this.product = product
      this.e6 = 3
      this.$refs["ref_account"].focus()
    },
    payment() {
      this.total = this.product.price + this.product.shippingfee
      this.e6 = 4
      this.$refs["ref_address"].focus()
    },
    order() {
      axios.post(`${this.$orderAPIUri}/create`, {
        qty: 1,
        product: this.product,
        user: this.user,
        pay: {account: this.account, total: this.total},
        delivery: {address: this.address}
      }).then((res) => {
        console.log(res.data)
        this.e6 = 5
        this.ordered = true
      }).catch(err => {
        console.log(err)
      }) 
    } 
  }
}
</script>