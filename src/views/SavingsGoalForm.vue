<template>
  <div class="savings-goal-form">
    <HeaderUser />

    <main class="form-container">
      <h2>Twój nowy cel oszczędnościowy</h2>

      <form @submit.prevent="submitForm" class="goal-form">
        <label>
          Nazwa
          <input type="text" v-model="savingsGoal.title" placeholder="Wpisz nazwę celu" required />
        </label>

        <label>
          Opis
          <textarea v-model="savingsGoal.description" placeholder="Opisz swój cel"></textarea>
        </label>

        <div class="amounts">
          <label>
            Ile już odłożyłeś?
            <input type="number" step="0.01" v-model="savingsGoal.currentAmount" placeholder="0.00 PLN" required />
          </label>

          <label>
            Ile chcesz odłożyć?
            <input type="number" step="0.01" v-model="savingsGoal.finalAmount" placeholder="0.00 PLN" required />
          </label>
        </div>

        <label>
          Wybierz termin końcowy
          <input type="date" v-model="savingsGoal.deadline" required />
        </label>

        <div class="form-buttons">
          <button type="submit" class="submit-button">Dodaj</button>
          <button type="button" class="cancel-button" @click="cancel">Anuluj</button>
        </div>
      </form>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderUser from '@/components/HeaderUser.vue'
import { useRouter } from 'vue-router'
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";

const router = useRouter()

const savingsGoal = {
  title: '',
  description: '',
  currentAmount: 0.0,
  finalAmount: 0.0,
  deadline: ''
}

const submitForm = async () => {

  try {
    const token = keycloak.token;

    const res = await axios.post(`${API_URL}/new/savings_goal`, savingsGoal, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Pomyśnie dodano nowy cel oszczędnościowy: ', res.data)
    alert('Nowy cel oszczędnościowy został dodany.')

    await router.push('/')
  } catch (err) {
    console.log('Błąd podczas dodawania celu oszczędnościowego: ', err)

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
.savings-goal-form {
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

.amounts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 640px) {
  .amounts {
    flex-direction: row;
    justify-content: space-between;
  }

  .amounts label {
    flex: 1;
  }

  .amounts label:first-child {
    margin-right: 1rem;
  }
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem; /* to kontroluje odstęp między przyciskami */
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
