<template>
<v-container>
  <v-text-field
    outlined
    v-model="email"
    label="e-mail을 입력하세요"
    append-icon="mdi-magnify"
    @click:append="searchEmail(email)"
    v-on:keyup.enter="searchEmail(email)">
  ></v-text-field>
  <v-simple-table>    
    <template v-slot:default>
      <thead>
        <tr bgcolor="lightgrey">
          <th class="text-left">주문시간</th>
          <th class="text-center">주문번호</th>
          <th class="text-center">제품정보</th>
          <th class="text-center">주문수량</th>
          <th class="text-center">주문금액</th>
          <th class="text-center">결제정보</th>
          <th class="text-center">배송조회</th>        
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderlist" :key="order.id">
          <td class="text-left">{{ getDateFormat(order.no) }}</td>
          <td class="text-center"><router-link :to="{name: 'updateorder', params: order}">{{ order.no }}</router-link></td>
          <td class="text-center">{{ order.product.name }}</td>
          <td class="text-center">{{ order.qty }}</td>
          <td class="text-center">{{ order.pay.total | currency }}</td>
          <td class="text-center">{{ order.pay.account }}</td>
          <td class="text-center"><router-link :to="{name: 'trace', params: order.delivery}">{{ order.delivery.no }}</router-link></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      email: '',
      orderlist: [],
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
    getDateFormat(timemillis) {
      let date = new Date(timemillis)
      if(date !== null) {
        let hour = date.getHours()
        let minute = date.getMinutes()
        let fullDate = `${date.getFullYear()}년${date.getMonth()+1}월${date.getDate()}일`
        return `${fullDate} ${hour}시${minute}분`
      }
    },
    searchEmail(email) {
      axios.get(`${this.$orderAPIUri}/all/${email}`)
        .then(res => { 
          if(res.data.length === 0) {
            alert('주문 내역이 없습니다.')
          } else {
            this.orderlist = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>