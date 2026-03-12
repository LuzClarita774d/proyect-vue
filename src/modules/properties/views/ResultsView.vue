<script setup>

import { useRoute } from "vue-router"
import { ref, watch, computed } from "vue"
import PropertyCard from '@/modules/properties/components/ui/PropertyCard.vue'
import { searchProperties } from "@/modules/properties/services/PropertyService"

const route = useRoute()

const filters = ref({
destination:"",
checkIn:"",
checkOut:"",
guests:1
})

watch(()=>route.query,(query)=>{

filters.value={
destination: query.destination || "",
checkIn: query.checkIn || "",
checkOut: query.checkOut || "",
guests: Number(query.guests) || 1
}

},{immediate:true})

const results = computed(()=> searchProperties(filters.value))

</script>

<template>

<h1>Resultados</h1>

<div v-if="results.length === 0">
<h2>No hay alojamientos disponibles</h2>
</div>

<div v-else class="results">

<PropertyCard
v-for="property in results"
:key="property.id"
:property="property"
:checkIn="filters.checkIn"
:checkOut="filters.checkOut"
:guests="filters.guests"
/>

</div>

</template>

<style scoped>

.results{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
gap:20px;
}

</style>