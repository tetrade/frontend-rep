import {createRouter, createWebHistory} from 'vue-router';
import Main from '@/View/Main/main.vue';
import Catalog from '@/View/Catalog/catalog.vue';
import Login from '@/View/Login/login.vue';
import Cart from '@/View/Cart/cart.vue'
import Orders from '@/View/Cart/Orders/orders.vue'
import AddedCart from "@/View/Cart/usage/addedCart.vue";

const routes = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: Catalog,
        meta: {requiresAuth: true},
        beforeEnter: (to, from, next) => {
            if (!to.query.page) {
                return next({ path: '/catalog', query: { page: 1 } });
            }
            next();
        },
    },
    {
        path: '/main',
        name: 'Home',
        component: Main,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: {requiresAuth: true},
        children: [{
            path: 'added',
            name: 'added',
            component: AddedCart
        },
            {
                path: 'orders',
                name: 'orders',
                component: Orders
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('isAuth');
    console.log(isAuthenticated);
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});


export default router;
