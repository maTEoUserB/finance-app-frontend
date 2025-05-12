<template>
  <div class="card">
    <div class="card-header">
      <img :src="icon" alt="Ikona" class="icon" />
      <h2 class="title">{{ title }}</h2>
    </div>
    <div class="card-content">
      <slot />
    </div>
    <button class="more-button">Zobacz więcej</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>

<style scoped>
.card {
  background-color: #f1f1dc; /* jasnobeżowe tło */
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-content {
  flex: 1;
  margin-bottom: 1rem;
}

.more-button {
  align-self: flex-start;
  background-color: #5118fd;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.more-button:hover {
  opacity: 0.85;
  transform: scale(1.02);
}
</style>
