<script setup>
import { computed } from 'vue'
import { getPropertyById } from '../services/propertyService'
import { useRouter } from "vue-router"
import Gallery from '@/modules/properties/components/gallery/Gallery.vue'
import ReservationCard from '@/modules/properties/components/ui/ReservationCard.vue'
import DescriptionCard from '@/modules/properties/components/ui/DescriptionCard.vue'
import AlfitionesCard from '@/modules/properties/components/ui/AlfitionesCard.vue'
import AmenitySelector from '@/modules/properties/components/ui/AmenitySelector.vue'
const router = useRouter()


/* Esto es de amenidades*/
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
  border-top: 1px solid #eee; 
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