<template>
  <section class="home">
    <h2>Alojamientos populares en Mérida</h2>

    <div class="grid">
      <PropertyCard
          v-for="property in properties"
          :key="property.id"
          :property="property"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PropertyCard from '../components/PropertyCard.vue'
import propertyService from '../services/propertyService'

const properties = ref(propertyService.getAll())
</script>

<style scoped>
.home {
  padding: 40px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>