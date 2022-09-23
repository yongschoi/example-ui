<template>
<v-container>
  <v-text-field
    outlined
    v-model="name"
    label="제품명을 입력하세요"
    append-icon="mdi-magnify"
    @click:append="search(name)"
    v-on:keyup.enter="search(name)">
  ></v-text-field>
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
      name: '',
      products: []
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
    search(name) {
      axios.get(`${this.$productAPIUri}/name/${name}`)
        .then(res => { 
          this.products = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>