<script setup>
const props = defineProps({
  image: Object,
  rating: Number
})
const emit = defineEmits(['verMas'])
</script>

<template>
  <div class="main-image-container">
    <transition name="fade" mode="out-in">
      <img :key="image?.url" :src="image?.url" class="main-img" />
    </transition>

    <div class="rating-badge">
      <img src="@/assets/imagenes/logos/estrella.svg" alt="star" class="star-icon" />
      <span>{{ rating }}</span>
    </div>

    <button class="ver-mas-btn" @click="emit('verMas')">
      Ver más
    </button>
  </div>
</template>

<style scoped>
.main-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 15px;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rating-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(5px);
 font-family:'Poppins-Regular';
}

.star-icon { width: 14px; height: 14px; }

.ver-mas-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #ff7300; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  font-family:'Poppins-Regular';
}

.ver-mas-btn:hover { transform: scale(1.05); }


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>