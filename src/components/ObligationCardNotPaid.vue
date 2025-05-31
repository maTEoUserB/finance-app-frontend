<template>
  <div class="obligation-card not-paid">
    <div class="info">
      <span class="date">{{ obligation.date }}</span>
      <span class="title">{{ obligation.title }}</span>
      <span class="amount">{{ obligation.amount }} PLN</span>
      <span class="category">{{ obligation.category }}</span>
    </div>
    <button class="mark-button">Zapłacono</button>
  </div>
</template>

<script setup>
defineProps({
  obligation: Object
})
</script>

<style scoped>
.obligation-card.not-paid {
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 700px;
}

.info {
  display: grid;
  grid-template-columns: 120px 1fr 100px 150px;
  align-items: center;
  gap: 1rem;
}

.info .amount {
  color: red;
  font-weight: bold;
}

.mark-button {
  background-color: #1e0f55;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
