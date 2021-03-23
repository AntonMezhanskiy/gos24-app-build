import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'
// import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        paginationLimit: 18
    },
    getters: {
        isAuth (state) {
            return !!state.user;
        },
        user (state) {
            return state.user;
        },
        adminQa (state) {
            return !!(state.user && state.user.qaAdmin === true);
        },
        techSpec (state) {
            return !!(state.user && state.user.role === 2);
        },
        adminBlog (state) {
            return !!(state.user && state.user.blogAdmin === true);
        },
        userTarif (state) {
            return state.user && state.user.is_free_user;
        }
    },
    mutations: {
        SET_USER (state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        STORE_ACCESS_TOKEN (state, accessToken) {
            state.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        },
        STORE_REFRESH_TOKEN (state, refreshToken) {
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
        },
        LOGOUT_USER (state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
    plugins: [
        createPersistedState()
        // createSharedMutations()
    ],
    strict: process.env.NODE_ENV !== 'production'
})
