<template>

<div class="card" @click="goToDetail">


  <div class="image-container">

  <img :src="property.images[0]" />

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
height:350px;
background:#FFFFFF;
border-radius:20px;
cursor:pointer;}


.image-container{
position:relative;
}

.image-container img{
width:320px;
height:150px;
object-fit:cover;
border-radius:20px 20px 0px 0px;
}

.card-body{
padding:5px 18px;

}

.rating{
  position:absolute;
  bottom:4px;
  right:0;
  background:#484769;
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
font-size:20px;
color:#484769;
 font-family: 'Poppins-Medium';

}

.type{
font-size:12px;
color:#7A73B7;
font-family: 'Poppins-Light';
margin-bottom:3px;
}

.location{
display:flex;
align-items:center;
gap:6px;
font-family: 'Poppins-Regular';
font-size:12px;
color:#0177FF;
}

.location img{
width:16px;
}

.price{
font-size:14px;
 font-family: 'Poppins-Medium';
color:#484769;
margin-top:6px;
}

.info{
font-size:12px;
font-family: 'Poppins-Light';
color:#7A73B7;
}

</style>