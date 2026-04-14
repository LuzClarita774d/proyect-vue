<script setup>
import { computed } from 'vue'
import { getPropertyById } from '../services/propertyService'
import { useRouter } from "vue-router"
import Gallery from '@/modules/properties/components/gallery/Gallery.vue'
import ReservationCard from '@/modules/properties/components/ui/ReservationCard.vue'
import DescriptionCard from '@/modules/properties/components/ui/DescriptionCard.vue'
import AlfitionesCard from '@/modules/properties/components/ui/AlfitionesCard.vue'
import AmenitySelector from '@/modules/properties/components/ui/AmenitySelector.vue'
import RatingStars from '@/modules/properties/components/ui/RatingStars.vue';

const router = useRouter()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const property = computed(() => {
  return getPropertyById(props.id)
})

function goToHostProfile(hostId) {
  router.push(`/host/${hostId}`)
}

function goToCheckout(data){
  router.push({
    name: "checkout",
    query: {
      name: data.property.name,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      nights: data.nights,
      total: data.total
    }
  })
}
</script>

<template>
  <div v-if="property" class="detail">
    <Gallery 
      :propertyId="property.id"
      :rating="property.rating"
    />

    <div class="content">
      <div class="info">
        <div class="property-container">
          <div class="header-inline">
            <h1 class="titulo">{{ property.name }}</h1>
            <p class="tipo">{{ property.type }}</p>
          </div>

          <div class="icons">
            <div class="icon-item">
              <img src="@/assets/imagenes/logos/habitaciones.svg">
              <span>{{ property.Habitaciones }} Habitaciones</span>
            </div>
            <div class="icon-item">
              <img src="@/assets/imagenes/logos/baños.svg">
              <span>{{ property.Baños }} Baños</span>
            </div>
            <div class="icon-item">
              <img src="@/assets/imagenes/logos/huespedes.svg">
              <span>{{ property.maxGuests }} huéspedes máx.</span>
            </div>
          </div>
          
          <hr class="separator">
        </div>

        <div class="property-detail">
          <DescriptionCard :id="props.id" />
        </div>

        <hr class="separator">
        
        <AmenitySelector :id="id" />

        <hr class="separator">
        
        <div v-if="property.hostId" class="host-section">
          <AlfitionesCard
            :hostId="property.hostId" 
            @select="goToHostProfile"
          />
        </div>
      </div>

      <aside class="sidebar">
        <ReservationCard 
          :property="property"
          @reserve="goToCheckout"
          class="sticky-card"
        />
      </aside>
    </div>

    <div class="full-width-section">
      <hr class="separator-largo">
      <div class="rating-wrapper">
        <RatingStars :propertyId="props.id" />
        
        
      </div>
    </div>

  </div>
</template>

<style scoped>
.detail {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 80px;
  margin-top: 30px;
  align-items: flex-start;
  margin-bottom: 50px; 
}

.sidebar {
  position: relative;
  height: 100%;
}

.sticky-card {
  position: sticky;
  top: 40px; 
  z-index: 10;
}

.full-width-section {
  width: 100%;
  margin-top: 20px;
}

.rating-wrapper {
  max-width: 100%; 
  margin: auto;
}

/* Estilos de Tipografía */
.header-inline {
  display: flex;
  align-items: baseline; 
  gap: 15px;
  margin-bottom: 25px;
}

.titulo {
  font-family: 'Poppins-Medium';
  font-size: 40px; 
  color: #484769;
  margin: 0;
}

.tipo {
  font-family: 'Poppins-Regular';
  font-size: 15px;
  color: #67668C;
  margin: 0;
}

.icons {
  display: flex;
  gap: 40px; 
  margin-bottom: 15px;
}

.icon-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Poppins-Light', sans-serif;
  color: #484769;
  font-size: 16px;
}

.icon-item img {
  width: 24px;
}


.separator {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin: 30px 0;
  width: 100%;
  max-width: 660px; 
}

.separator-largo {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin: 40px 0;
  width: 100%; 
}

.host-section {
  margin: 40px 0;
}
</style>