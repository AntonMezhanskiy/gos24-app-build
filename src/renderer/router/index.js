import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue';
import HomeForOldWindowsVersion from '../views/HomeForOldWindowsVersion.vue';
import ContextMenu from '../views/ContextMenu.vue';
import Login from '../views/Login.vue';

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: 'Центр уведомлений',
            auth: true
        }
    },
    {
        path: '/home-modal',
        name: 'ContextMenu',
        component: ContextMenu,
        meta: {
            title: 'Центр уведомлений'
        }
    },
    {
        path: '/home-for-old',
        name: 'HomeForOldWindowsVersion',
        component: HomeForOldWindowsVersion,
        meta: {
            title: 'Центр уведомлений',
            auth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        // component: () => import( /* webpackChunkName: "Login" */ "../views/Login.vue"), // /* webpackChunkName: "Login" */
        meta: {
            title: 'Авторизация'
        }
    }
];
const router = new Router({
    routes: routes
});

// router.beforeEach(async (to, from, next) => {
//     document.title = `${to.meta.title} - ИТС Госсектор24`;
//
//     const isAuth = router.app.$options.store.getters['isAuth'];
//
//     if (to.meta.auth && !isAuth) {
//         next({path: '/login', query: {redirect: to.fullPath}});
//         return;
//     }
//
//     next();
// });
export default router;
