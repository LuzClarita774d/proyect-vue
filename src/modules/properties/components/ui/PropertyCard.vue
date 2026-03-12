<template>

<div class="card" @click="goToDetail">

  <!-- imagen -->
  <div class="image-container">

    <img :src="property.images[0]" />

  </div>

  <div class="card-body d">

    <!-- rating -->
    <div class="rating">
      <img src="@/assets/imagenes/logos/estrella.svg" class="star"/>
      <span>{{ property.rating }}</span>
    </div>

    <h1 class="title">{{ property.name }}</h1>

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
flex-shrink:0;
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
display:flex;
align-items:center;
gap:6px;
font-size:10px;
font-family:'Gotham-Rounded-Light';
color:#7A73B7;
}

.star{
width:16px;
}

.title{
font-size:16px;
font-weight:700;
color:#484769;
font-family:'Gotham-Rounded-Book';
margin:7px 0;
}

.type{
font-size:12px;
color:#7A73B7;
font-family:'Gotham-Rounded-Light';
margin-bottom:3px;
}

.location{
display:flex;
align-items:center;
gap:6px;
font-family:'Gotham-Rounded-Book';
font-size:12px;
color:#0177FF;
}

.location img{
width:16px;
}

.price{
font-size:13px;
font-weight:700;
font-family:'Gotham-Rounded-Book';
color:#5A5A8A;
margin-top:6px;
}

.info{
font-size:13px;
font-family:'Gotham-Rounded-Light';
color:#7A73B7;
}

</style>