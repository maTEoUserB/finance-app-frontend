<template>
  <div class="obligation-form">
    <HeaderUser />

    <main class="form-container">
      <h2>Twój nowy termin płatności</h2>

      <form @submit.prevent="submitForm" class="goal-form">
        <div class="two-columns">
          <label>
            Nazwa
            <input type="text" v-model="obligation.title" placeholder="Wpisz nazwę" required />
          </label>

          <label>
            Kategoria
            <select v-model="obligation.categoryId" required>
              <option value="" disabled>Wybierz kategorię</option>
              <option value=8>Rachunki/opłaty</option>
              <option value=9>Żywność</option>
              <option value=10>Transport</option>
              <option value=11>Zdrowie/higiena</option>
              <option value=12>Edukacja</option>
              <option value=13>Rodzina</option>
              <option value=14>Rozrywka</option>
<!--              <option value=>Inne</option>-->
            </select>
          </label>
        </div>

        <label>
          Kwota
          <input type="number" step="0.01" v-model="obligation.amount" placeholder="0.00 PLN" required />
        </label>

        <label>
          Wybierz termin płatności
          <input type="date" v-model="obligation.dateToPay" required />
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
import HeaderUser from '@/components/HeaderUser.vue'
import { useRouter } from 'vue-router'
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";

const router = useRouter()

const obligation = {
  title: '',
  amount: 0.0,
  dateToPay: '',
  categoryId: 0
}

const submitForm = async () => {
  try {
    const token = keycloak.token;

    const res = await axios.post(`${API_URL}/new/obligation`, obligation, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Pomyśnie dodano nowy termin płatności: ', res.data)
    alert('Nowy termin płatności został dodany.')

    await router.push('/')
  } catch (err) {
    console.log('Błąd podczas dodawania terminu płatności: ', err)

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
.obligation-form {
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
select {
  margin-top: 0.4rem;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
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
