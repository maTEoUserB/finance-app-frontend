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
            <input type="number" v-model="savingsGoal.currentAmount" placeholder="0 PLN" required />
          </label>

          <label>
            Ile chcesz odłożyć?
            <input type="number" v-model="savingsGoal.finalAmount" placeholder="0 PLN" required />
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

const router = useRouter()

const savingsGoal = ref({
  title: '',
  description: '',
  currentAmount: 0,
  finalAmount: 0,
  deadline: ''
})

const submitForm = () => {
  console.log('Nowy cel:', goal.value)
  alert('Cel został dodany!')
  // Możesz tu dodać axios.post(...) do zapisania celu
  router.push('/') // powrót do strony głównej po dodaniu
}

const cancel = () => {
  router.push('/') // powrót do strony głównej bez zapisu
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
