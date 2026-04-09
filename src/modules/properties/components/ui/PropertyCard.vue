<template>

<div class="card" @click="goToDetail">


  <div class="image-container">

<img :src="mainImage?.url" />

  <div class="rating">
    <img src="@/assets/imagenes/logos/estrella.svg" class="star"/>
    <span>{{ property.rating }}</span>
  </div>

</div>

  <div class="card-body d">


    <p class="title">{{ property.name }}</p>

    <p class="type">{{ property.type }}</p>

    <div class="location">
      <img src="@/assets/imagenes/logos/ubi-azul.svg"/>
      <span>{{ property.city }}, {{ property.location }}</span>
    </div>

    <div class="price">
      ${{ property.price.toLocaleString() }} MXN
    </div>

   <p class="info">
  {{ nights }} noches · {{ property.maxGuests }} huéspedes máx.
</p>

  </div>

</div>

</template>

<script setup>

import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { getMainImage } from '@/modules/properties/services/imageService'
const mainImage = computed(() => getMainImage(props.property.id))

const props = defineProps({
  property: Object,
  checkIn: String,
  checkOut: String,
  guests: Number
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/property/${props.property.id}`)
}

const nights = computed(() => {

  if(!props.checkIn || !props.checkOut) return 1

  const start = new Date(props.checkIn)
  const end = new Date(props.checkOut)

  const diff = end - start

  return Math.ceil(diff / (1000 * 60 * 60 * 24))

})

</script>

<style scoped>


.card{
  width:320px;
  min-width:320px;
  height:280px;

  display:flex;
  flex-direction:column;

  background:#FFFFFF;
border-radius:20px;
}

.image-container{
position:relative;
}

.image-container img{
  width:100%;
  height:150px;
  object-fit:cover;
  border-radius:20px 20px 0px 0px;

  display:block;
}

.card-body{
  padding:10px 16px;
  flex: 1;

  display:flex;
  flex-direction:column;
  
}

.rating{
  position:absolute;
  bottom:0px;
  right:0;
  background:#ff7300;
  color:#fff;

  display:flex;
  align-items:center;
  gap:6px;

  padding:6px 10px;
  border-radius:20px 0 0 0px;
  font-size:12px;
  font-family:'Gotham-Rounded-Light';
}

.rating img {
width:10px;
height: 10px;
}


.title {
  font-size:16px;
  color:#484769;
  font-family: 'Poppins-Medium';

  white-space: nowrap;       
  overflow: hidden;           
  text-overflow: ellipsis;   
  max-width: 100%;           
  display: block;
}

.title,
.type,
.price,
.info {
  margin: 0;
}

.type{
  margin-bottom:0;
}

.price{
  margin-top:2px;
}


.type{
font-size:12px;
color:#7A73B7;
font-family: 'Poppins-Light';

}

.location{
  display:flex;
  align-items:center;
  gap:6px;
  font-family: 'Poppins-Regular';
  font-size:12px;
  color:#0177FF;

  min-width: 0; 
}
.location span{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.location img{
width:16px;
}

.price{
font-size:16px;
 font-family: 'Poppins-Medium';
color:#484769;

}

.info{
font-size:12px;
font-family: 'Poppins-Light';
color:#7A73B7;
}

</style>