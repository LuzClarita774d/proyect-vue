<script setup>
import { useRoute } from "vue-router"

const route = useRoute()


const reservation = route.query


function handlePayment(){
  alert("Pago procesado correctamente")
}
</script>
<template>
  <div class="checkout">

    <h1>Confirmar Reserva</h1>

    <div class="card">

      <p><strong>Propiedad:</strong> {{ reservation.name }}</p>
      <p><strong>Check-in:</strong> {{ reservation.checkIn }}</p>
      <p><strong>Check-out:</strong> {{ reservation.checkOut }}</p>
      <p><strong>Huéspedes:</strong> {{ reservation.guests }}</p>
      <p><strong>Noches:</strong> {{ reservation.nights }}</p>

      <h2>Total: ${{ reservation.total }} MXN</h2>

      <button @click="handlePayment">
        Pagar ahora
      </button>

    </div>

  </div>
</template>