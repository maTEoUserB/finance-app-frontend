<template>
  <div class="transaction-page">
    <HeaderUser />

    <main class="content">
      <h2>Twoje transakcje</h2>

      <div class="filter-section">
        <input type="text" v-model="search" placeholder="Podaj tytuł transakcji" />
        <button @click="isFilterModalVisible = true">Filtruj</button>
        <button class="back-button" @click="router.push('/')">Wróć na stronę główną</button>
      </div>

      <TransactionCard
          v-for="(tx, index) in filteredTransactions"
          :key="index"
          :transaction="tx"
          @delete="deleteTransaction(index)"
      />
      <teleport to="body">
        <div v-if="isFilterModalVisible" class="modal-overlay">
          <div class="modal">
            <h3>Filtruj transakcje</h3>

            <label>Data od:
              <input type="date" v-model="filters.dateFrom" />
            </label>

            <label>Data do:
              <input type="date" v-model="filters.dateTo" />
            </label>

            <label>Kategorie:</label>
            <div class="checkbox-list">
              <div v-for="category in allCategories" :key="category">
                <label class="checkbox-item">
                  <input
                      type="checkbox"
                      :value="category"
                      v-model="filters.categories"
                  />
                  {{ category }}
                </label>
              </div>
            </div>

            <label>Typ:
              <select v-model="filters.type">
                <option value="">Wszystkie</option>
                <option value="income">Przychód</option>
                <option value="expense">Wydatek</option>
              </select>
            </label>

            <label>Kwota od:
              <input type="number" step="0.01" v-model.number="filters.amountFrom" />
            </label>

            <label>Kwota do:
              <input type="number" step="0.01" v-model.number="filters.amountTo" />
            </label>

            <div class="modal-actions">
              <button class="wyczysc-modal-button" @click="cancelFilter">Wyczyść</button>
              <button class="zastosuj-modal-button" @click="applyFilter">Zastosuj</button>
            </div>
          </div>
        </div>
      </teleport>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue'
import HeaderUser from '@/components/HeaderUser.vue'
import TransactionCard from '@/components/TransactionCard.vue'
import { useRouter } from 'vue-router'
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";

const router = useRouter()

const isFilterModalVisible = ref(false)

const allCategories = [
  "Pensja", "Zlecenia", "Dochody pasywne", "Akcje", "Stypendia",
  "Zasiłki", "Darowizny", "Rachunki/opłaty", "Żywność", "Transport",
  "Zdrowie/higiena", "Edukacja", "Rodzina", "Rozrywka"
]

const search = ref('')

const transactions = ref([])

const getAllTransactions = async () => {
  try {
    const token = keycloak.token;

    const res = await axios.get(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)

    transactions.value = res.data

  } catch (err) {
    console.error('Błąd podczas pobierania danych:', err)
    alert('Błąd podczas pobierania danych.')
  }
}

onMounted(() => {
  getAllTransactions()
})

const filters = ref({
  dateFrom: '',
  dateTo: '',
  categories: [],
  type: '',
  amountFrom: null,
  amountTo: null
})

const filteredTransactions = computed(() =>
    transactions.value.filter(tx => {
      const titleMatch = tx.transactionTitle.toLowerCase().includes(search.value.toLowerCase())
      const categoryMatch =
          filters.value.categories.length === 0 ||
          filters.value.categories.includes(tx.category)
      const typeMatch = !filters.value.type || tx.type === filters.value.type
      const amountMatch =
          (!filters.value.amountFrom || tx.amount >= filters.value.amountFrom) &&
          (!filters.value.amountTo || tx.amount <= filters.value.amountTo)
      const dateMatch =
          (!filters.value.dateFrom || tx.transactionDate >= filters.value.dateFrom) &&
          (!filters.value.dateTo || tx.transactionDate <= filters.value.dateTo)

      return titleMatch && categoryMatch && typeMatch && amountMatch && dateMatch
    })
)

const applyFilter = () => {
  isFilterModalVisible.value = false
}

const cancelFilter = () => {
  isFilterModalVisible.value = false
  filters.value = {
    dateFrom: '',
    dateTo: '',
    categories: [],
    type: '',
    amountFrom: null,
    amountTo: null
  }
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #f1f1dc;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal h3 {
  margin-top: 0;
}

.modal input,
.modal select {
  width: 100%;
  padding: 0.4rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.wyczysc-modal-button {
  background-color: #8b0000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.zastosuj-modal-button {
  background-color: #228b22;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 160px; /* wysokość scrollowalnego obszaru */
  overflow-y: auto;
  padding-right: 4px;
  align-items: flex-start;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #f0f0f0;
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.95rem;
  cursor: pointer;
  width: auto;
  min-width: max-content;
  white-space: nowrap;
}

.checkbox-list::-webkit-scrollbar {
  width: 6px;
}

.checkbox-list::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 6px;
}

</style>
