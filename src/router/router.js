import Vue from 'vue';
import VueRouter from 'vue-router';
import OltMainPage from '../views/OltMainPage';
import OnuDetailPage from '../views/OnuDetailPage';


Vue.use(VueRouter);

const routes = [

    {
        name: 'home',
        path: '/',
        component: OltMainPage,
        props: true,
    },
    {
        name: 'OnuDetail',
        path: '/detail/',
        component: OnuDetailPage,
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    // base: 'localhost:8080',
    base: '/',
    routes
});

export default router;