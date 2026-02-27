<template>
  <div class="card" @click="goToDetail">
    <img :src="property.image" alt="property" />

    <div class="card-body">
      <h3>{{ property.title }}</h3>
      <p>{{ property.city }}</p>
      <p class="price">${{ property.price }} MXN por noche</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  property: Object
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/property/${props.property.id}`)
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.02);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 10px;
}

.price {
  font-weight: bold;
}
</style>