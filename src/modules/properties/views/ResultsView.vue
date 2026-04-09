<script setup>
import { useRoute } from "vue-router"
import { ref, watch, computed, onUnmounted } from "vue"
import PropertyCard from '@/modules/properties/components/ui/PropertyCard.vue'
import { searchProperties } from "@/modules/properties/services/PropertyService"

const route = useRoute()

const filters = ref({
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: 1
})

watch(() => route.query, (query) => {
  filters.value = {
    destination: query.destination || "",
    checkIn: query.checkIn || "",
    checkOut: query.checkOut || "",
    guests: Number(query.guests) || 1
  }
}, { immediate: true })

onUnmounted(() => {
  filters.value = {
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  }
})

const results = computed(() => searchProperties(filters.value))

/* --- LÓGICA DEL MAPA DINÁMICO --- */
const embedUrl = computed(() => {
  const place = encodeURIComponent(filters.value.destination || "México")
  // Google Maps Embed sin API Key para lugares turísticos
  return `https://maps.google.com/maps?q=${place}+tourism+attractions&t=&z=13&ie=UTF8&iwloc=&output=embed`
})
</script>

<template>
  <div class="search-results-page">
    
    <section class="results-column">
      <header class="results-header">
        <h1>Resultados en {{ filters.destination || 'México' }}</h1>
        <p v-if="results.length > 0">{{ results.length }} alojamientos encontrados</p>
      </header>

      <div v-if="results.length === 0" class="no-results">
       <img src="@/assets/imagenes/logos/flecla.svg" class="empty-icon" />
        <h2>No hay alojamientos disponibles</h2>
        <p>Intenta cambiando los filtros o el destino.</p>
      </div>

      <div v-else class="results-list">
        <div v-for="property in results" :key="property.id" class="horizontal-item">
          <PropertyCard
            :property="property"
            :checkIn="filters.checkIn"
            :checkOut="filters.checkOut"
            :guests="filters.guests"
          />
        </div>
      </div>
    </section>

    <section class="map-column">
      <div class="map-sticky">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          style="border:0;"
          :src="embedUrl"
          allowfullscreen
        ></iframe>
        <div class="map-badge">
          Explorando atractivos cercanos 
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.search-results-page {
  display: flex;
  height: 100vh;
  background-color: #f4f7f9; /* Un gris muy suave para que las cards blancas resalten */
  overflow: hidden;
}

.results-column {
  flex: 1.2;
  padding: 30px;
  overflow-y: auto;
}

.results-header h1 {
  font-family:'Poppins-Regular';
  color: #152644;
 
  margin: 0;
}

.results-header p {
  font-family: 'Gotham-Rounded-Light';
  color: #7A73B7;
  margin-top: 5px;
  font-weight: 500;
}

/* --- TRANSFORMACIÓN HORIZONTAL (La Magia) --- */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 25px;
}

/* Accedemos al interior de PropertyCard sin modificar su archivo */
.horizontal-item :deep(.card) {
  display: flex !important;
  flex-direction: row !important;
  width: 100% !important;
  height: 200px !important;
  border-radius: 20px !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
}

.horizontal-item :deep(.image-container) {
  flex: 0 0 260px !important; /* Ancho de la imagen a la izquierda */
  height: 100% !important;
}

.horizontal-item :deep(.image-container img) {
  height: 100% !important;
  border-radius: 20px 0 0 20px !important;
}

.horizontal-item :deep(.card-body) {
  flex: 1 !important;
  padding: 20px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

/* Ajuste del rating en horizontal */
.horizontal-item :deep(.rating) {
  border-radius: 20px 0 0 0px !important;
}


.map-column {
  flex: 0.8;
  padding: 20px;
  display: none;
}

@media (min-width: 1024px) {
  .map-column { display: block; }
}

.map-sticky {
  position: sticky;
  top: 0;
  height: calc(100vh - 40px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.map-badge {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 10px 20px;
  border-radius: 30px;
 font-family: 'Gotham-Rounded-Light';
  font-size: 0.85rem;
  font-weight: 600;
  color: #152644;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.empty-icon {
  width: 60px;
  margin-bottom: 20px;
  filter: grayscale(1);
  opacity: 0.2;
}

.no-results {
  text-align: center;
  padding-top: 80px;
  font-family: 'Gotham-Rounded-Light';
}


.results-column::-webkit-scrollbar { width: 6px; }
.results-column::-webkit-scrollbar-thumb { background: #d1d8e0; border-radius: 10px; }
</style>