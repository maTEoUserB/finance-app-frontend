<template>
  <div class="main-page">
    <HeaderUser/>

    <main class="cards-grid">
      <Card title="MOJE SALDO" icon="/moje_saldo.png">
        <p class="value">{{ saldo }} PLN</p>
        <p class="converted">➡ {{ euroSaldo }} EUR</p>
      </Card>

      <Card title="ANALIZA" icon="/analiza.png" :showMoreButton="true">
        <ul class="analysis-stats">
          <li>💸 Wydatki w tym tygodniu: <strong>{{ weeklyExpenses }} PLN</strong></li>
          <li>📈 Średnie dzienne: <strong>{{ meanOfWeeklyExpenses }} PLN</strong></li>
          <li>🔄 Zmiana wydatków: <span class="green">−8%</span></li>
        </ul>
      </Card>

      <Card title="KATEGORIE" icon="/kategorie.png" :showMoreButton="true">
        <ul class="category-list">
          <li v-for="(category, index) in categories" :key="index">
            <span>
            {{ category.totalAmount }} PLN — {{ category.categoryName }}
            </span>
            <span class="green">100%</span>
          </li>
        </ul>
      </Card>

      <Card title="OSZCZĘDNOŚCI" icon="/savings.png" :showMoreButton="true">
        <p class="value">{{ savingsBalance }} PLN</p>
        <p class="converted">➡ {{ savingsBalanceEuro }} EUR</p>
      </Card>

      <Card title="KALENDARZ" icon="/kalendarz.png" :showMoreButton="true">
        <p class="date">31.05.2025 r. 15:31</p>
        <ul class="calendar-list">
          <li v-for="(obligation, index) in lastObligations" :key="index">
            <span>
              <img src="/not_check.png" alt="❌" class="status-icon"/>
              {{ obligation.dateToPay }} — {{ obligation.obligationTitle }}
            </span>
            <span>{{ obligation.obligationAmount }} PLN</span>
          </li>
        </ul>
      </Card>

      <Card title="TRANSAKCJE" icon="/transakcje.png" :showMoreButton="true">
        <ul class="transactions">
          <li v-for="(transaction, index) in lastTransactions" :key="index">
            <span>
            {{ transaction.transactionDate }} {{ transaction.transactionTitle }}
            </span>
            <span class="red">{{ transaction.amount }}  PLN</span>
          </li>
        </ul>
        <template #footer>
          <router-link to="/transakcje" class="more-button">Zobacz więcej</router-link>
        </template>
      </Card>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br/>
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import HeaderUser from '@/components/HeaderUser.vue'
import Card from '@/components/Card.vue'
import axios from 'axios'
import {ref, onMounted} from 'vue'
import {API_URL} from '../constants/const.ts'

const saldo = ref(0)
const euroSaldo = ref(0)
const weeklyExpenses = ref(0)
const meanOfWeeklyExpenses = ref(0)
const categories = ref([])
const savingsBalance = ref(0)
const savingsBalanceEuro = ref(0)
const lastObligations = ref([])
const lastTransactions = ref([])

const getMainInformations = async () => {
  try {
    const res = await axios.get(`${API_URL}/index/6`)
    console.log(res.data)
    const data = res.data

    saldo.value = data.saldo.toFixed(2)
    euroSaldo.value = data.euroSaldo.toFixed(2)
    weeklyExpenses.value = data.weeklyExpenses.toFixed(2)
    meanOfWeeklyExpenses.value = data.meanOfweeklyExpenses.toFixed(2)
    categories.value = data.categories
    savingsBalance.value = data.savingsBalance.toFixed(2)
    savingsBalanceEuro.value = data.savingsBalanceEuro.toFixed(2)
    lastObligations.value = data.lastObligations
    lastTransactions.value = data.lastTransactions

  } catch (err) {
    console.error('Błąd podczas pobierania danych:', err)
    alert('Błąd podczas pobierania danych.')
  }
}

onMounted(() => {
  getMainInformations()
})
</script>

<style scoped>
.main-page {
  background-color: #5118fd;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem 4rem;
  flex: 1;
}

.value {
  font-size: 2.4rem;
  font-weight: bold;
}

.converted {
  font-size: 1.1rem;
  font-style: italic;
  color: #444;
  margin-top: -0.3rem;
}

.analysis-stats {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-list,
.transactions,
.calendar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.category-list li,
.transactions li,
.calendar-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: green;
  font-weight: bold;
}

.red {
  color: red;
  font-weight: bold;
}

.orange {
  color: orange;
  font-weight: bold;
}

.date {
  font-style: italic;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.status-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 0.4rem;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
}

.more-button {
  background-color: #5118fd;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.more-button:hover {
  opacity: 0.85;
  transform: scale(1.02);
}

@media (min-width: 1280px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 kolumny na dużych ekranach */
  }
}
</style>