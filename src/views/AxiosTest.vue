<template>
  <div>{{ info }}</div>
</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => (this.info = res))
  }
}
</script>