<template>
  <div class="calendar-page">
    <HeaderUser />

    <main class="content">
      <h2>Twoje terminy płatności</h2>

      <div class="tabs-bar">
        <button :class="{ active: activeTab === 'notPaid' }" @click="activeTab = 'notPaid'">
          Niezapłacone
        </button>
        <button :class="{ active: activeTab === 'paid' }" @click="activeTab = 'paid'">
          Zapłacone
        </button>
        <button class="back-button" @click="router.push('/home')">Wróć na stronę główną</button>
      </div>

      <div v-if="activeTab === 'notPaid' || activeTab === 'paid'" class="search-bar">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Podaj tytuł terminu"
        />
      </div>

      <div class="main-section">
        <div class="obligations">
          <ObligationCardNotPaid
              v-if="activeTab === 'notPaid'"
              v-for="(item, index) in filteredUnpaid"
              :key="index"
              :obligation="item"
          />
          <ObligationCardPaid
              v-if="activeTab === 'paid'"
              v-for="(item, index) in filteredPaid"
              :key="index"
              :obligation="item"
          />
        </div>

        <div class="calendar-wrapper">
          <Calendar :obligations="unpaid" />
        </div>
      </div>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import HeaderUser from '@/components/HeaderUser.vue'
import ObligationCardPaid from '@/components/ObligationCardPaid.vue'
import ObligationCardNotPaid from '@/components/ObligationCardNotPaid.vue'
import Calendar from '@/components/Calendar.vue'

const router = useRouter()
const activeTab = ref('notPaid')
const searchQuery = ref('')

const unpaid = [
  { title: 'Rachunek za gaz', date: '2025-06-09', amount: '150', category: 'Rachunki/opłaty' },
  { title: 'Rachunek za prąd', date: '2025-06-12', amount: '200', category: 'Rachunki/opłaty' }
]

const paid = [
  { title: 'Rachunek za internet', date: '2025-05-10', amount: '100', category: 'Rachunki/opłaty' },
  { title: 'Rachunek za wodę', date: '2025-05-05', amount: '80', category: 'Rachunki/opłaty' }
]

const filteredUnpaid = computed(() =>
    unpaid.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

const filteredPaid = computed(() =>
    paid.filter(item =>
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)
</script>

<style scoped>
.calendar-page {
  background-color: #5118fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

h2 {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.tabs-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tabs-bar button {
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: #1e0f55;
  color: white;
  font-weight: bold;
}

.tabs-bar button.active {
  background-color: white;
  color: #5118fd;
}

.back-button {
  background-color: #1e0f55;
  color: white;
  padding: 0.6rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 2rem;
}

.search-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1rem;
}

.search-bar input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  width: 300px;
  font-size: 1rem;
}

.main-section {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.obligations {
  flex: 1 1 600px;
  min-width: 400px;
}

.calendar-wrapper {
  flex: 0 0 320px;
  max-width: 320px;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
  margin-top: auto;
}
</style>
