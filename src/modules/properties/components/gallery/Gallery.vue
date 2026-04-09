<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getImagesByPropertyId } from '../../services/imageService'

import MainImage from './MainImage.vue'
import Thumbnails from './Thumbnails.vue'

const props = defineProps({
  propertyId: Number,
  rating: Number
})

const router = useRouter()


const imagenes = computed(() => getImagesByPropertyId(props.propertyId))


const currentImage = ref(null)


watch(imagenes, (newImages) => {
  if (newImages.length && !currentImage.value) {
    currentImage.value = newImages[0]
  }
}, { immediate: true })


const thumbnails = computed(() => {
  return imagenes.value.filter(img => img.id !== currentImage.value?.id)
})



const setImage = (img) => {
  currentImage.value = img
}

const goGallery = () => {
  router.push(`/property/${props.propertyId}/gallery`)
}
</script>

<template>
  <div class="gallery-container">
    
    <Thumbnails 
      :images="thumbnails.slice(0, 4)" 
      :active-id="currentImage?.id"
      @select="setImage" 
    />

    <MainImage 
      :image="currentImage" 
      :rating="rating" 
      @verMas="goGallery" 
    />

  </div>
</template>

<style scoped>
.gallery-container {
  display: grid;

  grid-template-columns: 220px 1fr; 
  gap: 15px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  height: 500px; 
}

@media (max-width: 768px) {
  .gallery-container {
    grid-template-columns: 1fr;
    height: auto;
  }
}
</style>