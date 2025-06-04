<template>
  <div class="obligation-card not-paid">
    <div class="info">
      <span class="date">{{ props.obligation.dateToPay }}</span>
      <span class="title">{{ props.obligation.obligationTitle }}</span>
      <span class="amount">{{ props.obligation.obligationAmount }} PLN</span>
      <span class="category">{{ props.obligation.categoryName }}</span>
    </div>
    <button class="mark-button" @click="letPaid">Zapłacono</button>
  </div>
</template>

<script setup>
import {keycloak} from "@/auth/keycloak.js";
import axios from "axios";
import {API_URL} from "@/constants/const.js";
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  obligation: Object,
  refreshObligations: Function
})

const letPaid = async () => {
  try {
    const token = keycloak.token;

    const res = await axios.post(`${API_URL}/update/obligation/${props.obligation.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)

    alert('Pomyślnie zaaktualizowano termin płatności.')
    await props.refreshObligations();
    await router.push('/kalendarz')
  } catch (err) {
    console.error('Błąd podczas aktualizacji terminu płatności:', err)
    alert('Błąd podczas aktualizacji terminu płatności.')
  }
}
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
