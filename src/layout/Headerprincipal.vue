<template>

<div class="hero">

  <div class="imagen-hero">

    <img src="@/assets/imagenes/properties/casa2.jpg">

    <div class="caja-buscador">

      <DestinationInput v-model="destination"/>

      <DatePicker
        v-model:checkIn="checkIn"
        v-model:checkOut="checkOut"
      />

      <GuestsSelector v-model="guests"/>

      <div class="boton-buscar" @click="search">
        <img src="@/assets/imagenes/logos/lupa.svg">
      </div>

    </div>

  </div>

</div>

</template>


<script setup> import { ref } from "vue" 
import { useRouter } from "vue-router" 
import DestinationInput from "@/modules/properties/components/search/DestinationInput.vue" 
import DatePicker from "@/modules/properties/components/search/DatePicker.vue" 
import GuestsSelector from "@/modules/properties/components/search/GuestsSelector.vue" 
const router = useRouter() 
const destination = ref("") 
const checkIn = ref("") 
const checkOut = ref("") 
const guests = ref(1) 
function search(){ router.push({ name:"results", query:{ destination: destination.value, checkIn: checkIn.value, checkOut: checkOut.value, guests: guests.value } }) } </script>


<style scoped>

/* CONTENEDOR HERO */

.imagen-hero{
  width:100%;
  height:405px;
  position:relative;
}

.imagen-hero img{
  width:100%;
  height:100%;
  object-fit:cover;
  border-radius:0 0 40px 40px;
  display:block;
}

.caja-buscador{

position:absolute;
bottom:-70px;
left:50%;
transform:translateX(-50%);

display:flex;
align-items:center;

background:white;
border-radius:40px;

padding:10px;

box-shadow:0 10px 30px rgba(0,0,0,0.12);

width:900px;
gap:10px;

}

.boton-buscar{

width:50px;
height:50px;

background:#e3e3e3;
border-radius:50%;

display:flex;
align-items:center;
justify-content:center;

cursor:pointer;
transition:.2s;

}

.boton-buscar img{
width:20px;
height: 20px;

}

.boton-buscar:hover{
transform:scale(1.08);
}
</style>