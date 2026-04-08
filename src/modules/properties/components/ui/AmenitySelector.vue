<script setup>
import {ref, computed } from 'vue';
import { AMENIDADES_DATA } from '@/modules/properties/data/amenidades.js';

const isOpen = ref(false);
const categoriaActiva = ref('basicas');

const categoriasNombres = {
  basicas: 'Básicas',
  comodidad: 'Comodidad',
  entretenimiento: 'Entretenimiento',
  cocina: 'Cocina',
  exterior: 'Exterior',
  seguridad: 'Seguridad',
  limpieza: 'Limpieza'
};


const getIconUrl = (nombreIcono) => {
  return new URL(`../../../../assets/imagenes/iconos/${nombreIcono}`, import.meta.url).href;
};

const listaFiltrada = computed(() => {
  return AMENIDADES_DATA[categoriaActiva.value]?.slice(0, 20) || [];
});

const seleccionarCategoria = (key) => {
  categoriaActiva.value = key;
  isOpen.value = false;
};
</script>

<template>
  <div class="amenities-module">
    
    <div class="dropdown-section">
      <h3 class="title">Amenidades</h3>
      
      <div class="dropdown-custom">
        <button @click="isOpen = !isOpen" class="dropdown-trigger">
          {{ categoriasNombres[categoriaActiva] }}
          <span :class="['arrow', { rotate: isOpen }]">v</span>
        </button>

        <Transition name="fade">
          <ul v-if="isOpen" class="dropdown-menu">
            <li 
              v-for="(label, key) in categoriasNombres" 
              :key="key"
              @click="seleccionarCategoria(key)"
              :class="{ active: categoriaActiva === key }"
            >
              {{ label }}
            </li>
          </ul>
        </Transition>
      </div>
    </div>

    <hr class="divider" />

    <div class="amenities-grid">
      <div 
        v-for="item in listaFiltrada" 
        :key="item.id" 
        class="amenity-card"
      >
        <div class="icon-wrapper">
          <img :src="getIconUrl(item.icono)" :alt="item.nombre" />
        </div>
        <span class="amenity-name">{{ item.nombre }}</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.amenities-module {
  max-width: 800px;
  font-family: 'Marcellus SC', serif;
  color: #152644; 
}

.dropdown-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
}

.title {
  font-size: 1.5rem;
  margin: 0;
}


.dropdown-custom {
  position: relative;
  width: 200px;
}

.dropdown-trigger {
  width: 100%;
  padding: 10px 15px;
  background: white;
  border: 1px solid #484769; 
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: #152644;
  font-family: inherit;
}

.arrow {
  transition: transform 0.3s;
  font-size: 0.8rem;
}
.arrow.rotate { transform: rotate(180deg); }

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10;
  list-style: none;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-menu li:hover, .dropdown-menu li.active {
  background: #7A73B7;
  color: white;
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}


.amenities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 40px; 
}

.amenity-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.amenity-name {
  font-size: 1rem;
  color: #333;
}


.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>