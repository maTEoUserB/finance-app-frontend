import { createRouter, createWebHistory } from 'vue-router'

const initRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {path:'/start', name: 'start', component: () => import('../views/StartPage.vue'),},
         {path: '/', name: 'home', component: () => import('../views/MainPage.vue'),},

        {
            path: '/dodaj-cel',
            name: 'SavingsGoalForm',
            component: () => import('../views/SavingsGoalForm.vue'),
        },
        {
            path: '/dodaj-termin',
            name: 'ObligationForm',
            component: () => import('../views/ObligationForm.vue')
        },
        {
            path: '/dodaj-transakcje',
            name: 'TransactionForm',
            component: () => import('../views/TransactionForm.vue')
        },
        {
            path: '/transakcje',
            name: 'TransactionPage',
            component: () => import('../views/TransactionPage.vue')
        },
        {
            path: '/kategorie',
            name: 'CategoryPage',
            component: () => import('../views/CategoryPage.vue')
        },
        {
            path: '/oszczednosci',
            name: 'SavingsGoalPage',
            component: () => import('../views/SavingsGoalPage.vue')
        },
        {
            path: '/analiza',
            name: 'AnalysisPage',
            component: () => import('../views/AnalysisPage.vue')
        }
    ],
})

export default initRouter

