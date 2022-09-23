<template>
<v-container>
  <v-select
    :items="categorylist"
    v-model="category"
    label="제품분류를 선택하세요"
    solo
    @change="search(category)"
  ></v-select>
  <v-row nowrap>
    <v-col><v-checkbox :disabled="!checkboxValid" v-model="domestic" :label="`국산`" @click="filterCheck()"></v-checkbox></v-col>
    <v-col><v-checkbox :disabled="!checkboxValid" v-model="oversea" :label="`수입`" @click="filterCheck()"></v-checkbox></v-col>
    <v-col><v-checkbox :disabled="!checkboxValid" v-model="shipfree" :label="`배송비 무료`" @click="filterCheck()"></v-checkbox></v-col>
  </v-row>
  <v-simple-table>    
    <template v-slot:default>
      <thead>
        <tr bgcolor="lightgrey">
          <th class="text-center">IMAGE</th>
          <th class="text-center">NAME</th>
          <th class="text-right">PRICE</th>
          <th class="text-right">Shipping Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td align=center>
            <v-avatar size="100">
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
</v-container> 
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      checkboxValid: false,
      category: '',
      domestic: true,
      oversea: true,
      shipfree: false,
      products: [],
      origin_products: [],
      categorylist: []
    }
  },
  created() {
    this.getCategoryList()
  },
  filters: {
    currency: function(value) {
      let num = new Number(value)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
    }
  },
  methods: {
    getCategoryList() {   
      axios.get(`${this.$productAPIUri}/category`)
        .then(res => { 
          res.data.forEach(e => this.categorylist.push(e.name))
        })
        .catch(err => {
          console.log(err)
        })

    },
    search(category) {
      this.checkboxValid = true    
      axios.get(`${this.$productAPIUri}/category/${category}`)
        .then(res => { 
          this.products = res.data
          console.log(this.products[0].name)
          console.log(this.products[0].imageUrl)
          this.origin_products = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    filterCheck() {
      if(!this.shipfree)
        if(this.domestic) {
          if(this.oversea) this.products = this.origin_products
          else this.products = this.origin_products.filter(product => product.madein == 0)
        } else {
          if(this.oversea) this.products = this.origin_products.filter(product => product.madein == 1)
          else this.products = null
        }
      else
        if(this.domestic) {
          if(this.oversea) this.products = this.origin_products.filter(product => product.shippingfee == 0)
          else this.products = this.origin_products.filter(product => product.madein == 0 && product.shippingfee == 0)
        } else {
          if(this.oversea) this.products = this.origin_products.filter(product => product.madein == 1 && product.shippingfee == 0)
          else this.products = null
        }
    } 
  }
}
</script>