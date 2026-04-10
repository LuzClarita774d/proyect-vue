<script setup>
import { ref, computed } from 'vue';
import { AMENIDADES_DATA } from '@/modules/properties/data/amenidades.js';
import { property_details } from '@/modules/properties/data/propertyDetails.js';
import vIcon from "@/assets/imagenes/logos/v.svg"; // Importación del icono

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
});

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

const misAmenidadesIds = computed(() => {
  const detalle = property_details.find(d => Number(d.propertyId) === Number(props.id));
  return detalle?.amenidadesid || []; 
});

const listaFiltrada = computed(() => {
  const todasEnCategoria = AMENIDADES_DATA[categoriaActiva.value] || [];
  return todasEnCategoria.filter(amenidad => 
    misAmenidadesIds.value.includes(amenidad.id)
  );
});

const getIconUrl = (nombreIcono) => {
  return new URL(`../../../../assets/imagenes/iconos/${nombreIcono}`, import.meta.url).href;
};

const seleccionarCategoria = (key) => {
  categoriaActiva.value = key;
  isOpen.value = false;
};
</script>
<template>
  <div class="amenities-module">
    <div class="header-container">
      <div class="dropdown-custom">
        <div @click="isOpen = !isOpen" class="dropdown-trigger">
          <div class="title-wrapper">
            <h3 class="title">Amenidades</h3>
            <img 
              :src="vIcon" 
              alt="v" 
              :class="['arrow-icon', { rotate: isOpen }]" 
            />
          </div>
        </div>

        <Transition name="dropdown-slide">
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
      
      <span class="current-category">{{ categoriasNombres[categoriaActiva] }}</span>
    </div>

    <div class="amenities-grid">
      <template v-if="listaFiltrada.length > 0">
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
      </template>
      
      <p v-else class="no-amenities">No se incluyen amenidades de esta categoría.</p>
    </div>
  </div>
</template>

<style scoped>
.amenities-module {
  max-width: 800px;
  padding: 10px;
}

.header-container {
  margin-bottom: 25px;
}

.dropdown-custom {
  position: relative;
  display: inline-block;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.title { 
  font-family:'Poppins-Regular';
  font-size: 18px;
  color: #484769;
  margin: 0;
  font-weight: 500;
}

.arrow-icon {
  width: 14px;
  height: auto;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Movimiento elatico */
}

.arrow-icon.rotate {
  transform: rotate(180deg);
}

.current-category {
  display: block;
  font-family: 'Gotham-Rounded-Light', sans-serif;
  color: #484769;
  font-size: 0.85rem;
  margin-top: 4px;
  opacity: 0.6;
  letter-spacing: 0.5px;
}


.dropdown-menu {
  position: absolute;
  top: 120%;
  left: 0;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(72, 71, 105, 0.15); /* Sombra con el color de tu marca */
  z-index: 50;
  list-style: none;
  padding: 10px 0;
  margin: 0;
  border: 1px solid rgba(72, 71, 105, 0.05);
}

.dropdown-menu li {
  padding: 12px 20px;
  font-family: 'Poppins-Regular', sans-serif;
  font-size: 0.9rem;
  color: #484769;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}


.dropdown-menu li:hover {
  background: #f4f4f9;
  padding-left: 28px; 
  color: #484769;
}

.dropdown-menu li.active {
  background: #484769;
  color: white;
  font-weight: 500;
}

.dropdown-slide-enter-active {
  transition: all 0.3s ease-out;
}

.dropdown-slide-leave-active {
  transition: all 0.2s ease-in;
}

.dropdown-slide-enter-from {
  opacity: 0;
  transform: translateY(-15px); 
}

.dropdown-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


.amenities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px 45px;
}

.amenity-card {
  display: flex;
  align-items: center;
  gap: 14px;
  transition: transform 0.2s ease;
}

.amenity-card:hover {
  transform: translateX(5px);
}

.icon-wrapper img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  opacity: 0.9;
}

.amenity-name {
  font-family: 'Gotham-Rounded-Light', sans-serif;
  font-size: 0.95rem;
  color: #484769;
}

.no-amenities {
  font-family: 'Gotham-Rounded-Light', sans-serif;
  color: #333233;
  opacity: 0.5;
  font-style: italic;
}
</style>