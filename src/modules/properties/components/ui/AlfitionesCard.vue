<template>
  <div v-if="host" class="alfition-card">
    <div class="top-row">
      <h2 class="anfitrion-title">Anfitrión</h2>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-number">{{ host.totalReviews }}</span>
          <span class="stat-label">Evaluaciones</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ host.rating }}</span>
          <span class="stat-label">Calificación</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ host.joinedDate }}</span>
          <span class="stat-label">Miembro</span>
        </div>
      </div>
    </div>

    <hr class="separator-line">

    <div class="alfition-body">
      <div class="left-column">
        <img :src="host.image" alt="Foto del anfitrión" class="alfition-image" />
        <a 
          :href="`https://wa.me/521998395961`" 
          target="_blank" 
          rel="noopener noreferrer"
          class="alfition-button"
        >
          Escríbeme
        </a>
      </div>

      <div class="right-column">
        <h3 class="alfition-name">{{ host.name }}</h3>
        
        <div class="contact-details">
          <p class="contact-item">
            <span class="icon"><img src="@/assets/imagenes/logos/telefono.png" alt=""></span> {{ host.telefono }}
          </p>
          <p class="contact-item email">
            <span class="icon"><img src="@/assets/imagenes/logos/correo.png" alt=""</span> {{ host.correo }}
          </p>
        </div>

        <hr class="inner-separator">

        <div class="bio-details">
          <p><strong>Estudie:</strong> {{ host.estudios }}</p>
          <p class="description"><strong>Sobre mi:</strong> {{ host.descripcion }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  host: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Contenedor Principal */
.alfition-card {
  background-color: #f9f9f9;
  border: 1px solid #dedede;
  border-radius: 15px;
  padding: 25px;
  max-width: 550px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

/* Fila Superior */
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

/* Líneas Separadoras */
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

/* Cuerpo de la Card */
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
  background-color: #059CF3;
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

/* Columna Derecha */
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