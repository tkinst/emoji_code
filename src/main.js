import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import Vue2TouchEvents from 'vue2-touch-events'
import './vee-validate'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.use(VueMask, {})
Vue.use(Vue2TouchEvents)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
