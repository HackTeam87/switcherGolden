import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';
import getAPI from './plugins/api';
import router from './router/router';
import store from './vuex/store';

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(getAPI)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
