<template>
  <div v-if="hostData" class="alfition-card" @click="$emit('select', hostData.id)">
    <div class="top-row">
      <h2 class="anfitrion-title">Anfitrión</h2>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-number">{{ hostData.totalReviews }}</span>
          <span class="stat-label">Evaluaciones</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ hostData.rating }}</span>
          <span class="stat-label">Calificación</span>
        </div>
      </div>
    </div>

    <hr class="separator-line">

    <div class="alfition-body">
      <div class="left-column">
        <img :src="hostData.image" alt="Foto del anfitrión" class="alfition-image" />
        <a 
          @click.stop
          :href="`https://wa.me/${hostData.telefono.replace(/\D/g,'')}`" 
          target="_blank" 
          class="alfition-button"
        >
          Escríbeme
        </a>
      </div>

      <div class="right-column">
        <h3 class="alfition-name">{{ hostData.name }}</h3>
        
        <div class="contact-details">
          <p class="contact-item">
            <span class="icon"><img src="@/assets/imagenes/logos/telefono.svg" alt=""></span> 
            {{ hostData.telefono }}
          </p>
          <p class="contact-item email">
            <span class="icon"><img src="@/assets/imagenes/logos/correo.svg" alt=""></span> 
            {{ hostData.correo }}
          </p>
        </div>

        <hr class="inner-separator">

        <div class="bio-details">
          <p><strong>Estudió:</strong> {{ hostData.estudios }}</p>
          <p class="description"><strong>Sobre mí:</strong> {{ hostData.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import { getHostById } from'@/modules/properties/services/hostService'

const props = defineProps({
  // RECIBE SOLO EL ID DESDE EL PADRE
  hostId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['select'])

// LÓGICA: El componente busca al anfitrión usando el ID que recibió
const hostData = computed(() => {
  return getHostById(props.hostId)
})
</script>


<style scoped>

.alfition-card {
  background-color: #f9f9f9;
  border: 1px solid #dedede;
  border-radius: 15px;
  padding: 25px;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.anfitrion-title {
  font-family: 'Poppins-Medium', sans-serif;
  color: #484769;
  font-size: 26px;
  margin: 0;
}

.stats-container {
  display: flex;
  gap: 20px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: 'Poppins-Medium', sans-serif;
  color: #484769;
  font-size: 16px;
}

.stat-label {
  font-family: 'Poppins-Medium', sans-serif;
  color: #484769;
  font-size: 12px;
}

.separator-line {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin: 15px 0;
}

.inner-separator {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin: 12px 0;
}

.alfition-body {
  display: flex;
  gap: 20px;
}

.left-column {
  display: flex;
  flex-direction: column;
  width: 130px;
  gap: 15px;
}

.alfition-image {
  width: 130px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
}

.alfition-button {
  background-color: #FC8312;
  color: #fff;
  text-align: center;
  text-decoration: none;
  padding: 10px 0;
  border-radius: 8px;
  font-family: 'Poppins-Medium', sans-serif;
  font-size: 14px;
  transition: opacity 0.2s;
}

.alfition-button:hover {
  opacity: 0.9;
}

.right-column {
  flex: 1;
}

.alfition-name {
  font-family: 'Poppins-Medium', sans-serif;
  color: #484769;
  font-size: 24px;
  margin: 0 0 10px 0;
}

.contact-item {
  font-family: 'Poppins-Regular', sans-serif;
  color: #484769;
  font-size: 16px;
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.email {
  text-decoration: underline;
  font-size: 15px;
}

.bio-details p {
  font-family: 'Poppins-Regular', sans-serif;
  color: #484769;
  font-size: 14px;
  line-height: 1.4;
  margin: 6px 0;
}

.bio-details strong {
  font-family: 'Poppins-Medium', sans-serif;
}

.description {
  margin-top: 10px;
}
</style>