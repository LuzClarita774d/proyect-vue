<script setup>
import { useRoute } from "vue-router"
import { ref, computed } from "vue"


const route = useRoute()
const reservation = route.query

// LÓGICA DE FECHAS DINÁMICAS (Sin horas hardcoded)
const checkInDate = computed(() => {
  if (!reservation.checkIn) return "No definida"
  const date = new Date(reservation.checkIn)
  return date.toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
})

const checkOutDate = computed(() => {
  if (!reservation.checkOut) return "No definida"
  const date = new Date(reservation.checkOut)
  return date.toLocaleDateString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
})

// CÁLCULOS
const baseTotal = computed(() => parseFloat(reservation.total) || 0)
const appFee = computed(() => baseTotal.value * 0.02)
const finalTotal = computed(() => baseTotal.value + appFee.value)

const paymentMethod = ref('credit')
const acceptsTerms = ref(false)
const cardIcon = "imagenes/logos/card.png"

function handlePayment(){
  if(!acceptsTerms.value) return alert("Debes aceptar los términos")
  alert("Procesando pago...")
}
</script>

<template>
  <div class="checkout">
    <div class="main-container">
      
      <div class="content-left">
        <h1 class="main-title">¿Quiénes son los titulares de la reserva?</h1>

        <div class="white-card">
          <div class="badge-row">
            <span class="room-badge">Habitación 1 (Titular)</span>
          </div>
          <div class="form-grid">
            <div class="field">
              <label>Nombres</label>
              <input type="text" placeholder="Ej. Juan Manuel" />
            </div>
            <div class="field">
              <label>Apellidos</label>
              <input type="text" placeholder="Ej. Pérez García" />
            </div>
            <div class="field">
              <label>Nacionalidad</label>
              <input type="text" placeholder="México" />
            </div>
            <div class="field">
              <label>Nro. Documento</label>
              <input type="text" placeholder="ID / Pasaporte" />
            </div>
          </div>
        </div>

        <div class="white-card flex-between">
          <h2 class="orange-title">¿Deseas factura?</h2>
          <label class="toggle">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>

        <div class="white-card">
          <h2 class="orange-title">Medio de pago</h2>
          <div class="payment-options">
            <label class="option-row">
              <input type="radio" v-model="paymentMethod" value="bank">
              <span class="circle"></span>
              <span class="text">Banca por internet</span>
            </label>
            <label class="option-row">
              <input type="radio" v-model="paymentMethod" value="cash">
              <span class="circle"></span>
              <span class="text">Pago en efectivo</span>
            </label>
            <label class="option-row">
              <input type="radio" v-model="paymentMethod" value="credit">
              <span class="circle"></span>
              <span class="text">Tarjeta de Crédito/Débito</span>
            <img src="../../../assets/imagenes/logos/card.png" alt="card" class="card-logo" />
            </label>
          </div>
        </div>

        <div class="terms">
          <label class="check-container">
            <input type="checkbox" v-model="acceptsTerms">
            <span class="square"></span>
            <p>He leído y estoy de acuerdo con las <span>Condiciones de compra</span> y las <span>Políticas de privacidad</span>.</p>
          </label>
        </div>
      </div>

      <div class="content-right">
        <div class="summary-card">
          <h2 class="prop-name">{{ reservation.name || 'Tu Estancia' }}</h2>
          
          <div class="info-list">
            <div class="info-item">
              <span>Huéspedes:</span>
              <span>{{ reservation.guests || 1 }} personas</span>
            </div>
            <div class="info-item vertical">
              <span class="label">Llegada:</span>
              <span class="val">{{ checkInDate }}</span>
            </div>
            <div class="info-item vertical">
              <span class="label">Salida:</span>
              <span class="val">{{ checkOutDate }}</span>
            </div>
            <div class="info-item">
              <span>Estancia:</span>
              <span>{{ reservation.nights || 0 }} noches</span>
            </div>
          </div>

          <hr class="line" />

          <div class="prices">
            <div class="price-item">
              <span>Hospedaje</span>
              <span>${{ baseTotal.toFixed(2) }}</span>
            </div>
            <div class="price-item app-fee">
              <span>Uso de App (2%)</span>
              <span>+ ${{ appFee.toFixed(2) }}</span>
            </div>
            <div class="price-item total">
              <span class="total-txt">Total</span>
              <span class="total-num">${{ finalTotal.toFixed(2) }} MXN</span>
            </div>
          </div>

          <button class="pay-btn" :disabled="!acceptsTerms" @click="handlePayment">
            Comprar Ahora
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.checkout {
  background-color: #f4f7fa;
  min-height: 100vh;
  padding: 60px 20px;
  font-family: 'Poppins-Regular', sans-serif;
}

.main-container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 50px;
}

.main-title {
  font-family: 'Poppins-Medium', sans-serif;
  color: #152644;
  font-size: 24px;
  margin-bottom: 30px;
}

.white-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}

.room-badge {
  background: #edf2f7;
  color: #152644;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Poppins-Medium';
}

/* ESPACIADO CORREGIDO PARA QUE NO CHOQUEN LOS INPUTS */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 30px; /* Separación horizontal */
  row-gap: 20px;    /* Separación vertical */
  margin-top: 20px;
}

.field label {
  display: block;
  font-size: 12px;
  color: #484769;
  margin-bottom: 6px;
}

.field input {
  width: 90%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Poppins-Light';
  font-size: 14px;
}

.orange-title {
   font-family:'Poppins-Regular';
  color: #FD6B10;
  font-size: 16px;
}

.payment-options {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-row {
  display: flex;
  align-items: center;
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
}

.card-logo {
  height: 20px;
  margin-left: auto;
}

.summary-card {
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: sticky;
  top: 40px;
}

.prop-name {
  font-family: 'Poppins-Medium';
  color: #152644;
  font-size: 18px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #484769;
}

.info-item.vertical {
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

.info-item .val {
  font-family: 'Poppins-Light';
  font-size: 13px;
  color: #718096;
}

.line {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

.price-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.app-fee {
  color: #FD6B10;
  font-family: 'Poppins-Medium';
}

.total {
  margin-top: 20px;
  font-family: 'Poppins-Medium';
  color: #152644;
}

.total-num {
  font-size: 20px;
}

.pay-btn {
  width: 100%;
  background-color: #152644;
  color: #fff;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-family: 'Poppins-Medium';
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
}

.pay-btn:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.terms p {
  font-size: 12px;
  color: #484769;
}

.terms span {
  color: #FD6B10;
  font-family: 'Poppins-Medium';
  text-decoration: underline;
}

.secure {
  text-align: center;
  font-size: 11px;
  color: #94a3b8;
  margin-top: 15px;
}

.flex-between { display: flex; justify-content: space-between; align-items: center; }
.toggle { position: relative; width: 40px; height: 22px; }
.toggle input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; border-radius: 34px; transition: .4s; }
.slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; border-radius: 50%; transition: .4s; }
input:checked + .slider { background-color: #152644; }
input:checked + .slider:before { transform: translateX(18px); }
</style>