
<template>
  <div v-if="property" class="detail">

    <div class="gallery">

      <div class="thumbnails">
        <img 
          v-for="(img, index) in property.images.slice(1, 5)"
          :key="index"
          :src="img"
        />
      </div>


   
      <div class="main-image">
        <img :src="property.images[0]" />

       
        <div class="rating">
          <img src="@/assets/imagenes/logos/estrella.svg" />
          <span>{{ property.rating }}</span>
        </div>

        <button class="btn">Ver más</button>
      </div>

    </div>

    <div class="info">
      <h1>{{ property.name }}</h1>
      <p class="tipo">{{ property.type }}</p>
      <p>{{ property.location }}</p>
      <p>{{ property.description }}</p>
      <p>${{ property.price }} MXN por noche</p>
      <p>Huéspedes {{ property.maxGuests }}</p>
      <p>Habitaciones {{ property.Habitaciones }}</p>
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
  max-width: 1200px;
  margin: auto;
}


.gallery {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 15px;
   margin-top: 20px;
}


.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;

}

.thumbnails img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
}

.main-image {
  position: relative;
}

.main-image img {
  width: 100%;
  
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
}


.rating {
  position: absolute;
  bottom: 10px;
  left: 10px;

  color: white;
  padding: 5px 10px;

  display: flex;
  align-items: center;
  gap: 5px;
}
.rating img{
  width: 15px;
  height: 15px;
}


.btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: orange;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}



</style>