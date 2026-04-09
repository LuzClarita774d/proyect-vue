<script setup>
const props = defineProps({
  images: Array,
  activeId: Number
})
const emit = defineEmits(['select'])
</script>

<template>
  <div class="thumbnails-list">
    <div 
      v-for="img in images" 
      :key="img.id"
      class="thumb-wrapper"
      :class="{ active: img.id === activeId }"
      @click="emit('select', img)"
    >
      <img :src="img.url" class="thumb-img" />
    </div>
  </div>
</template>

<style scoped>
.thumbnails-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumb-wrapper {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  height: 115px; 
  transition: all 0.3s ease;
  opacity: 0.7;
}

.thumb-wrapper:hover {
  opacity: 1;
  transform: translateX(5px);
}

.thumb-wrapper.active {
  opacity: 1;
  box-shadow: 0 0 0 3px #7A73B7; 
}

.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>