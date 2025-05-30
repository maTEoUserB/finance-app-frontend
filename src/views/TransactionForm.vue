<template>
  <div class="transaction-form">
    <HeaderUser/>

    <main class="form-container">
      <h2>Twoja nowa transakcja</h2>

      <form @submit.prevent="submitForm" class="goal-form">
        <label>
          Nazwa
          <input type="text" v-model="transaction.transactionTitle" placeholder="Wpisz nazwę (max 50 znaków)" required maxlength="50"/>
        </label>

        <label>
          Opis
          <textarea v-model="transaction.transactionDescription" placeholder="Wpisz opis (max 300 znaków)" maxlength="300"></textarea>
        </label>

        <label>
          Kwota
          <input type="number" step="0.01" v-model="transaction.transactionAmount" placeholder="0.00 PLN" required/>
        </label>

        <div class="two-columns">
          <label>
            Typ
            <select v-model="transaction.transactionType" required>
              <option value="" disabled>Wybierz typ</option>
              <option value="income">Przychód</option>
              <option value="expense">Wydatek</option>
            </select>
          </label>

          <label>
            Kategoria
            <select
                v-model="transaction.categoryId"
                :disabled="categorySelectDisabled"
                @click="handleCategoryClick"
                required
            >
              <option value="" disabled>Wybierz kategorię</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.categoryName }}
              </option>
            </select>
          </label>
        </div>

        <label>
          Data transakcji
          <input type="datetime-local" v-model="transaction.transactionDate" required/>
        </label>

        <div class="form-buttons">
          <button type="submit" class="submit-button">Dodaj</button>
          <button type="button" class="cancel-button" @click="cancel">Anuluj</button>
        </div>
      </form>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br/>
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import HeaderUser from '@/components/HeaderUser.vue'
import {useRouter} from 'vue-router'
import {API_URL} from '../constants/const.ts'
import axios from 'axios'
import {keycloak} from '../auth/keycloak';
import { reactive, watch, ref, onMounted } from 'vue'

const router = useRouter()

const categories = ref([])
const categorySelectDisabled = ref(true)

const transaction = reactive({
  transactionTitle: '',
  transactionAmount: 0.0,
  transactionDescription: '',
  categoryId: 0,
  transactionType: '',
  transactionDate: ''
})

const handleCategoryClick = (event) => {
  if (categorySelectDisabled.value) {
    event.preventDefault()
    alert('Najpierw określ typ transakcji')
  }
}

watch(() => transaction.transactionType, async (newType) => {
  if (!newType) {
    categories.value = []
    categorySelectDisabled.value = true
    return
  }

  categorySelectDisabled.value = false

  try {
    const token = keycloak.token
    const endpoint = newType === 'income' ? '/incomes/categories' : '/expenses/categories'

    const res = await axios.get(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    categories.value = res.data
  } catch (error) {
    console.error('Błąd podczas pobierania kategorii:', error)
    alert('Nie udało się pobrać kategorii.')
    categories.value = []
  }
})

const submitForm = async () => {

  try {
    const token = keycloak.token;

    const res = await axios.post(`${API_URL}/new/transaction`, transaction, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Pomyśnie dodano nowa transakcję: ', res.data)
    alert('Nowa transakcja została dodana.')

    await router.push('/transakcje')
  } catch (err) {
    console.log('Błąd podczas dodawania transakcji: ', err)

    if (axios.isAxiosError(err)) {
      console.log('STATUS:', err.response?.status)
      console.log('DATA:', err.response?.data)
    }
    await router.push('/')
  }

}

const cancel = () => {
  router.push('/')
}
</script>

<style scoped>
.transaction-form {
  background-color: #5118fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.form-container {
  background-color: #f1f1dc;
  padding: 2rem;
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.goal-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 1rem;
}

input,
select,
textarea {
  margin-top: 0.4rem;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.two-columns {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .two-columns {
    flex-direction: row;
    justify-content: space-between;
  }

  .two-columns label {
    flex: 1;
  }

  .two-columns label:first-child {
    margin-right: 1rem;
  }
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.submit-button {
  background-color: #228b22;
  color: white;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.cancel-button {
  background-color: #8b0000;
  color: white;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
  margin-top: auto;
}
</style>
