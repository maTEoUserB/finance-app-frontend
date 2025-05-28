<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const canvas = ref(null)
let chartInstance = null

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  const labels = ['', 'Poprzedni tydzień', 'Ten tydzień', '']

  // Dane: dodajemy null na początku i końcu, by punkty były "odsunięte"
  const chartData = [null, props.data[0], props.data[1], null]

  chartInstance = new Chart(canvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Średnie dzienne wydatki (PLN)',
        data: chartData,
        fill: false,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        tension: 0,
        pointRadius: [0, 6, 6, 0],
        pointHoverRadius: [0, 8, 8, 0],
        pointBackgroundColor: ['transparent', '#999', '#800080', 'transparent'] // szary i fioletowy
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: {
            callback: (val, index) => labels[index] || '',
            padding: 10
          },
          grid: { display: false }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(renderChart)
watch(() => props.data, renderChart, { deep: true })
</script>
