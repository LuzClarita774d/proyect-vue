<script setup>
import { ref, computed } from "vue"

const props = defineProps(["modelValue"])
const emit = defineEmits(["update:modelValue"])

const open = ref(false)

const adults = ref(1)
const kids = ref(0)
const babies = ref(0)

// Total de huéspedes (Adultos + Niños para la lógica de ocupación)
const totalGuests = computed(() => adults.value + kids.value)

const guestText = computed(() => {
  if (totalGuests.value === 1) {
    return "1 huésped"
  } else {
    return totalGuests.value + " huéspedes"
  }
})

function update() {
  emit("update:modelValue", totalGuests.value)
}

function addAdults() {
  adults.value++
  update()
}

function minusAdults() {
  if (adults.value > 1) {
    adults.value--
    update()
  }
}

function addKids() {
  kids.value++
  update()
}

function minusKids() {
  if (kids.value > 0) {
    kids.value--
    update()
  }
}

function addBabies() {
  babies.value++
}

function minusBabies() {
  if (babies.value > 0) {
    babies.value--
  }
}
</script>

<template>
  <div class="campo" @mouseenter="open = true" @mouseleave="open = false">
    
    <label>Huéspedes</label>

    <div class="texto">
      {{ guestText }}
    </div>

    <div v-if="open" class="panel">
      
      <div class="fila">
        <div>
          <strong class="poppins">Adultos</strong>
          <p class="poppins">13 años o más</p>
        </div>
        <div class="contador">
          <button @click.stop="minusAdults">-</button>
          <span>{{ adults }}</span>
          <button @click.stop="addAdults">+</button>
        </div>
      </div>

      <div class="fila">
        <div>
          <strong class="poppins">Niños</strong>
          <p class="poppins">De 2 a 12 años</p>
        </div>
        <div class="contador">
          <button @click.stop="minusKids">-</button>
          <span>{{ kids }}</span>
          <button @click.stop="addKids">+</button>
        </div>
      </div>

      <div class="fila">
        <div>
          <strong class="poppins">Bebés</strong>
          <p class="poppins">Menos de 2 años</p>
        </div>
        <div class="contador">
          <button @click.stop="minusBabies">-</button>
          <span>{{ babies }}</span>
          <button @click.stop="addBabies">+</button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Contenedor Principal */
.campo {
  display: flex;
  flex-direction: column;
  padding: 14px 22px;
  width: 220px;
  cursor: pointer;
  position: relative;
  opacity: .75;
  transition: .25s;
  font-family: 'Poppins-Regular', sans-serif; /* Aplicado a todo el bloque */
}

.campo:hover {
  background: #f2f2f2;
  border-radius: 40px;
  opacity: 1;
}

.campo label {
  font-size: 14px;
  color: #111;
  font-family: 'Poppins-Regular', sans-serif;
}

.texto {
  font-size: 15px;
  color: #969393;
  font-family: 'Poppins-Regular', sans-serif;
}

/* El Panel Flotante */
.panel {
  position: absolute;
  top: 70px; /* Ajustado para reducir el hueco */
  left: 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,.12);
  padding: 25px;
  width: 330px;
  z-index: 9999;
  cursor: default; /* Para que no parezca que el panel es un botón */
}

/* --- EL PUENTE INVISIBLE --- */
/* Esto crea un área sensible entre el input y el panel para que el hover no se pierda */
.panel::before {
  content: "";
  position: absolute;
  top: -20px; 
  left: 0;
  width: 100%;
  height: 20px;
  background: transparent;
}

.fila {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-bottom: 15px;
}

.fila p {
  margin: 0;
  font-size: 12px;
  color: #717171;
  font-family: 'Poppins-Regular', sans-serif;
}

.poppins {
  font-family: 'Poppins-Regular', sans-serif;
}

.contador {
  display: flex;
  gap: 15px;
  align-items: center;
  font-family: 'Poppins-Regular', sans-serif;
}

.contador span {
  width: 20px;
  text-align: center;
  font-weight: 600;
}

/* Botones de + y - */
button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 18px;
  transition: .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #484769;
}

button:hover {
  background: #f2f2f2;
  border-color: #111;
}

button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>