import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$userAPIUri = "http://localhost:8081";
Vue.prototype.$productAPIUri = "http://localhost:8082";

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
