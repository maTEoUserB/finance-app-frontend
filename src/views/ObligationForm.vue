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
            <select v-model="obligation.category" required>
              <option value="" disabled>Wybierz kategorię</option>
              <option value="rachunki/oplaty">Rachunki/opłaty</option>
              <option value="zywnosc">Żywność</option>
              <option value="transport">Transport</option>
              <option value="zdrowie/higiena">Zdrowie/higiena</option>
              <option value="edukacja">Edukacja</option>
              <option value="rodzina">Rodzina</option>
              <option value="rozrywka">Rozrywka</option>
              <option value="inne">Inne</option>
            </select>
          </label>
        </div>

        <label>
          Kwota
          <input type="number" v-model="obligation.amount" placeholder="0 PLN" required />
        </label>

        <label>
          Wybierz termin płatności
          <input type="date" v-model="obligation.date_to_pay" required />
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

const router = useRouter()

const obligation = ref({
  title: '',
  category: '',
  amount: 0,
  date_to_pay: ''
})

const submitForm = () => {
  console.log('Nowe zobowiązanie:', obligation.value)
  alert('Termin płatności został dodany!')
  // Możesz tu dodać axios.post(...) do zapisania zobowiązania
  router.push('/')
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
  background-color: #d9d9d9;
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
  border-radius: 12px;
  cursor: pointer;
}

.cancel-button {
  background-color: #8b0000;
  color: white;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 12px;
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
