import Vue from 'vue'
import axios from './axios'
import './socket'

import App from './App'
import router from './router'
import store from './store'
import './assets/styles/main.css'

import moment from 'moment'
moment.locale('ru');

Vue.prototype.$moment = moment;

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');
