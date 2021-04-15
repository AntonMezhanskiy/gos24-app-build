import Vue from 'vue'
import io from 'socket.io-client';
const VueSocketIOExt = require('vue-socket.io-extended');

// const url = 'http://localhost:8989';
const url = 'http://test.gos24.kz';
// const url = 'https://gos24.kz';

export const socket = io(url, {
    reconnection: true,
    path: '/socket.io'
});

Vue.use(VueSocketIOExt, socket);
