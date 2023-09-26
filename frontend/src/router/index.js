//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'log',
        component: () => import( /* webpackChunkName: "login" */ '../views/posts/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/register',
        name: 'reg',
        component: () => import( /* webpackChunkName: "register" */ '../views/Register.vue')
    },
    {
        path: '/posts',
        name: 'posts.index',
        component: () => import( /* webpackChunkName: "index" */ '../views/posts/index.vue')
    },
    {
        path: '/create',
        name: 'posts.create',
        component: () => import( /* webpackChunkName: "create" */ '../views/posts/create.vue')
    },
    {
        path: '/edit/:id',
        name: 'posts.edit',
        component: () => import( /* webpackChunkName: "edit" */ '../views/posts/edit.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes // <-- routes,
})

export default router