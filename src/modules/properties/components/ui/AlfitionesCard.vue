
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


<template>
  <div v-if="hostData" class="host-section-clean" @click="$emit('select', hostData.id)">
    <div class="host-header">
      <div class="image-container">
        <img :src="hostData.image" alt="Anfitrión" class="host-avatar" />
      </div>
      <div class="host-intro">
        <h2 class="host-name">{{ hostData.name }}</h2>
        <div class="host-quick-stats">
          <span class="stat-pill">{{ hostData.rating }} ★ Calificación</span>
          <span class="stat-pill">{{ hostData.totalReviews }} Evaluaciones</span>
        </div>
      </div>
    </div>

    <div class="host-contact-minimal">
      <a 
        @click.stop
        :href="`https://wa.me/${hostData.telefono.replace(/\D/g,'')}`" 
        target="_blank" 
        class="contact-link"
      >
        <img src="@/assets/imagenes/logos/telefono.svg" alt="">
        <span>{{ hostData.telefono }}</span>
      </a>
      <div class="contact-link">
        <img src="@/assets/imagenes/logos/correo.svg" alt="">
        <span>{{ hostData.correo }}</span>
      </div>
    </div>

    <div class="host-details-list">
      <div class="detail-group">
        <label>Estudió:</label>
        <p>{{ hostData.estudios }}</p>
      </div>
      <div class="detail-group">
        <label>Sobre mí:</label>
        <p>{{ hostData.descripcion }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor: Cero fondos, cero bordes. Solo espacio. */
.host-section-clean {
  width: 100%;
  max-width: 660px;
  padding: 20px 0;
  cursor: pointer;
  background: transparent;
}

/* Header con aire */
.host-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.image-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.host-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.host-name {
  font-family:'Poppins-Regular';
  font-size: 18px;
  color: #484769;
  margin: 0;
  font-weight: 500;
}

.host-quick-stats {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}

.stat-pill {
 font-family:'Poppins-Regular';
  font-size: 13px;
  color: #67668C;
}

/* Contacto: Links sutiles */
.host-contact-minimal {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 14px;
  color: #484769;
}

.contact-link img {
  width: 16px;
  opacity: 0.6;
}

.contact-link:hover span {
  color: #FC8312; /* Tu toque de color naranja solo al interactuar */
}

/* LISTADO ORDENADO: Lo que pediste */
.host-details-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-group label {
  display: block;
  font-family: 'Poppins-Medium', sans-serif;
  font-size: 15px;
  color: #152644;
  margin-bottom: 4px;
}

.detail-group p {
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 15px;
  color: #67668C;
  line-height: 1.6;
  margin: 0;
}

/* Una línea divisoria muy tenue para separar del resto de la página */
.host-section-clean {
  border-bottom: 1px solid #f3f3f3;
  padding-bottom: 40px;
}
</style>