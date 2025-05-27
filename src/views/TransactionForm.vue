<template>
  <div class="transaction-form">
    <HeaderUser />

    <main class="form-container">
      <h2>Twoja nowa transakcja</h2>

      <form @submit.prevent="submitForm" class="goal-form">
        <label>
          Nazwa
          <input type="text" v-model="transaction.title" placeholder="Wpisz nazwę" required />
        </label>

        <label>
          Opis
          <textarea v-model="transaction.description" placeholder="Wpisz opis"></textarea>
        </label>

        <label>
          Kwota
          <input type="number" v-model="transaction.amount" placeholder="0 PLN" required />
        </label>

        <div class="two-columns">
          <label>
            Typ
            <select v-model="transaction.type" required>
              <option value="" disabled>Wybierz typ</option>
              <option value="income">Przychód</option>
              <option value="expense">Wydatek</option>
            </select>
          </label>

          <label>
            Kategoria
            <select v-model="transaction.category" required>
              <option value="" disabled>Wybierz kategorię</option>
              <option value="pensja">Pensja</option>
              <option value="zlecenia">Zlecenia</option>
              <option value="dochody_pasywne">Dochody pasywne</option>
              <option value="akcje">Akcje</option>
              <option value="stypendia">Stypendia</option>
              <option value="zasilki">Zasiłki</option>
              <option value="darowizny">Darowizny</option>
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
          Data transakcji
          <input type="date" v-model="transaction.date" required />
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

const transaction = ref({
  title: '',
  description: '',
  amount: 0,
  type: '',
  category: '',
  date: ''
})

const submitForm = () => {
  console.log('Nowa transakcja:', transaction.value)
  alert('Transakcja została dodana!')
  // Możesz tu dodać axios.post(...) do zapisania transakcji
  router.push('/')
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
