<template>
  <div class="obligation-card paid">
    <div class="info">
      <span class="date">{{ props.obligation.dateToPay }}</span>
      <span class="title">{{ props.obligation.obligationTitle }}</span>
      <span class="amount">{{ props.obligation.obligationAmount }} PLN</span>
      <span class="category">{{ props.obligation.categoryName }}</span>
    </div>
    <img src="/check.png" alt="check" class="check-icon" />
  </div>
</template>

<script setup>
const props = defineProps({
  obligation: Object
})
</script>

<style scoped>
.obligation-card.paid {
  background: #f1f1dc;
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

.check-icon {
  width: 24px;
  height: 24px;
}
</style>
