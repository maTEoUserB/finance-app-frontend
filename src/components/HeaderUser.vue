<template>
  <header class="header">
    <div class="container">
      <div class="left">
        <img src="/ZeniVault_LOGO.png" alt="ZeniVault logo" class="logo" />
      </div>
      <div class="buttons">
        <div class="left-buttons">
          <router-link to="/dodaj-cel" class="nav-link">Dodaj cel</router-link>
          <router-link to="/dodaj-termin" class="nav-link">Dodaj termin płatności</router-link>
          <router-link to="/dodaj-transakcje" class="nav-link">Dodaj transakcję</router-link>
        </div>
        <div class="right-buttons">
          <button @click="logout" class="btn filled">Wyloguj</button>
          <button class="btn filled" @click="goToAccount">Moje konto</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {keycloak} from "../auth/keycloak.js";

const logout = () => {
  keycloak.logout({
    redirectUri: 'http://localhost:5173/'
  });
};

const goToAccount = () => {
  window.location.href = keycloak.createAccountUrl({ redirectUri: 'http://localhost:5173/home' })
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
  font-size: 0.9rem;
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
  font-size: 1.05rem;
}

.btn.filled {
  background: #5118fd;
  color: white;
}

.nav-link {
  color: white;
  font-size: 1.05rem;
  font-weight: normal;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.2s ease, text-decoration 0.2s ease;
}

.nav-link:hover {
  color: #2EC0FB;
}

.router-link-exact-active.nav-link {
  color: #2EC0FB;
  text-decoration: underline;
}

</style>
<script setup lang="ts">
</script>