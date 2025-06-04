<template>
  <header class="header">
    <div class="container">
      <div class="left">
        <img src="/ZeniVault_LOGO.png" alt="ZeniVault logo" class="logo" />
      </div>
      <div class="buttons">
        <div class="left-buttons">
          <router-link
              to="/informacje"
              :class="['btn', 'ghost', { active: route.path === '/informacje' }]"
          >
            O nas
          </router-link>
        </div>
        <div class="right-buttons">
          <button class="btn filled" @click="login">Zaloguj się</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { keycloak } from '../auth/keycloak.js'

const route = useRoute()

const login = () => {
  keycloak.login({
    redirectUri: 'http://localhost:5173/home'
  });
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #180555;
  padding: 1rem 2rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 40px;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.left-buttons,
.right-buttons {
  display: flex;
  gap: 1rem;
}

.right-buttons {
  margin-left: 3rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 999px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.85;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

.btn.ghost {
  background: #180555;
  color: white;
  font-weight: normal;
  font-size: 1.3rem;
  text-decoration: none;
}

.btn.filled {
  background: #5118fd;
  color: white;
}

.btn.ghost.active {
  color: #2EC0FB;
  text-decoration: underline;
  background: transparent;
}
</style>
