import { createWebHistory, createRouter } from 'vue-router'
import MainPage from "@/pages/main/MainPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/frontend',
        component: () => import('@/pages/frontend/FrontendPage.vue')
    },
    {
        path: '/backend',
        component: () => import('@/pages/backend/BackendPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

