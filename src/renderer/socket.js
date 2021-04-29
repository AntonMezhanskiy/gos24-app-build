import Vue from 'vue'
import io from 'socket.io-client';
const VueSocketIOExt = require('vue-socket.io-extended');

export const socket = io(process.env.VUE_APP_API_SOCKET, {
    reconnection: true,
    path: '/socket.io'
});

Vue.use(VueSocketIOExt, socket);
