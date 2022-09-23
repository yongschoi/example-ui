<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
          >
            {{ trace.location[n-1] }}
          </v-stepper-step>
          <v-divider
            v-if="n !== steps"
            :key="n"
          ></v-divider>
        </template>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data () {
    return {
      e1: '',
      steps: '',
      delivery: this.$route.params,
      trace: ''
    }
  },
  created() {
    this.getTrace()
  },
  methods: {
    getTrace() {
      axios.get(`${this.$traceAPIUri}/no/${this.delivery.no}`)
        .then(res => {
          this.trace = res.data
          this.e1 = this.trace.status+1
          this.steps = this.trace.location.length        
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>