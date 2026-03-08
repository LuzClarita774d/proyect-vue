<template>
  <div v-if="property" class="detail">
    <img :src="property.image" />

    <div class="info">
      <h1>{{ property.title }}</h1>
      <p>{{ property.city }}</p>
      <p>${{ property.price }} MXN por noche</p>
     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const property = ref(propertyService.getById(route.params.id))
</script>

<style scoped>
.detail {
  padding: 40px;
}

.detail img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.info {
  margin-top: 20px;
}
</style>