import Vue from 'vue'
const electron = require('vue-electron');
let $electron = null;

if (!process.env.IS_WEB) $electron = Vue.use(electron);

export default $electron && $electron.prototype && $electron.prototype.$electron
