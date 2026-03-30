<template>

  <Hero />

  <section class="home">

    <div
      v-for="(cityProperties, city) in limitedCities"
      :key="city"
      class="city-section"
    >

      <h2 class="title">
        Alojamientos populares en {{ city }}
      </h2>


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
import PropertyCard from '@/modules/properties/components/ui/PropertyCard.vue'

import { properties as propertiesData } from '../data/properties'

const properties = ref(propertiesData)



const propertiesByCity = computed(() => {

  const grouped = {}

  properties.value.forEach(property => {

    if (!grouped[property.city]) {
      grouped[property.city] = []
    }

    grouped[property.city].push(property)

  })



  Object.keys(grouped).forEach(city => {

    grouped[city].sort((a, b) => b.rating - a.rating)

  })

  return grouped

})



const limitedCities = computed(() => {

  const entries = Object.entries(propertiesByCity.value)

  return Object.fromEntries(entries.slice(0, 6))

})

</script>


<style scoped>

.home{
  padding:160px 80px 40px 80px;
}


.city-section{
  margin-bottom:70px;
}


.title{
  font-size:20px;
  margin-bottom:25px;
  font-family: 'Poppins-Regular';
  color:#48427B;
}



.carousel{
  overflow-x:auto;
  scroll-behavior:smooth;
}


.carousel::-webkit-scrollbar{
  display:none;
}


.carousel-track {
  display:flex;
  gap:24px;
  width:max-content;

  align-items:flex-start; 
}



</style>