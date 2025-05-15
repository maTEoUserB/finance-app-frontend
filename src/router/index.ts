import { createRouter, createWebHistory } from 'vue-router'

const initRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/start', name: 'start', component: () => import('../views/StartPage.vue'),},
         {path: '/', name: 'home', component: () => import('../views/MainPage.vue'),}
    ],
})

export default initRouter

