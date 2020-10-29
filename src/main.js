import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.prototype.$userAPIUri = "http://127.0.0.1:8081";
Vue.prototype.$productAPIUri = "http://127.0.0.1:8082";

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
