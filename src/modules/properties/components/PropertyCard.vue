<template>

<div class="card" @click="goToDetail">

  <!-- imagen -->
  <div class="image-container">

    <img :src="property.images[0]" />


  </div>

  <div class="card-body">

    <!-- rating -->
    <div class="rating">
      <img src="@/assets/imagenes/logos/estrella.svg" class="star"/>
      <span>{{ property.rating }}</span>
    </div>

    <h3 class="title">{{ property.name }}</h3>

    <p class="type">Hotel</p>

    <div class="location">
      <img src="@/assets/imagenes/logos/ubi-azul.svg"/>
      <span>{{ property.location }}</span>
    </div>

    <div class="price">
      ${{ property.price.toLocaleString() }} MXN
    </div>

    <p class="info">4 noches 4 personas</p>

  </div>

</div>

</template>

<script setup>

import { useRouter } from 'vue-router'

const props = defineProps({
  property: Object
})

const router = useRouter()

const goToDetail = () => {
  router.push(`/property/${props.property.id}`)
}

</script>

<style scoped>

.card{
width:341px;
height:315px;
background:#FFFFFF;
border-radius:20px;
flex-shrink:0;
cursor:pointer;
}

.image-container{
position:relative;
}

.image-container img{
width:341px;
height:169.85px;
object-fit:cover;
}

.arrow{
position:absolute;
top:50%;
transform:translateY(-50%);
width:20px;
cursor:pointer;
}

.left{
left:2px;
}

.right{
right:2px;
}

.card-body{
padding:12px 16px;
}

.rating{
display:flex;
align-items:center;
gap:6px;
font-size:14px;
color:#6A6A8A;
}

.star{
width:16px;
}

.title{
font-size:22px;
font-weight:600;
color:#1B2A4E;
margin:4px 0;
}

.type{
font-size:14px;
color:#8A8AA0;
margin-bottom:4px;
}

.location{
display:flex;
align-items:center;
gap:6px;
font-size:14px;
color:#2F80ED;
}

.location img{
width:16px;
}

.price{
font-size:24px;
font-weight:700;
color:#5A5A8A;
margin-top:6px;
}

.info{
font-size:14px;
color:#8A8AA0;
}

</style>