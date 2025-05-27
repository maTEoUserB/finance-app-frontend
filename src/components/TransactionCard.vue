<template>
  <div class="transaction-card">
    <div class="left">
      <div class="date-title">
        <span class="date">📅 {{ formatDate(transaction.transactionDate) }}</span>
        <span class="title">{{ transaction.transactionTitle }}</span>
      </div>
      <p class="description">{{ transaction.transactionDescription }}</p>
    </div>

    <div class="right">
      <p :class="transaction.amount >= 0 ? 'amount income' : 'amount expense'">
        {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount }} PLN
      </p>
      <p class="category">{{ transaction.category }}</p>
      <button class="delete-button" @click="$emit('delete')">Usuń</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  transaction: Object
})
defineEmits(['delete'])

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<style scoped>
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

.date {
  font-size: 0.95rem;
  color: #333;
}

.title {
  font-size: 1.1rem;
}

.description {
  font-size: 0.9rem;
  color: #333;
}

.right {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.4rem;
}

.amount {
  font-size: 1.1rem;
  font-weight: bold;
}

.income {
  color: green;
}

.expense {
  color: red;
}

.category {
  font-size: 0.95rem;
  font-weight: 500;
}

.delete-button {
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.4rem 1.2rem;
  font-weight: bold;
  cursor: pointer;
}
</style>
