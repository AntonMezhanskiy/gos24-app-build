import Vue from 'vue'
import io from 'socket.io-client';
const VueSocketIOExt = require('vue-socket.io-extended');
// const url = 'http://localhost:8989';
const url = 'https://gos24.kz/socket.io';
export const socket = io(url, {reconnection: true});
Vue.use(VueSocketIOExt, socket);
