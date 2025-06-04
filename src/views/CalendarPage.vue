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
              :refreshObligations="getAllObligations"
          />
          <ObligationCardPaid
              v-if="activeTab === 'paid'"
              v-for="(item, index) in filteredPaid"
              :key="index"
              :obligation="item"
          />
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
import {ref, computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import HeaderUser from '@/components/HeaderUser.vue'
import ObligationCardPaid from '@/components/ObligationCardPaid.vue'
import ObligationCardNotPaid from '@/components/ObligationCardNotPaid.vue'
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";

const router = useRouter()
const activeTab = ref('notPaid')
const searchQuery = ref('')

const unpaid = ref([])
const paid = ref([])

const getAllObligations = async () => {
  try {
    const token = keycloak.token;

    const res = await axios.get(`${API_URL}/obligations`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)

    unpaid.value = res.data.unpaidObligations
    paid.value = res.data.paidObligations

  } catch (err) {
    console.error('Błąd podczas pobierania danych:', err)
    alert('Błąd podczas pobierania danych.')
  }
}

const filteredUnpaid = computed(() =>
    unpaid.value.filter(item =>
        item.obligationTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

const filteredPaid = computed(() =>
    paid.value.filter(item =>
        item.obligationTitle.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
)

onMounted(() => {
  getAllObligations();
})
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
