import { createRouter, createWebHistory } from 'vue-router'
import {keycloak} from "../auth/keycloak.ts";

const initRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path:'/',
            name: 'start',
            component: () => import('../views/StartPage.vue'),
        },
        {
            path: '/home', name: 'home',
            component: () => import('../views/MainPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/dodaj-cel',
            name: 'SavingsGoalForm',
            component: () => import('../views/SavingsGoalForm.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/dodaj-termin',
            name: 'ObligationForm',
            component: () => import('../views/ObligationForm.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/dodaj-transakcje',
            name: 'TransactionForm',
            component: () => import('../views/TransactionForm.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/transakcje',
            name: 'TransactionPage',
            component: () => import('../views/TransactionPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/kategorie',
            name: 'CategoryPage',
            component: () => import('../views/CategoryPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/oszczednosci',
            name: 'SavingsGoalPage',
            component: () => import('../views/SavingsGoalPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/analiza',
            name: 'AnalysisPage',
            component: () => import('../views/AnalysisPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/kalendarz',
            name: 'CalendarPage',
            component: () => import('../views/CalendarPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/ustaw-saldo',
            name: 'SaldoPage',
            component: () => import('../views/SaldoPage.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/informacje',
            name: 'InformationPage',
            component: () => import('../views/InformationPage.vue'),
        }

    ],
})

initRouter.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !keycloak.authenticated) {
        keycloak.login({ redirectUri: window.location.origin + to.fullPath });
    } else {
        next();
    }
});

export default initRouter

