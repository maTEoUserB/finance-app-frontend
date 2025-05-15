<template>
  <div class="transaction-page">
    <HeaderUser />

    <main class="content">
      <h2>Twoje transakcje</h2>

      <div class="filter-section">
        <input type="text" v-model="search" placeholder="Podaj tytuł transakcji" />
        <button @click="applyFilter">Filtruj</button>
        <button class="back-button" @click="router.push('/')">Wróć na stronę główną</button>
      </div>

      <TransactionCard
          v-for="(tx, index) in filteredTransactions"
          :key="index"
          :transaction="tx"
          @delete="deleteTransaction(index)"
      />

    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeaderUser from '@/components/HeaderUser.vue'
import TransactionCard from '@/components/TransactionCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const search = ref('')
const transactions = ref([
  {
    date: '12.05.2025',
    title: 'Rachunek za gaz',
    description: 'Rachunek za gaz za maj...',
    amount: -150,
    category: 'Rachunki/opłaty'
  },
  {
    date: '10.05.2025',
    title: 'Wypłatka',
    description: 'Wleciało 5 tysiaków...',
    amount: 5000,
    category: 'Pensja'
  },
  {
    date: '09.05.2025',
    title: 'Jedzenie',
    description: 'A byłam sobie w restauracji...',
    amount: -65,
    category: 'Rozrywka'
  },
  {
    date: '09.05.2025',
    title: 'Bilecik miesięczny',
    description: 'Znów trzeba bulić za komunikację...',
    amount: -51,
    category: 'Transport'
  }
])

const filteredTransactions = computed(() =>
    transactions.value.filter(tx =>
        tx.title.toLowerCase().includes(search.value.toLowerCase())
    )
)

const applyFilter = () => {
  // obecnie działa na bieżąco, więc ten przycisk nie musi nic robić
}

const deleteTransaction = (index) => {
  transactions.value.splice(index, 1)
}
</script>

<style scoped>
.transaction-page {
  background-color: #5118fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

h2 {
  text-align: center;
  color: white;
  margin-bottom: 1.5rem;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-section input {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  width: 300px;
  max-width: 100%;
  font-size: 1rem;
}

.filter-section button {
  background-color: #1e0f55;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
  white-space: nowrap;
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
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
  margin-top: auto;
}
</style>
