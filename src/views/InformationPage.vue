<template>
  <div class="information-page">
    <HeaderGuest />

    <main class="content">
      <h1>O aplikacji ZeniVault</h1>

      <div class="center-wrapper">
        <section class="info-section">
          <p class="paragraph">
            ZeniVault to aplikacja finansowa, która pomaga Ci zarządzać swoim saldem, oszczędnościami, zobowiązaniami oraz kontrolować wydatki i przychody.<br><br>
            Oferujemy:
          </p>

          <ul class="paragraph">
            <li><span class="icon">💰</span><strong>Możliwość monitorowania swojego salda</strong> – miej podgląd swojego salda, również w przeliczeniu na euro.</li>
            <li><span class="icon">📊</span><strong>Analiza Twoich finansów</strong> – korzystaj ze strony "Analiza", aby zrozumieć na co wydajesz najwięcej i przeglądać takie parametry jak średnia wydatków czy przychodów.</li>
            <li><span class="icon">🗂️</span><strong>Kategorie finansowe</strong> – przypisuj transakcje i obligacje do kategorii dla lepszej organizacji budżetu.</li>
            <li><span class="icon">🏦</span><strong>Oszczędności</strong> – monitoruj swoje saldo oszczędnościowe, również w przeliczeniu na euro.</li>
            <li><span class="icon">🎯</span><strong>Cele oszczędnościowe</strong> – dodawaj swoje cele oszczędnościowe i monitoruj procent zaoszczędzenia konkretnego celu.</li>
            <li><span class="icon">📅</span><strong>Kalendarz zobowiązań</strong> – przeglądaj zapłacone i niezapłacone zobowiązania z podziałem na daty.</li>
            <li><span class="icon">🧾</span><strong>Historia transakcji</strong> – przeglądaj wszystkie swoje przychody i wydatki w jednym miejscu.</li>
            <li><span class="icon">🔒</span><strong>Bezpieczne logowanie</strong> – chroń swoje dane dzięki bezpiecznemu systemowi uwierzytelniania keycloak.</li>
          </ul>

          <p class="paragraph-2">
            ZeniVault to Twój osobisty asystent finansowy, który wspiera Cię w codziennym zarządzaniu pieniędzmi.
          </p>
        </section>
      </div>

      <button class="back-button" @click="router.push('/')">
        Wróć na stronę startową
      </button>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import HeaderGuest from '@/components/HeaderGuest.vue'

const router = useRouter()
</script>

<style scoped>
.information-page {
  background-color: #5118fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  color: #222;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
}

.back-button {
  background-color: #180555;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  margin: 2rem auto 0;
  display: block;
}

.paragraph {
  font-size: 18px;
}

.paragraph-2 {
  margin-top: 2rem;
  font-size: 18px;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.3rem;
  color: #5118fd;
}

.info-section {
  background-color: #f1f1dc;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-width: 1200px;
  height: 100%;
}

.info-section ul {
  margin-top: 1rem;
  padding-left: 1.2rem;
  list-style-type: disc;
}

.info-section li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
  margin-top: auto;
}
</style>
