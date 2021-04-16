import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue';
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
