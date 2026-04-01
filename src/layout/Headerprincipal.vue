<template>

<div class="hero">

  <div class="imagen-hero">


    <div class="imagen">
  <img src="@/assets/imagenes/properties/casa2.svg" alt="">

  <div class="texto">
    <h1>TRAVEL</h1>
    <p>
      Explora nuestra colección de propiedades 
      <br>exclusivas y redefine lo que significa viajar.
    </p>
  </div>
</div>

   

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

position:relative;
font-family:'Poppins-Regular';
}

.imagen {
  position: relative;
  width: 100%;
  height: 400px; 
  overflow: hidden;
}


.texto {
  position: absolute;
  top: 50%;
  left: 5%; 
  transform: translateY(-50%); 
  color: white;
  max-width: 400px;
}

.texto h1 {
  font-size: 100px;
  margin: 0;
 font-family: 'Poppins-Medium';
}

.texto p {
  font-size: 18px;
  margin-top: 10px;
}

.imagen-hero{
width:100%;
height:450px;
position:relative;
overflow:visible;
}

.imagen-hero img{
width:100%;
height:100%;
object-fit:cover;
border-radius:0 0 0px 0px;
display:block;
}



.caja-buscador{
position:absolute;
bottom:-1px;
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

background:#059CF3;

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


@media (max-width:950px){

.caja-buscador{

width:95%;
flex-wrap:wrap;
gap:10px;
padding:15px;

}

}

</style>

