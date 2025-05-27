import {createApp} from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import initRouter from './router';
import {keycloak, initKeycloak} from './auth/keycloak'; // zaimportuj keycloak

const app = createApp(App);
const router = initRouter;

initKeycloak()
    .then(() => {
        app.config.globalProperties.$keycloak = keycloak; // dostęp do keycloak w komponentach jako this.$keycloak
        app.use(createPinia());
        app.use(router);
        app.mount('#app');
    })
    .catch((err) => {
        console.error('Keycloak initialization failed:', err);
    });