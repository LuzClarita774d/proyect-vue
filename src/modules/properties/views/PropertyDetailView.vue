<template>
  <div v-if="property" class="detail">


    <div class="gallery">
      <div class="thumbnails">
        <img 
          v-for="(img, index) in property.images.slice(1, 5)"
          :key="index"
          :src="img"
        />
      </div>

      <div class="main-image">
        <img :src="property.images[0]" />
        <div class="rating">
          <img src="@/assets/imagenes/logos/estrella.svg" />
          <span>{{ property.rating }}</span>
        </div>
        <button class="btn">Ver más</button>
      </div>
    </div>


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

 <DescriptionCard :text="property.description" />
 <hr class="separator">
      

<div class="property-detail-page">
  <section class="amenities-section">
    <AmenitySelector />
  </section>
</div>

          <hr class="separator">

  <div v-if="property.host" class="host-section">
    <AlfitionesCard
      :host="property.host"
      @select="goToHostProfile"
    />
  </div>
      


      </div>

      <ReservationCard 
        :property="property"
        @reserve="goToCheckout"
      />

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getPropertyById } from '../services/propertyService'
import { useRouter } from "vue-router"
import ReservationCard from '@/modules/properties/components/ui/ReservationCard.vue'
import DescriptionCard from '@/modules/properties/components/ui/DescriptionCard.vue'
import AlfitionesCard from '@/modules/properties/components/ui/AlfitionesCard.vue'
import AmenitySelector from '@/modules/properties/components/ui/AmenitySelector.vue'
const router = useRouter()

function goToHostProfile(hostId) {
  router.push(`/host/${hostId}`)
}

const props = defineProps({
  id: String
})

const property = computed(() => {
  return getPropertyById(props.id)
})


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

<style scoped>

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

.amenities-section {
  margin: 40px 0;
  padding: 20px;
  border-top: 1px solid #eee; /* Una línea sutil para separar secciones */
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
  height: auto;
}


.separator {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin-top: 10px;
  margin-left: 0;
  width: 660px;
  margin-right: auto;
  
}
.detail {
  max-width: 1200px;
  margin: auto;
}

.gallery {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 15px;
  margin-top: 20px;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnails img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
}

.main-image {
  position: relative;
}

.main-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
}

.rating {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  display: flex;
  align-items: center;
  gap: 5px;
}

.rating img {
  width: 15px;
  height: 15px;
}

.btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: orange;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
}

.content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  margin-top: 30px;
}

.icons {
  display: flex;
  gap: 20px;
  margin: 10px 0;
}

.icons img {
  width: 18px;
}


</style>