import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue/dist/bootstrap-vue.esm'
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
