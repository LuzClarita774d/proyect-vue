<script setup>

import { useRoute } from "vue-router"
import { computed } from "vue"

import PropertyCard from "@/modules/properties/components/PropertyCard.vue"
import { searchProperties } from "@/modules/properties/services/propertyService"

const route = useRoute()

const filters = computed(() => ({
  destination: route.query.destination || "",
  checkIn: route.query.checkIn || "",
  checkOut: route.query.checkOut || "",
  guests: Number(route.query.guests) || 1
}))

const results = computed(() => searchProperties(filters.value))

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