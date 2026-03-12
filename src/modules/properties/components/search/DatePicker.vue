<script setup>
import { ref, watch, computed } from "vue"
import { VueDatePicker } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"


const props = defineProps({
  checkIn: String,
  checkOut: String
})

const emit = defineEmits([
  "update:checkIn",
  "update:checkOut"
])

const range = ref([])

// sincronizar fechas si vienen del padre
watch(
  () => [props.checkIn, props.checkOut],
  ([start, end]) => {
    if (start && end) {
      range.value = [new Date(start), new Date(end)]
    }
  },
  { immediate: true }
)

// calcular noches automáticamente
const nights = computed(() => {
  if (range.value && range.value.length === 2) {
    const start = range.value[0]
    const end = range.value[1]

    const diff = end - start
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }
  return 0
})

// emitir fechas al padre
watch(range, (val) => {
  if (val && val.length === 2) {

    const start = val[0].toISOString().split("T")[0]
    const end = val[1].toISOString().split("T")[0]

    emit("update:checkIn", start)
    emit("update:checkOut", end)
  }
})
</script>

<template>

<div class="campo">

<label>Disponibilidad</label>

<VueDatePicker
v-model="range"
range
:enable-time-picker="false"
:min-date="new Date()"
placeholder="Fechas disponibles"
/>

<!-- contador de noches -->
<p v-if="nights > 0" class="noches">
{{ nights }} noche<span v-if="nights > 1">s</span>
</p>

</div>

</template>

<style scoped>

.campo{
display:flex;
flex-direction:column;
padding:10px 18px;
border-right:1px solid #eee;
width:260px;
}

label{
font-size:12px;
font-weight:600;
font-family:'Gotham-Rounded-Book';
margin-bottom:4px;
}

.noches{
font-size:12px;
color:#717171;
margin-top:4px;
}

</style>