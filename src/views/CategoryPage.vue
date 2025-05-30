<template>
  <div class="transaction-page">
    <HeaderUser />

    <main class="content">
      <h2>Wydatki na kategorie</h2>

      <div class="filter-section">
        <input type="text" v-model="search" placeholder="Podaj kategorię" />
        <button class="back-button" @click="router.push('/')">Wróć na stronę główną</button>
      </div>

      <CategoryCard
          v-for="(ct, index) in filteredCategories"
          :key="index"
          :category="ct"
      />
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import HeaderUser from '@/components/HeaderUser.vue'
import { useRouter } from 'vue-router'
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";
import CategoryCard from "@/components/CategoryCard.vue";
import { computed } from 'vue'

const filteredCategories = computed(() =>
    categories.value.filter(ct =>
        ct.categoryName.toLowerCase().includes(search.value.toLowerCase())
    )
)

const router = useRouter()
const search = ref('')

const categories = ref([])

const getAllCategories = async () => {
  try {
    const token = keycloak.token;

    const res = await axios.get(`${API_URL}/expense/categories/summary`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)

    categories.value = res.data

  } catch (err) {
    console.error('Błąd podczas pobierania danych:', err)
    alert('Błąd podczas pobierania danych.')
  }
}

onMounted(() => {
  getAllCategories()
})
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
</style>
