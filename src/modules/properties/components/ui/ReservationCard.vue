<script setup>
import { ref, computed, watch } from "vue"
import { VueDatePicker } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"
import { DISPONIBILIDAD_DATA } from '@/modules/properties/data/disponibilidad.js';

const props = defineProps({
  property: Object
})

const emit = defineEmits(["reserve"])

const fechaEntrada = ref(null)
const fechaSalida = ref(null)
const huespedes = ref(1)
const error = ref("")

const dpEntrada = ref(null)
const dpSalida = ref(null)

// --- LÓGICA DE DISPONIBILIDAD ---

const infoDisponibilidad = computed(() => {
  return DISPONIBILIDAD_DATA.find(p => p.propertyId === Number(props.property?.id));
});

function esFechaDisponible(date) {
  if (!infoDisponibilidad.value) return false;
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return infoDisponibilidad.value.calendario.some(bloque => {
    const inicio = new Date(bloque.inicio);
    const fin = new Date(bloque.fin);
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);
    return d >= inicio && d <= fin && bloque.estado === 'libre';
  });
}

function esRangoValido(inicio, fin) {
  if (!inicio || !fin || !infoDisponibilidad.value) return false;
  const s = new Date(inicio);
  const e = new Date(fin);

  const tieneBloqueo = infoDisponibilidad.value.calendario.some(bloque => {
    const bInicio = new Date(bloque.inicio);
    const bFin = new Date(bloque.fin);
    const seCruzan = s <= bFin && e >= bInicio;
    return seCruzan && bloque.estado !== 'libre';
  });
  return !tieneBloqueo;
}

// --- FUNCIONES DE APOYO ---

function abrirEntrada(){
  dpEntrada.value?.openMenu()
}

function abrirSalida(){
  if(!fechaEntrada.value) return
  dpSalida.value?.openMenu()
}

function formatearFecha(date){
  if(!date) return ""
  return new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short"
  })
}

const estaExpandido = computed(() => {
  return fechaEntrada.value && fechaSalida.value
})

watch(fechaEntrada, (nuevoValor) => {
  if(fechaSalida.value && nuevoValor){
    if(!esRangoValido(new Date(nuevoValor), new Date(fechaSalida.value))){
      fechaSalida.value = null
      error.value = "La fecha seleccionada no está disponible"
    } else {
      error.value = ""
    }
  }
})

watch(fechaSalida, (nuevoValor) => {
  if(fechaEntrada.value && nuevoValor){
    if(!esRangoValido(new Date(fechaEntrada.value), new Date(nuevoValor))){
      fechaSalida.value = null
      error.value = "Rango de fechas no disponible"
    } else {
      error.value = ""
    }
  }
})

const noches = computed(() => {
  if(fechaEntrada.value && fechaSalida.value){
    const diff = new Date(fechaSalida.value) - new Date(fechaEntrada.value)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }
  return 0
})

const total = computed(() => {
  return noches.value * (props.property?.price || 0)
})

const puedeReservar = computed(() => {
  return fechaEntrada.value && fechaSalida.value && noches.value > 0 && !error.value
})

function manejarReserva(){
  if(!puedeReservar.value) return
  emit("reserve", {
    property: props.property,
    checkIn: fechaEntrada.value,
    checkOut: fechaSalida.value,
    guests: huespedes.value,
    nights: noches.value,
    total: total.value
  })
}
</script>

<template>
  <div class="tarjeta-reservacion" :class="{ expandida: estaExpandido }">
    <h2>
      ${{ property.price?.toLocaleString() }} MXN
      <span>/ noche</span>
    </h2>

    <div class="fechas-contenedor">
      <div class="caja-fecha personalizada" @click="abrirEntrada">
        <label>Llegada</label>
        <span>{{ fechaEntrada ? formatearFecha(fechaEntrada) : '-' }}</span>
        <VueDatePicker
          ref="dpEntrada"
          v-model="fechaEntrada"
          :min-date="new Date()"
          :allowed-dates="esFechaDisponible"
          auto-apply
          teleport="body"
          class="datepicker-oculto"
        />
      </div>

      <div class="caja-fecha personalizada" @click="abrirSalida">
        <label>Salida</label>
        <span>{{ fechaSalida ? formatearFecha(fechaSalida) : '-' }}</span>
        <VueDatePicker
          ref="dpSalida"
          v-model="fechaSalida"
          :min-date="fechaEntrada || new Date()"
          :disabled="!fechaEntrada"
          :allowed-dates="esFechaDisponible"
          auto-apply
          teleport="body"
          class="datepicker-oculto"
        />
      </div>
    </div>

    <p v-if="error" class="mensaje-error">{{ error }}</p>

    <div class="seccion-huespedes">
      <span>Huéspedes</span>
      <div class="control-huespedes">
        <button @click="huespedes--" :disabled="huespedes <= 1">-</button>
        <span>{{ huespedes }} huéspedes</span>
        <button @click="huespedes++" :disabled="huespedes >= property.maxGuests">+</button>
      </div>
    </div>

    <div v-if="noches > 0" class="resumen-cobro">
      <div class="fila">
        <span>${{ property.price?.toLocaleString() }} x {{ noches }} noches</span>
        <span>${{ total.toLocaleString() }}</span>
      </div>

      <div class="fila-total">
        <strong>Total</strong>
        <strong>${{ total.toLocaleString() }}</strong>
      </div>
    </div>

    <button 
      class="boton-reservar"
      :disabled="!puedeReservar"
      @click="manejarReserva"
    >
      Reservar 
    </button>
  </div>
</template>

<style scoped>
.tarjeta-reservacion {
  height: 365px;
  max-height: 365px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  border-radius: 20px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 35px rgba(177, 171, 171, 0.15);
  position: sticky;
  font-family: 'Poppins-Regular';
  color: #484769;
  box-sizing: border-box;
  transition: height 0.3s ease;
}

.tarjeta-reservacion.expandida {
  height: 415px;
  max-height: 415px;
}

.fechas-contenedor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #ADADB2;
  border-radius: 12px;
  overflow: hidden;
}

.caja-fecha {
  padding: 10px;
  
}
.caja-fecha:first-child {
  border-right: 1px solid #ADADB2;
}


.caja-fecha.personalizada { 
  cursor: pointer; 
  display: flex; 
  flex-direction: column; 
  gap: 5px; 
}
.caja-fecha.personalizada span { 
  font-size: 14px; 
  font-weight: 500; }

.datepicker-oculto { 
  position: absolute; 
  opacity: 0; 
  pointer-events: none; }

.mensaje-error { 
  color: rgb(255, 89, 0); 
  font-size: 14px; 
  margin-top: 8px; }

.seccion-huespedes { 
  margin-top: 15px; 
  border: 1px solid #ADADB2; 
  border-radius: 12px; padding: 10px; 
}
.control-huespedes { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.control-huespedes button {
  width: 30px; 
  height: 30px; 
  border-radius: 50%;
  border: 1px solid #ccc; 
  background: white;
}

.resumen-cobro { 
  margin-top: 15px;
 }

.fila { 
  display: flex; 
  justify-content: space-between; 
}
.fila-total {
  display: flex; 
  justify-content: space-between;
  border-top: 1px solid #ADADB2; 
  padding-top: 10px;
  font-weight: bold;
}

.boton-reservar {
  width: 100%; 
  margin-top: 15px; 
  padding: 12px;
  border: none; 
  border-radius: 10px;
  background: #ff7c01;
  color: white; 
  font-family: 'Poppins-Regular';
  cursor: pointer;
  font-size: 12px;
}

.boton-reservar:disabled {
  background: #030566;
  cursor: not-allowed;
}

:deep(.dp__menu) { 
  font-family: 'Poppins-Regular'; 
  border-radius: 15px; 
}
  
  :deep(.dp__active_date) { 
  background: #1e90ff; 
  color: white; }


  /* 1. Forzamos las variables de la librería en el contenedor raíz */
:deep(.dp__theme_light), :global(.dp__theme_light) {
  --dp-primary-color: #484769 !important;   /* Tu azul premium */
  --dp-text-color: #484769 !important;      /* Texto principal */
  --dp-hover-color: #f4f4f9 !important;     /* Fondo suave al pasar el mouse */
  --dp-hover-text-color: #ff7c01 !important; /* Tu naranja al pasar el mouse */
  --dp-font-family: 'Poppins-Regular', sans-serif !important;
  --dp-border-radius: 15px !important;
}

/* 2. Estilo del menú flotante (el que sale en la imagen que mandaste) */
body :global(.dp__menu) {
  border: none !important;
  border-radius: 20px !important;
  box-shadow: 0 15px 40px rgba(72, 71, 105, 0.2) !important;
  padding: 12px !important;
  background: #ffffff !important;
}

/* 3. Estilo de los nombres de los días y el encabezado */
body :global(.dp__calendar_header_item) {
  color: #ADADB2 !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  text-transform: uppercase !important;
}

/* 4. El día seleccionado (Círculo azul) */
body :global(.dp__active_date) {
  background: #484769 !important;
  color: #ffffff !important;
  border-radius: 10px !important;
}

/* 5. El día de hoy (Círculo naranja sutil) */
body :global(.dp__today) {
  border: 1.5px solid #ff7c01 !important;
}

/* 6. Días DESHABILITADOS (Ocupados) - Para que se vean tachados como pediste */
body :global(.dp__cell_disabled) {
  color: #d1d1d6 !important;
  text-decoration: line-through !important;
  opacity: 0.5 !important;
  cursor: not-allowed !important;
}

/* 7. Limpieza visual: quitamos flechas y el icono del reloj */
body :global(.dp__arrow_top), 
body :global(.dp__arrow_bottom), 
body :global(.dp__action_row) {
  display: none !important;
}

/* 8. Estilo de las fechas que no son del mes actual */
body :global(.dp__cell_out_of_range) {
  color: #e0e0e0 !important;
}
</style>