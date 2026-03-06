<template>

  <Hero />

  <section class="home">

    <!-- RECORRE CIUDADES -->
    <div
      v-for="(cityProperties, city) in propertiesByCity"
      :key="city"
      class="city-section"
    >

      <h2 class="title">
        Alojamientos en {{ city }}
      </h2>

      <!-- CARRUSEL -->
      <div class="carousel">

        <div class="carousel-track">

          <PropertyCard
            v-for="(property, index) in repeatCards(cityProperties)"
            :key="property.id + '-' + index"
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
import propertyService from '../services/propertyService'

const properties = ref(propertyService.getAll())

/* AGRUPAR POR CIUDAD */

const propertiesByCity = computed(() => {

  const grouped = {}

  properties.value.forEach(property => {

    if (!grouped[property.city]) {
      grouped[property.city] = []
    }

    grouped[property.city].push(property)

  })

  return grouped

})


/* DUPLICAR SI HAY POCAS */

const repeatCards = (list) => {

  if (list.length >= 8) return list

  return [...list, ...list, ...list, ...list]

}

</script>


<style scoped>

.home{
  padding:40px 80px;
}


/* SECCION POR CIUDAD */

.city-section{
  margin-bottom:60px;
}


/* TITULO */

.title{
  font-size:28px;
  font-weight:600;
  margin-bottom:20px;
}


/* CONTENEDOR CARRUSEL */

.carousel{

  overflow-x:auto;
  scroll-behavior:smooth;

  scroll-snap-type:x mandatory;

}


/* OCULTAR SCROLLBAR */

.carousel::-webkit-scrollbar{
  display:none;
}


/* FILA DE CARDS */

.carousel-track{

  display:flex;

  gap:24px;

  width:max-content;

}


/* SNAP DE CARD */

.carousel-track > *{

  scroll-snap-align:start;

}

</style>