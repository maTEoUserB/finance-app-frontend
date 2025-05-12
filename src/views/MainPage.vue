<template>
  <div class="main-page">
    <HeaderUser />

    <main class="cards-grid">
      <Card title="MOJE SALDO" icon="/moje_saldo.png">
        <p class="value">50.000 PLN</p>
        <p class="converted">➡ 12.000 EUR</p>
      </Card>

      <Card title="ANALIZA" icon="/analiza.png">
        <ul class="analysis-stats">
          <li>💸 Wydatki w tym tygodniu: <strong>920 PLN</strong></li>
          <li>📈 Średnie dzienne: <strong>131 PLN</strong></li>
          <li>🔄 Zmiana wydatków: <span class="green">−8%</span></li>
        </ul>
      </Card>

      <Card title="KATEGORIE" icon="/kategorie.png">
        <ul class="category-list">
          <li><span>3000 PLN — Czynsz</span><span class="green">100%</span></li>
          <li><span>600 PLN — Zakupy spożywcze</span><span class="green">80%</span></li>
          <li><span>400 PLN — Paliwo</span><span class="orange">50%</span></li>
        </ul>
      </Card>

      <Card title="OSZCZĘDNOŚCI" icon="/savings.png">
        <p class="value">8.000 PLN</p>
        <p class="converted">➡ 1.920 EUR</p>
      </Card>

      <Card title="KALENDARZ" icon="/kalendarz.png">
        <p class="date">31.05.2025 r. 15:31</p>
        <ul class="calendar-list">
          <li>
            <span>
              <img src="/check.png" alt="✔" class="status-icon" />
              31.05.2025 Subskrypcja Netflix
            </span>
            <span>39 PLN</span>
          </li>
          <li>
            <span>
              <img src="/not_check.png" alt="❌" class="status-icon" />
              02.06.2025 Rachunek za gaz
            </span>
            <span>340 PLN</span>
          </li>
        </ul>
      </Card>

      <Card title="TRANSAKCJE" icon="/transakcje.png">
        <ul class="transactions">
          <li><span>29.05.2025 Subskrypcja Netflix</span><span class="red">-39</span></li>
          <li><span>20.05.2025 Rachunek za prąd</span><span class="red">-120</span></li>
          <li><span>10.05.2025 Wynagrodzenie</span><span class="green">+5000</span></li>
        </ul>
      </Card>
    </main>

    <footer class="footer">
      © Wojskowa Akademia Techniczna 2025<br />
      ZeniVault
    </footer>
  </div>
</template>

<script setup>
import HeaderUser from '@/components/HeaderUser.vue'
import Card from '@/components/Card.vue'
</script>

<style scoped>
.main-page {
  background-color: #5118fd;
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 2rem 4rem;
  flex: 1;
}

.value {
  font-size: 2.4rem;
  font-weight: bold;
}

.converted {
  font-size: 1.1rem;
  font-style: italic;
  color: #444;
  margin-top: -0.3rem;
}

.analysis-stats {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-list,
.transactions,
.calendar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.category-list li,
.transactions li,
.calendar-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green {
  color: green;
  font-weight: bold;
}

.red {
  color: red;
  font-weight: bold;
}

.orange {
  color: orange;
  font-weight: bold;
}

.date {
  font-style: italic;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.status-icon {
  width: 18px;
  height: 18px;
  vertical-align: middle;
  margin-right: 0.4rem;
}

.footer {
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  color: white;
}
</style>