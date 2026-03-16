```vue
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



.hero{
width:100%;
position:relative;
font-family:'Poppins-Regular';
}



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



.caja-buscador{

position:absolute;

bottom:-70px;
left:50%;

transform:translateX(-50%);

display:flex;
align-items:center;

background:white;

border-radius:50px;

padding:15px;

box-shadow:0 20px 40px rgba(0,0,0,0.15);

width:900px;

gap:2px;

z-index:1000;

}


.boton-buscar{

width:50px;
height:50px;

background:#f2f2f2;

border-radius:50px;

display:flex;
align-items:center;
justify-content:center;

cursor:pointer;

transition:all .25s ease;

margin-left:5px;

}

.boton-buscar img{
width:20px;
height:20px;
}




.boton-buscar:hover{

transform:scale(1.08);

box-shadow:0 10px 20px rgba(211, 207, 207, 0.2);

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

