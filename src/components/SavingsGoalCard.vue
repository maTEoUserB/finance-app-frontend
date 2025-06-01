<template>
  <div class="transaction-card">
    <div class="left">
      <div class="date-title">
        <span class="name">{{ savingsGoal.title }}</span>
      </div>
      <p class="date">📅Deadline {{ formatDate(savingsGoal.deadline) }}</p>
      <p class="percent">Zaoszczędziłeś już <strong>{{ ((savingsGoal.currentAmount/savingsGoal.finalAmmount)*100).toFixed(2) }}%.</strong></p>
    </div>

    <div class="right">
      <p class="blue">Aktualne oszczędności: {{ savingsGoal.currentAmount }} PLN</p>
      <p class="green">Cel: {{  savingsGoal.finalAmmount }} PLN</p>
      <button class="set-button" @click="setUpdateModalVisible(savingsGoal.id)">Aktualizuj</button>
      <button class="wyczysc-modal-button" @click="deleteSavingsGoal(savingsGoal.id)">Usuń</button>
    </div>

    <teleport to="body">
      <div v-if="isUpdateModalVisible" class="modal-overlay">
        <div class="modal">
          <h3>Aktualizuj swój cel</h3>

          <label>
            Nazwa
            <input type="text" v-model="goal.title" placeholder="Wpisz nazwę celu"/>
          </label>

          <div class="amounts">
            <label>
              Ile już odłożyłeś?
              <input type="number" step="0.01" v-model="goal.currentAmount" placeholder="0.00 PLN"/>
            </label>

            <label>
              Ile chcesz odłożyć?
              <input type="number" step="0.01" v-model="goal.finalAmount" placeholder="0.00 PLN"/>
            </label>
          </div>

          <label>
            Wybierz termin końcowy
            <input type="date" v-model="goal.deadline"/>
          </label>

          <div class="modal-actions">
            <button class="wyczysc-modal-button" @click="cancel">Anuluj</button>
            <button class="zastosuj-modal-button" @click="updateSavingsGoal">Zapisz</button>
          </div>
        </div>
      </div>
    </teleport>

  </div>
</template>

<script setup>
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";
import {ref} from "vue";

defineProps({
  savingsGoal: Object
})

const isUpdateModalVisible = ref(false)
const goal = ref({
  id: 0,
  title: '',
  currentAmount: 0.0,
  finalAmount: 0.0,
  deadline: ''
})

const formatDate = (dateString) => {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const buildPayload = () => {
  const payload = {}

  if (goal.value.currentAmount !== null && goal.value.title !== '') {
    payload.goalTitle = goal.value.title
  }

  if (goal.value.currentAmount !== null && goal.value.currentAmount !== 0.0) {
    payload.currentAmount = parseFloat(goal.value.currentAmount)
  }

  if (goal.value.finalAmount !== null && goal.value.finalAmount !== 0.0) {
    payload.finalAmount = parseFloat(goal.value.finalAmount)
  }

  if (goal.value.deadline !== null && goal.value.deadline !== '') {
    payload.goalDeadline = goal.value.deadline
  }

  return payload
}

const updateSavingsGoal = async () => {
  const data = buildPayload()

  try {
    const token = keycloak.token

    const res = await axios.patch(`${API_URL}/saving_goal/update/${goal.value.id}`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(res.data)
    cancel()
    window.location.reload()

  } catch (err) {
    console.error('Błąd podczas ustawiania budżetu:', err)
    alert('Błąd podczas ustawiania budżetu.')
  }
}

const deleteSavingsGoal = async (savingsGoalId) => {
  try {
    const token = keycloak.token

    const res = await axios.delete(`${API_URL}/saving_goal/delete/${savingsGoalId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)
    window.location.reload()

  } catch (err) {
    console.error('Błąd podczas usówania budżetu:', err)
    alert('Błąd podczas usówania budżetu.')
  }
}

const setUpdateModalVisible = (savingsGoalId) => {
  goal.value.id = savingsGoalId
  isUpdateModalVisible.value = true
}

const cancel = () => {
  isUpdateModalVisible.value = false
  goal.value = {
    id: 0,
    title: '',
    currentAmount: 0.0,
    finalAmount: 0.0,
    deadline: ''
  }
}
</script>

<style scoped>
.amounts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-card {
  display: flex;
  justify-content: space-between;
  background-color: #f1f1dc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  min-width: 800px;
}

.left {
  max-width: 70%;
}

.date-title {
  font-weight: bold;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.3rem;
}

.percent {
  margin-top: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #f1f1dc;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.wyczysc-modal-button {
  background-color: #8b0000;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.zastosuj-modal-button {
  background-color: #228b22;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}

.name {
  font-size: 1.1rem;
}

.right {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.4rem;
}

.expense {
  color: red;
}

.green {
  color: green;
  font-weight: bold;
}

.blue {
  color: blue;
  font-weight: bold;
}

.set-button {
  background-color: #213547;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>