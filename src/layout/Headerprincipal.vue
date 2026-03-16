```vue
<template>

<div class="hero">

  <div class="imagen-hero">

    <img src="@/assets/imagenes/properties/casa2.jpg">

    <div class="caja-buscador">

      <!-- DESTINO -->
      <DestinationInput v-model="destination"/>

      <!-- FECHAS -->
      <DatePicker
        v-model:checkIn="checkIn"
        v-model:checkOut="checkOut"
      />

      <!-- HUESPEDES -->
      <GuestsSelector v-model="guests"/>

      <!-- BOTON BUSCAR -->
      <div class="boton-buscar" @click="search">

        <img src="@/assets/imagenes/logos/lupa.svg">

      </div>

    </div>

  </div>

</div>

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

/* HERO */

.hero{
width:100%;
position:relative;
font-family:'Poppins-Regular';
}


/* IMAGEN HERO */

.imagen-hero{
width:100%;
height:420px;
position:relative;
overflow:visible;
}

.imagen-hero img{
width:100%;
height:100%;
object-fit:cover;
border-radius:0 0 40px 40px;
display:block;
}


/* BUSCADOR */

.caja-buscador{

position:absolute;

bottom:-70px;
left:50%;

transform:translateX(-50%);

display:flex;
align-items:center;

background:white;

border-radius:50px;

padding:10px;

box-shadow:0 20px 40px rgba(0,0,0,0.15);

width:900px;

gap:5px;

z-index:1000;

}


/* BOTON BUSCAR */

.boton-buscar{

width:55px;
height:55px;

background:#C7C4E7;

border-radius:50%;

display:flex;
align-items:center;
justify-content:center;

cursor:pointer;

transition:all .25s ease;

margin-left:5px;

}

.boton-buscar img{
width:22px;
height:22px;
}


/* HOVER BOTON */

.boton-buscar:hover{

transform:scale(1.08);

box-shadow:0 10px 20px rgba(0,0,0,0.2);

}


/* RESPONSIVE */

@media (max-width:950px){

.caja-buscador{

width:95%;
flex-wrap:wrap;
gap:10px;
padding:15px;

}

}

</style>
```
