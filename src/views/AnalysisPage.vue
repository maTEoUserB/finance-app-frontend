<template>
  <div class="analysis-page">
    <HeaderUser />
    <main class="main-content">
      <h2>Analiza Twoich finansów</h2>
      <button class="back-button" @click="router.push('/home')">Wróć na stronę główną</button>

      <div class="grid">
        <!-- Pierwszy rząd -->
        <div class="card wide">
          <h3 class="card-title">Wydatki w ostatnich 7 dniach</h3>
          <BarChart :data="amounts" :labels="labels"/>
        </div>

        <div class="card wide">
          <h3 class="card-title">Średnie dzienne wydatki</h3>
          <ScatterChart :data="[averageLastWeek, averageThisWeek]" />
          <div class="avg-values">
            <span><strong>{{ averageThisWeek }} PLN</strong><br>w tym tygodniu</span>
            <span><strong>{{ averageLastWeek }} PLN</strong><br>poprzedni tydzień</span>
          </div>
        </div>

        <div class="card">
          <h3 class="card-title">Średnia kwota przychodów</h3>
          <p class="big spaced">{{ meanOfWeeklyIncomes }} PLN</p>
        </div>

        <!-- Drugi rząd -->
        <div class="card">
          <h3 class="card-title">Zmiana wydatków</h3>
          <p :class="weeklyChange >= 0 ? 'red-text' : 'green-text'">{{ weeklyChange > 0 ? '+' : '' }}{{ weeklyChange }} %</p>
          <p class="spaced-2">względem poprzedniego tyg.</p>
        </div>

        <div class="card wide">
          <h3 class="card-title">Liczba transakcji w tym tyg.</h3>
          <p class="big">{{ numberOfWeeklyExpenses + numberOfWeeklyIncomes }}</p>
          <p>w tym</p>
          <div class="transaction-counts-row">
            <div class="count-item">
              <span class="income big-number">{{ numberOfWeeklyIncomes }}</span>
              <span>przychody</span>
            </div>
            <div class="count-item">
              <span class="expense big-number">{{ numberOfWeeklyExpenses }}</span>
              <span>wydatki</span>
            </div>
          </div>
        </div>

        <div class="card wide">
          <h3 class="card-title">Kwota przychodów w tym tyg.:</h3>
          <p class="kwota-1"><strong>{{ totalIncome }} PLN</strong></p>
          <p class="kwota_wyd">Kwota wydatków:</p>
          <p class="kwota-2"><strong>{{ totalExpense }} PLN</strong></p>
          <p class="w-p">Wydatki stanowią <strong>{{ ((totalExpense / totalIncome) * 100).toFixed(2) }}%</strong> przychodów</p>
        </div>


        <div class="card wide">
          <h3 class="card-title">Największy wydatek w tym tygodniu</h3>
          <p class="title-max">{{ biggestExpense.transactionTitle }}</p>
          <p class="date-max">{{ formatDate(biggestExpense.transactionDate) }}</p>
          <p class="max-wydatek">-{{ biggestExpense.transactionAmount }} PLN</p>
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
import HeaderUser from '@/components/HeaderUser.vue'
import { useRouter } from 'vue-router'
import BarChart from '@/components/BarChart.vue'
import ScatterChart from '@/components/ScatterChart.vue'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { API_URL } from '@/constants/const.js'
import { keycloak } from '@/auth/keycloak.js'

const averageThisWeek = ref(0)
const averageLastWeek = ref(0)
const meanOfWeeklyIncomes = ref(0)
const weeklyChange = ref(0)
const numberOfWeeklyIncomes = ref(0)
const numberOfWeeklyExpenses = ref(0)
const totalIncome = ref(0)
const totalExpense = ref(0)
const biggestExpense = ref({ title: '', date: '', amount: 0 })
const lastWeekExpenses = ref([])
const labels = ref([])
const amounts = ref([])

const router = useRouter()

const getAnalysisData = async () => {
  try {
    const token = keycloak.token

    const res = await axios.get(`${API_URL}/summary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    let data = res.data
    console.log(data)

    averageThisWeek.value = data.averageThisWeek?.toFixed(2) ?? '0.00'
    averageLastWeek.value = data.averageLastWeek?.toFixed(2) ?? '0.00'
    meanOfWeeklyIncomes.value = data.meanOfWeeklyIncomes?.toFixed(2) ?? '0.00'
    weeklyChange.value = data.weeklyChange?.toFixed(2) ?? '0.00'
    numberOfWeeklyIncomes.value = data.numberOfWeeklyIncomes
    numberOfWeeklyExpenses.value = data.numberOfWeeklyExpenses
    totalIncome.value = data.totalIncome?.toFixed(2) ?? '0.00'
    totalExpense.value = data.totalExpense?.toFixed(2) ?? '0.00'
    biggestExpense.value = data.biggestExpense
    lastWeekExpenses.value = data.lastWeekExpenses
    labels.value = lastWeekExpenses.value.map(item =>
        new Date(item.dateLabel).toLocaleDateString("pl-PL", { weekday: "short", day: "numeric" })
    );
    amounts.value = lastWeekExpenses.value.map(item => item.totalAmount);


  } catch (error) {
    console.error('Błąd podczas pobierania danych analitycznych:', error)
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const weeklyChangeColor = computed(() => {
  const change = Number(weeklyChange.value ?? weeklyChange);
  if (change < 0) return 'green-text';
  if (change > 0) return 'red-text';
  return '';
});

onMounted(() => {
  getAnalysisData()
})
</script>

<style scoped>
.analysis-page {
  background-color: #5118fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  padding: 2rem;
  color: black;
}

h2 {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.back-button {
  display: block;
  margin: 0 auto 2rem;
  background-color: #1e0f55;
  color: white;
  padding: 0.6rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.green-text {
  font-size: 2rem;
  font-weight: bold;
  color: green;
  margin-top: 1rem;
}

.red-text {
  font-size: 2rem;
  font-weight: bold;
  color: red;
  margin-top: 1rem;
}

.kwota-1 {
  font-size: 1.5rem;
  margin-top: -1rem;
  color: green;
}

.kwota-2 {
  font-size: 1.5rem;
  color: red;
}

.w-p {
  margin-top: 1.2rem;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: auto;
}

.transaction-counts-row {
  display: flex;
  justify-content: space-around;
  gap: 0.0rem;
  width: 100%;
  margin-top: 1rem;
  font-size: 1.25rem;
}

.count-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.25rem;
  color: black;
}

.big-number {
  font-size: 1.25rem;
  font-weight: bold;
}

.spaced-2 {
  margin-top: 2.5rem;
}

.card {
  background-color: #f1f1dc;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.card.wide {
  grid-column: span 2;
}

.card-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.kwota_wyd{
  font-size: 1.3rem;
  font-weight: bold;
}

.big {
  font-size: 2rem;
  font-weight: bold;
}

.spaced {
  margin-top: 2rem;
}

.income {
  color: green;
  font-weight: bold;
  font-size: 2rem;
}

.expense {
  color: red;
  font-weight: bold;
  font-size: 2rem;
}

.max-wydatek {
  color: red;
  font-weight: bold;
  font-size: 1.25rem;
}

.title-max {
  font-size: 1.25rem;
  color: #1e0f55;
}

.date-max {
  font-size: 1.25rem;
  font-style: italic;
}

.avg-values {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  font-size: 0.95rem;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  color: white;
}
</style>
