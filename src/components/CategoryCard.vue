<template>
  <div class="transaction-card">
    <div class="left">
      <div class="date-title">
        <span class="name">{{ category.categoryName }}</span>
      </div>
      <div>
        <p class="budget-amount">Ustawiony budżet: <strong>{{ category.budgetAmount }} PLN</strong></p>
      </div>
    </div>

    <div class="right">
      <p class="expense">- {{ category.totalAmount }} PLN</p>
      <p class="green">{{  Math.round(category.budgetProcent * 100) }}%</p>
      <button class="set-button" @click="setBudgetModalVisible(category.categoryId)">Ustaw budżet</button>
    </div>

    <teleport to="body">
      <div v-if="isBudgetModalVisible" class="modal-overlay">
        <div class="modal">
          <h3>Budżet na kategorię</h3>

          <label>Limit:
            <input type="number" step="0.01" v-model="budget.amountLimit" />
          </label>

          <div class="modal-actions">
            <button class="wyczysc-modal-button" @click="cancel">Anuluj</button>
            <button class="zastosuj-modal-button" @click="setBudget">Ustaw budżet</button>
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
  category: Object
})

const isBudgetModalVisible = ref(false)
const budget = ref({
  categoryId: 0,
  amountLimit: 0.0
})

const setBudget = async () => {
  try {
    const token = keycloak.token

    const res = await axios.post(`${API_URL}/new/budget`, budget.value,{
      headers: {
        Authorization: `Bearer ${token}`
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

const setBudgetModalVisible = (categoryId) => {
  budget.value.categoryId = categoryId
  isBudgetModalVisible.value = true
}

const cancel = () => {
  isBudgetModalVisible.value = false
  budget.value = {
    categoryId: 0,
    amountLimit: 0.0
  }
}
</script>

<style scoped>
.budget-amount {
  font-size: 0.9rem;
  color: #333;
}

.transaction-card {
  display: flex;
  justify-content: space-between;
  background-color: #f1f1dc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
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