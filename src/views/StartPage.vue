<template>
  <div class="start-page">
    <HeaderGuest />

    <main class="main-content">
      <section class="left">
        <img src="/ZeniVault_napis.png" alt="ZeniVault" class="logo-text" />
        <p class="subtitle">Kontroluj z nami swoje finanse</p>
        <input type="text" v-model="username" placeholder="twojnickname" class="nick-input" />
        <button class="start-button" @click="login">Zacznij teraz</button>
      </section>

      <section class="right">
        <img src="/starting_picture.png" alt="Ilustracja" class="illustration" />
      </section>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import HeaderGuest from '@/components/HeaderGuest.vue'
import {keycloak} from "@/auth/keycloak.js";
import {ref} from "vue";

const username = ref()

const login = () => {
  keycloak.login({
    redirectUri: 'http://localhost:5173/home',
    loginHint: username.value
  });
};
</script>

<style scoped>
.start-page {
  background-color: #5118fd;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem;
  flex: 1;
  gap: 2rem;
  flex-wrap: wrap;
}

.left {
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 12rem;
  margin-top: -40px;
  align-items: center; /* ← wyśrodkowuje poziomo wszystkie dzieci */
  text-align: center;
}

.logo-text {
  max-width: 550px;
}

.subtitle {
  font-size: 2rem;
  margin-top: -0.5rem;
}

.nick-input {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  margin-top: 2.5rem;
}

.start-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 999px;
  background-color: #180555;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
}

.start-button:hover {
  opacity: 0.85;
  transform: scale(1.02);
  transition: all 0.2s ease;
}

.right .illustration {
  max-width: 550px;
  width: 100%;
  transform: rotate(6deg);
  margin-top: -40px;
  margin-left: -40px;
  transition: transform 0.3s ease;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
}
</style>
