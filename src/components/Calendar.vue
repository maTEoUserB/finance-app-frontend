<template>
  <div class="calendar">
    <div class="month-nav">
      <button @click="prevMonth">&lt;</button>
      <span>{{ monthName }} {{ currentYear }}</span>
      <button @click="nextMonth">&gt;</button>
    </div>

    <div class="days-grid">
      <div class="day-name" v-for="day in dayNames" :key="day">{{ day }}</div>
      <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          class="day"
          :class="{ today: isToday(day) }"
          @mouseenter="hoveredDay = day"
          @mouseleave="hoveredDay = null"
      >
        {{ day }}
        <div class="tooltip" v-if="hoveredDay === day && obligations[day]">
          {{ obligations[day] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb']
const hoveredDay = ref(null)

const obligations = {
  3: 'Rachunek za gaz',
  6: 'Internet',
  15: 'Czynsz'
}

const monthName = computed(() =>
    new Date(currentYear.value, currentMonth.value).toLocaleString('pl-PL', {
      month: 'long'
    })
)

const daysInMonth = computed(() => {
  const days = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  return Array.from({ length: days }, (_, i) => i + 1)
})

function isToday(day) {
  return (
      currentYear.value === today.getFullYear() &&
      currentMonth.value === today.getMonth() &&
      day === today.getDate()
  )
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}
</script>

<style scoped>
.calendar {
  background: #f1f1dc;
  padding: 1rem;
  border-radius: 12px;
  width: 300px;
}

.month-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}

.day-name {
  font-weight: bold;
  text-align: center;
  color: #444;
}

.day {
  position: relative;
  text-align: center;
  padding: 0.5rem;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
}

.day.today {
  background: red;
  color: white;
  font-weight: bold;
}

.tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e0f55;
  color: white;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 8px;
  white-space: nowrap;
}
</style>
