<template>

<header class="header">

  <div class="logo">
    <router-link to="/">
      <img src="@/assets/imagenes/logos/logo.svg" alt="logo">
    </router-link>
  </div>

  <!-- BUSCADOR -->

  <div class="search-box">

    <DestinationInput v-model="destination"/>

    <DatePicker
      v-model:checkIn="checkIn"
      v-model:checkOut="checkOut"
    />

    <GuestsSelector v-model="guests"/>

    <div class="search-button" @click="search">
      <img src="@/assets/imagenes/logos/lupa.svg">
    </div>

  </div>

  <div class="iconos">

    <div class="idiomas">
      MXN
      <img src="@/assets/imagenes/logos/Vector.svg">
    </div>

    <img class="usuario" src="@/assets/imagenes/logos/usuario.svg">
    <img class="menu" src="@/assets/imagenes/logos/hamburguesa.svg">

  </div>

</header>

</template>


<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"

import DestinationInput from "@/modules/properties/components/search/DestinationInput.vue"
import DatePicker from "@/modules/properties/components/search/DatePicker.vue"
import GuestsSelector from "@/modules/properties/components/search/GuestsSelector.vue"

const router = useRouter()

const destination = ref("")
const checkIn = ref("")
const checkOut = ref("")
const guests = ref(1)

function search(){

router.push({
  name:"results",
  query:{
    destination: destination.value,
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    guests: guests.value
  }
})

}

</script>


<style scoped>

.header{
display:flex;
align-items:center;
justify-content:space-between;
padding: 22px 18px;
border-bottom:1px solid #eee;
background:white;
}

.search-box{
display:flex;
align-items:center;
gap:10px;
background:#F2F8FF;
padding:8px 12px;
border-radius:12px;
}

.search-item{
display:flex;
align-items:center;
gap:6px;
font-family:"Gotham Rounded Book";
color:#374564;
}

.search-item img{
width:18px;
}

.search-button{
width:35px;
height:35px;
background:white;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
}

.iconos{
display:flex;
align-items:center;
gap:20px;
}

.usuario,.menu{
width:24px;
}

</style>