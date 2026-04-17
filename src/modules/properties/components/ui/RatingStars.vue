<script setup>
import { computed, ref } from 'vue';
import { getRatingByPropertyId } from '@/modules/properties/services/ratingService';

const props = defineProps({
  propertyId: { type: [String, Number], required: true }
});

const data = computed(() => getRatingByPropertyId(props.propertyId));

const limit = ref(10);
const visibleReviews = computed(() => {
  return data.value.reviews ? data.value.reviews.slice(0, limit.value) : [];
});

const showMore = () => { limit.value += 10; };
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const getIcon = (cat) => {
  const icons = {
    limpieza: 'limpieza.svg',
    veracidad: 'veracidad.svg',
    llegada: 'llave.svg',
    comunicacion: 'mensaje.svg',
    ubicacion: 'mapa.svg'
  };
  return new URL(`../../../../assets/imagenes/iconos/${icons[cat]}`, import.meta.url).href;
};
</script>

<template>
  <div class="rating-section-ultra-clean" v-if="data.totalReviews > 0">
    
    <div class="header-rating">
      <img src="@/assets/imagenes/logos/starnaranja.svg" class="main-star" />
      <span class="score">{{ data.overallRating }}</span>
      <span class="reviews-count">{{ data.totalReviews }} evaluaciones</span>
    </div>

    <div class="rating-grid">
      <div v-for="(valor, categoria) in data.categories" :key="categoria" class="category-card">
        <div class="category-info">
          <span class="category-label">{{ capitalize(categoria) }}</span>
          <span class="category-value">{{ valor }}</span>
        </div>
        <img :src="getIcon(categoria)" class="category-icon" />
      </div>
    </div>
     <hr class="separator-largo">

    <div class="evaluations-container">
      <div class="evaluations-grid">
        <div v-for="review in visibleReviews" :key="review.id" class="eval-item">
          <div class="user-profile">
            <img :src="review.userImage" class="avatar-img" />
            <div class="user-meta">
              <p class="name">{{ review.userName }}</p>
              <p class="city-date">{{ review.userCity }} · {{ review.date }}</p>
            </div>
          </div>

          <p class="eval-comment">{{ review.comment }}</p>
        </div>
      </div>

      <div v-if="data.reviews.length > limit" class="load-more-box">
        <button @click="showMore" class="link-show-more">Mostrar más evaluaciones</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rating-section-ultra-clean { margin: 60px 0; }
.separator-largo {
  border: 0;
  border-top: 1px solid #ADADB2;
  margin: 40px 0;
  width: 100%; 
}

/* Header principal */
.header-rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 50px;
}
.score { 
font-family: 'Poppins-Medium';
font-size: 23px; 
color: #484769; 
}

.main-star { 
    width: 26px;
 }
.reviews-count { 
font-size: 20px; 
color: #484769; 
font-family:'Poppins-Regular';
text-decoration: underline;
 }

.rating-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  border-bottom: 1px solid #F3F3F3;
  padding-bottom: 50px;
}
.category-card {
  border-left: 1px solid #F0F0F0;
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
}
.category-card:first-child { border-left: none; padding-left: 0; }

.category-info { display: flex; flex-direction: column; gap: 4px; }

.category-label { 
font-size: 15px; 
color: #484769; 
font-family:'Poppins-Regular'; 
letter-spacing: 1px;
}

.category-value { 
font-size: 13px;
color: #67668C; 
font-family: 'Poppins-Regular';
 }
.category-icon { 
width: 30px; 
opacity: 0.5;
 }

.evaluations-container { 
    margin-top: 70px;
 }
.evaluations-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px 80px;
}

.eval-item {
  background: transparent; 
}

.user-profile { 
  display: flex; 
  align-items: center; 
  gap: 15px; 
  margin-bottom: 18px; }
.avatar-img { 
  width: 48px; 
  height: 48px; 
  border-radius: 50%; 
  object-fit: cover; 
}
.name { 
  font-family: 'Poppins-Medium'; 
  font-size: 16px; 
color: #484769; 
  
  margin: 0; 
}
.city-date { 
  font-family: 'Poppins-Regular'; 
  font-size: 13px; 
  color: #ADADB2; 
  margin: 0; 
}

.eval-comment {
  font-family: 'Poppins-Regular';
  font-size: 14px;
  line-height: 1.8; 
  color: #67668C;
  margin: 0;
}


.load-more-box { 
  margin-top: 60px; 
  text-align: left; }
.link-show-more {
  border: none;
  background: transparent;
  padding: 0;
  font-family: 'Poppins-Medium';
  font-size: 16px;
  color: #152644;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
}
.link-show-more:hover {
  color: #FC8312; 
}
</style>