<script setup>
import { ref, computed, watch } from "vue"
import { VueDatePicker } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"


const props = defineProps({
  property: Object
})


const emit = defineEmits(["reserve"])


const checkIn = ref(null)
const checkOut = ref(null)
const guests = ref(1)
const error = ref("")

const dpCheckIn = ref(null)
const dpCheckOut = ref(null)


function openCheckIn(){
  dpCheckIn.value?.openMenu()
}

function openCheckOut(){
  if(!checkIn.value) return
  dpCheckOut.value?.openMenu()
}

function formatDate(date){
  if(!date) return ""
  return new Date(date).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short"
  })
}

const isExpanded = computed(() => {
  return checkIn.value && checkOut.value
})


function isDateAvailable(date){
  if(!props.property?.availability) return true

  return props.property.availability.some(range => {
    const from = new Date(range.from)
    const to = new Date(range.to)
    return date >= from && date <= to
  })
}


function isRangeValid(start, end){
  if(!start || !end) return false

  return props.property.availability?.some(range => {
    const from = new Date(range.from)
    const to = new Date(range.to)
    return start >= from && end <= to
  })
}


watch(checkIn, (newVal) => {
  if(checkOut.value && newVal){
    const valid = isRangeValid(new Date(newVal), new Date(checkOut.value))

    if(!valid){
      checkOut.value = null
      error.value = "La fecha seleccionada no está disponible"
    } else {
      error.value = ""
    }
  }
})

watch(checkOut, (newVal) => {
  if(checkIn.value && newVal){
    const valid = isRangeValid(new Date(checkIn.value), new Date(newVal))

    if(!valid){
      checkOut.value = null
      error.value = "Rango de fechas no disponible"
    } else {
      error.value = ""
    }
  }
})

const nights = computed(() => {
  if(checkIn.value && checkOut.value){
    const diff = new Date(checkOut.value) - new Date(checkIn.value)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }
  return 0
})

const total = computed(() => {
  return nights.value * (props.property?.price || 0)
})

const canReserve = computed(() => {
  return checkIn.value && checkOut.value && nights.value > 0 && !error.value
})


function handleReserve(){
  if(!canReserve.value) return

  emit("reserve", {
    property: props.property,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    guests: guests.value,
    nights: nights.value,
    total: total.value
  })
}
</script>

<template>
  <div 
    class="reservation-card"
    :class="{ expanded: isExpanded }"
  >

    <h2>
      ${{ property.price.toLocaleString() }} MXN
      <span>/ noche</span>
    </h2>

    <div class="dates">

    
      <div class="date-box custom" @click="openCheckIn">
        <label>Llegada</label>
        <span>{{ checkIn ? formatDate(checkIn) : '-' }}</span>

        <VueDatePicker
          ref="dpCheckIn"
          v-model="checkIn"
          :min-date="new Date()"
          :allowed-dates="isDateAvailable"
          auto-apply
          teleport="body"
          class="hidden-datepicker"
        />
      </div>

    
      <div class="date-box custom" @click="openCheckOut">
        <label>Salida</label>
        <span>{{ checkOut ? formatDate(checkOut) : '-' }}</span>

        <VueDatePicker
          ref="dpCheckOut"
          v-model="checkOut"
          :min-date="checkIn || new Date()"
          :disabled="!checkIn"
          :allowed-dates="isDateAvailable"
          auto-apply
          teleport="body"
          class="hidden-datepicker"
        />
      </div>

    </div>

    <p v-if="error" class="error">{{ error }}</p>

  
    <div class="guests">
      <span>Huéspedes</span>

      <div class="guest-control">
        <button @click="guests--" :disabled="guests <= 1">-</button>
        <span>{{ guests }} huéspedes</span>
        <button @click="guests++" :disabled="guests >= property.maxGuests">+</button>
      </div>
    </div>

   
    <div v-if="nights > 0" class="summary">
      <div class="row">
        <span>${{ property.price }} x {{ nights }} noches</span>
        <span>${{ total }}</span>
      </div>

      <div class="total">
        <strong>Total</strong>
        <strong>${{ total }}</strong>
      </div>
    </div>

   
    <button 
      class="reserve-btn"
      :disabled="!canReserve"
      @click="handleReserve"
    >
      Reservar ->
    </button>

  </div>
</template>

<style scoped>


.reservation-card{
  height: 335px;
  max-height: 335px;

  overflow-y: auto;
  overflow-x: hidden;

  padding:20px;
  border-radius:20px;

  backdrop-filter: blur(12px);
  background: rgba(255,255,255,0.6);

  box-shadow:0 10px 35px rgba(0,0,0,0.15);

  position:sticky;
  top:20px;

  font-family:'Poppins-Regular';
  color:#484769;

  box-sizing: border-box;
  transition: height 0.3s ease;
}


.reservation-card.expanded{
  height: 415px;
  max-height: 415px;
}


.reservation-card::-webkit-scrollbar {
  width: 6px;
}

.dates{
  display:grid;
  grid-template-columns:1fr 1fr;
  border:1px solid #ADADB2;
  border-radius:12px;
  overflow:hidden;
}

.date-box{
  padding:10px;
}

.date-box:first-child{
  border-right:1px solid #ADADB2;
}

.date-box.custom{
  cursor:pointer;
  display:flex;
  flex-direction:column;
  gap:5px;
}

.date-box.custom span{
  font-size:14px;
  font-weight:500;
}


.hidden-datepicker{
  position:absolute;
  opacity:0;
  pointer-events:none;
}


.error{
  color:red;
  font-size:14px;
  margin-top:8px;
}


.guests{
  margin-top:15px;
  border:1px solid #ADADB2;
  border-radius:12px;
  padding:10px;
}

.guest-control{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.guest-control button{
  width:30px;
  height:30px;
  border-radius:50%;
  border:1px solid #ccc;
  background:white;
}


.summary{
  margin-top:15px;
}

.row{
  display:flex;
  justify-content:space-between;
}

.total{
  display:flex;
  justify-content:space-between;
  border-top:1px solid #ADADB2;
  padding-top:10px;
  font-weight:bold;
}

.reserve-btn{
  width:100%;
  margin-top:15px;
  padding:12px;
  border:none;
  border-radius:10px;
  background:#1e90ff;
  color:white;
  font-weight:bold;
}

:deep(.dp__menu){
  font-family:'Poppins-Regular';
  border-radius:15px;
}

:deep(.dp__active_date){
  background:#1e90ff;
  color:white;
}

</style>