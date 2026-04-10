<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { getImagesByPropertyId } from '../services/imageService'
import { getPropertyById } from '../services/propertyService' 

const route = useRoute()
const router = useRouter()
const propertyId = Number(route.params.id)


const propiedad = computed(() => getPropertyById(propertyId))
const imagenes = computed(() => getImagesByPropertyId(propertyId))

const volverAtras = () => {
  router.back()
}
</script>

<template>
  <div class="gallery-view">
    
    <header class="gallery-header">
<button class="volver" @click="volverAtras">
  <img src="@/assets/imagenes/logos/flecla.svg" alt="Volver" class="fleca" />
  Volver
</button>
      
      <h2>{{ propiedad?.name }}</h2>
      
      <div class="info-meta">
        <span class="rating">
          <img src="@/assets/imagenes/logos/starnaranja.svg" class="mini" />
          {{ propiedad?.rating }}
        </span>
        <span class="divider">•</span>
        <span class="location">
          {{ propiedad?.city }}, {{ propiedad?.location }}
        </span>
        <span class="divider">•</span>
        <span class="count">{{ imagenes.length }} fotos</span>
      </div>
    </header>

    <div class="masonry-grid">
      <div 
        v-for="img in imagenes" 
        :key="img.id" 
        class="masonry-item"
      >
        <img :src="img.url" alt="Property image" class="gallery-photo" loading="lazy" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

.gallery-header {
  margin-bottom: 30px;
}

.volver {
  background: none;
  border: none;
  padding: 8px 0; 
  margin-bottom: 20px;
  color: #152644; 
  font-weight: 600;
    font-family:'Poppins-Regular';
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px; 
  transition: all 0.3s ease;

}

.fleca {
  width: 22px; 
  height: auto;
  transition: transform 0.3s ease;
  display: block; 
   filter: brightness(0) saturate(100%) invert(49%) sepia(94%) saturate(2000%) hue-rotate(1deg) brightness(101%) contrast(101%);
}

.volver:hover {
  color: #ee6b43; 
}


.volver:hover .fleca {
  transform: translateX(-5px); 
}

.gallery-header h2 {
  font-family:'Poppins-Regular';
  font-size: 2.5rem;
  color: #152644;
  margin: 0;
}

.info-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #666;
 font-family:'Poppins-Regular';
  margin-top: 5px;
}

.mini {
  width: 14px;
  margin-right: 4px;
}

.divider {
  color: #100909;
}


.masonry-grid {
  column-count: 3;
  column-gap: 20px;
}

.masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s;
}

.masonry-item:hover {
  transform: scale(1.02);
}

.gallery-photo {
  width: 100%;
  display: block;
}

@media (max-width: 900px) {
  .masonry-grid { column-count: 2; }
}
@media (max-width: 600px) {
  .masonry-grid { column-count: 1; }
}
</style>