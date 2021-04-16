import Vue from 'vue'
import io from 'socket.io-client';
const VueSocketIOExt = require('vue-socket.io-extended');
const isDev = process.env.NODE_ENV === 'development';

let url = 'https://gos24.kz';

if (isDev) {
    // url = 'http://localhost:8989';
    url = 'http://test.gos24.kz';
}
export const socket = io(url, {
    reconnection: true,
    path: '/socket.io'
});

Vue.use(VueSocketIOExt, socket);
