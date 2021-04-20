import Vue from 'vue'
import axios from './axios'
import './socket'
import './vueElectron'

import App from './App'
import router from './router'
import store from './store'
import './assets/styles/main.css'

import moment from 'moment'
moment.locale('ru');

Vue.prototype.$moment = moment;

Vue.prototype.$axios = axios;
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
