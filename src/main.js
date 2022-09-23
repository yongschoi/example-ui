import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.prototype.$userAPIUri = "http://localhost:8081/user"
Vue.prototype.$productAPIUri = "http://localhost:8081/product"
Vue.prototype.$orderAPIUri = "http://localhost:8081/order"
Vue.prototype.$deliveryAPIUri = "http://localhost:8081/delivery"
Vue.prototype.$traceAPIUri = "http://localhost:8081/trace"

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
