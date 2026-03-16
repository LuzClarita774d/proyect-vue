<template>
  <div v-if="property" class="detail">

    <div class="array">
  <img 
    v-for="(img, index) in property.images"
    :key="index"
    :src="img"
  />
</div>


    <div class="info">

       <h1> {{ property.name }}</h1>
       <div  class="estrellita ">
        <img src="@/assets/imagenes/logos/estrella.svg" alt="estrella"/>
             <span>{{ property.rating }}</span>
       </div>
      <p class="tipo" >{{property.type }}</p>
      <p>{{ property.location }}</p>
      <p>{{ property.description }}</p>
      <p>${{ property.price }} MXN por noche</p>
      <p> Huespedes  {{ property.maxGuests }}</p>
      <p>Habitaciones  {{ property.Habitaciones }}</p>
      <p>Baños {{ property.Baños }}</p>
      <p>{{ property.amenities }}</p>
     
    </div>

  </div>
</template>

<script setup>

import { computed } from 'vue'
import { getPropertyById } from '../services/propertyService'

const props = defineProps({
  id: String
})

const property = computed(() => {
  return getPropertyById(props.id)
})

</script>

<style scoped>
.detail {
  padding: 40px;
}

.array img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
}

.info {
  margin-top: 20px;
}

.estrellita{
  width: 30px;
  height: 30px;
  display:flex;
align-items:center;
gap:6px;
font-size:17px;
font-family:'Gotham-Rounded-Light';
color:#7A73B7;




}
</style>