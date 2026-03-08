<template>

  <Hero />

  <section class="home">

    <!-- SOLO 6 CIUDADES -->
    <div
      v-for="(cityProperties, city) in limitedCities"
      :key="city"
      class="city-section"
    >

      <h2 class="title">
        Alojamientos populares en {{ city }}
      </h2>

      <!-- CARRUSEL -->
      <div class="carousel">

        <div class="carousel-track">

          <PropertyCard
            v-for="property in cityProperties"
            :key="property.id"
            :property="property"
          />

        </div>

      </div>

    </div>

  </section>

</template>


<script setup>

import { ref, computed } from 'vue'

import Hero from '@/layout/Headerprincipal.vue'
import PropertyCard from '../components/PropertyCard.vue'

import { properties as propertiesData } from '../data/properties'

const properties = ref(propertiesData)

/* AGRUPAR POR CIUDAD */

const propertiesByCity = computed(() => {

  const grouped = {}

  properties.value.forEach(property => {

    if (!grouped[property.city]) {
      grouped[property.city] = []
    }

    grouped[property.city].push(property)

  })

  /* ORDENAR CADA CIUDAD POR RATING */

  Object.keys(grouped).forEach(city => {

    grouped[city].sort((a, b) => b.rating - a.rating)

  })

  return grouped

})

/* LIMITAR A 6 CIUDADES */

const limitedCities = computed(() => {

  const entries = Object.entries(propertiesByCity.value)

  return Object.fromEntries(entries.slice(0, 6))

})

</script>


<style scoped>

.home{
  padding:160px 80px 40px 80px;
}

/* SECCION POR CIUDAD */

.city-section{
  margin-bottom:70px;
}

/* TITULO */

.title{
  font-size:28px;
  font-weight:600;
  margin-bottom:25px;
  font-family:'Montserrat-SemiBold';
  color:#48427B;
}

/* CONTENEDOR CARRUSEL */

.carousel{
  overflow-x:auto;
  scroll-behavior:smooth;
}

/* OCULTAR SCROLLBAR */

.carousel::-webkit-scrollbar{
  display:none;
}

/* FILA DE CARDS */

.carousel-track{
  display:flex;
  gap:24px;
}

/* CARD SIZE (4 COLUMNAS) */

.carousel-track > *{
  flex:0 0 calc(25% - 18px);
}

</style>